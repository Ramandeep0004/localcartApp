import React from 'react';

import styles from './style';
import { Button, Image, Text, Input, Icon } from '@rneui/themed';
import {
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
    View,
} from 'react-native';
import { base } from '../../../assets/global_style/base';
import { FlatList } from 'react-native';
import { hp } from '../../../assets/global_style/fontsize';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import { colors } from '../../../assets/global_style/colors';
import { Dimension } from '../../../assets/global_style/dimension';
import { useState } from 'react';
import NoRecord from '../../../ShopComponent/NoRecord';
import { Images } from '../../../assets/global_style/images';
import { RefreshControl } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import notificationsController from '../../../../apis/Controller/notifications.controller';
import Loader from '../../Helper/loader';
import { dateFormatFull, time12hr, timehr } from '../../Helper/date.formats';
import store from '../../../../redux/store';
import { setNotification } from '../../../../redux/action/user';
import { t } from 'i18next';

const NotificationList = props => {
    const [notifications, setNotifications] = useState([])
    const [loader, setLoader] = useState(false);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [fetching, setFetching] = useState(false);
    const isFocus = useIsFocused();
    useEffect(() => {
        if (isFocus) {
            getNotifiations(1);
            setLoader(true);
            store.dispatch(setNotification(0));
        }
    }, [isFocus]);


    const getNotifiations = async (page) => {
        let post = {
            page: page ? page : 1,
        };
        let response = await notificationsController.notificationsListing(post);
        if (response && response.status) {
            let list = response.listing;
            if (list.length > 0) {
                if (post.page === 1) {
                    setNotifications(list);
                } else {
                    setNotifications([...notifications, ...list]);
                }
                if (list.length < 20) {
                    setPagination(false);
                }
                else {
                    setPagination(true);
                }

                setPage(post.page + 1);
                setRefreshing(false);
                // readAllNotifications();
            } else {
                setPagination(false);
                if (post.page === 1) {
                    setNotifications([]);
                }
                setRefreshing(false);
            }
        }
        setFetching(false);
        setLoader(false);
        setRefreshing(false);
    };

    const onRefresh = () => {
        setRefreshing(true);
        getNotifiations(1);
    };

    const getMore = () => {
        if (pagination && !fetching) {
            setFetching(true);
            getNotifiations(page);
        }
    };


    const renderFooter = () => {
        if (fetching) {
            return (
                <>
                    {fetching ? (
                        <ActivityIndicator
                            color={colors.primary}
                            size={'large'}
                            style={{ alignSelf: 'center', marginBottom: hp(20) }}
                        />
                    ) : null}
                </>
            );
        }
        else {
            return <View style={{ height: hp(25) }} />;
        }
    };

    const readAllNotifications = async () => {
        let response = await notificationsController.notificationsReacAll();
        if (response && response.status) {
            setRefreshing(false);
        }
        else {
            setRefreshing(false);
        }
    };


    //notification Order Types
    //Shopkeeper : -  1.order_created(new oder)  2.order_refused_by_customer
    //customer : -   #order_refused_by_shop   #order_accepted  #order_packed  #order_delivered  #order_completed
    // props.navigation.navigate('ordershop', { notifyNewOrder: item.type });  params: { notifyNewOrder: item.type }

    const handleNavigation = async (item) => {
        if (parseInt(item.read) === 0) {
            await notificationsController.notificationsRead(item.id);
        }
        if (item.to_user_type === 'shopkeeper') {
            if (item.type === 'order_created') {
                props.navigation.navigate('ordershop');
            } else if (item.type === 'order_accepted') {
                props.navigation.navigate('myordersummary', { item: item.rel_id });
            } else if (item.type === 'order_packed') {
                props.navigation.navigate('myordersummary', { item: item.rel_id });
            } else if (item.type === 'order_delivered') {
                props.navigation.navigate('myordersummary', { item: item.rel_id });
            } else if (item.type === 'order_completed') {
                props.navigation.navigate('myordersummary', { item: item.rel_id });
            } else if (item.type === 'order_refused_by_shop') {
                props.navigation.navigate('myordersummary', { item: item.rel_id });
            } else if (item.type === 'order_refused_by_customer') {
                props.navigation.navigate('myordersummary', { item: item.rel_id });
            } else if (item.type === 'request_approved') {
                props.navigation.navigate('myitemreq', { item: item.rel_id });
            } else if (item.type === 'request_declined') {
                props.navigation.navigate('myitemreq', { item: item.rel_id });
            } else if (item.type === 'wallet') {
                props.navigation.navigate('wallet', { item: item.rel_id });
            }
            else {
                props.navigation.navigate('shophomescreen');
            }
        } else if (item.to_user_type === 'customer') {
            if (item.type === 'order_accepted') {
                props.navigation.navigate('customerordersummary', { item: item.rel_id });
            } else if (item.type === 'order_packed') {
                props.navigation.navigate('customerordersummary', { item: item.rel_id });
            } else if (item.type === 'order_delivered') {
                props.navigation.navigate('customerordersummary', { item: item.rel_id });
            } else if (item.type === 'order_completed') {
                props.navigation.navigate('customerordersummary', { item: item.rel_id });
            } else if (item.type === 'order_refused_by_shop') {
                props.navigation.navigate('customerordersummary', { item: item.rel_id });
            } else if (item.type === 'order_refused_by_customer') {
                props.navigation.navigate('customerordersummary', { item: item.rel_id });
            } else if (item.type === 'wallet') {
                props.navigation.navigate('customerwallet', { item: item.rel_id });
            } else {
                props.navigation.navigate('customerhome');
            }
        }
        else {
           return
        }
    };


    return (
        <View style={styles.main}>
            {!loader && <View>
                <FlatList
                    contentContainerStyle={styles.listMain}
                    showsVerticalScrollIndicator={false}
                    data={notifications}
                    onEndReached={getMore}
                    ListFooterComponent={renderFooter}
                    ListEmptyComponent={() => <NoRecord image={Images.bell} message={t('EmptyStates.No Notification Found')} submain={styles.nodata} />}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    keyExtractor={(item, index) => (index)}
                    renderItem={({ item }) => (
                        <View style={base.container}>
                            <View style={styles.listContainer}>
                                <View style={parseInt(item.read) === 0 ? styles.ContainerMain22 : styles.ContainerMain}>
                                    <TouchableOpacity onPress={() => handleNavigation(item)}>
                                        <View style={styles.detailMain}>
                                            <View style={base.container}>
                                                <Text style={styles.text}>
                                                    {item.message}
                                                </Text>
                                            </View>
                                            {/* {parseInt(item.read) === 0 ? <View style={{ position: 'absolute', top: 10, right: 10, backgroundColor: 'red', height: hp(10), width: hp(10), borderRadius: hp(15) }} /> : null} */}
                                            <View style={base.container}>
                                                <View style={styles.timerMain}>
                                                    <View style={styles.iconMain}>
                                                        <Icon
                                                            name={Icons.stopwatch}
                                                            type={IconsType.octIcon}
                                                            color={parseInt(item.read) === 0 ? colors.Secondary : colors.primary}
                                                            size={Dimension.Vsmall}
                                                        />
                                                    </View>

                                                    <View style={styles.dateMain}>
                                                        <Text style={parseInt(item.read) === 0 ? styles.date22 : styles.date}>{dateFormatFull(item.created)} <Text style={parseInt(item.read) === 0 ? styles.date22 : styles.date}>{time12hr(item.created)}</Text></Text>

                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>}

            <Loader loader={loader}></Loader>
        </View>

    );
};
export default NotificationList;
