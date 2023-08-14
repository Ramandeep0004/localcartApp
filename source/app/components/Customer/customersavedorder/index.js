import { useIsFocused } from '@react-navigation/native';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, ScrollView, View } from 'react-native';
import OrderController from '../../../../apis/Controller/order.controller';
import { base } from '../../../assets/global_style/base';
import { colors } from '../../../assets/global_style/colors';
import { hp } from '../../../assets/global_style/fontsize';
import { Images } from '../../../assets/global_style/images';
import SavedorderListing from '../../../CustomerComponent/Savedorder';
import NoRecord from '../../../ShopComponent/NoRecord';
import Loader from '../../Helper/loader';
import SuccessPopup from '../../Helper/successPopup';
import { Toaster } from '../../Helper/Toaster';
import { styles } from './style';


const CustomerSavedOrder = props => {
    const [saveorderList, setSaveOrderList] = useState([]);
    const [loader, setLoader] = useState(false);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const isFocus = useIsFocused();
    useEffect(() => {
        if (isFocus) {
            getSavedOrders(1);
            setLoader(true);
        }
    }, [isFocus]);

    const getSavedOrders = async (page) => {
        let post = {
            page: page ? page : 1,
        };

        let response = await OrderController.saveOrderList(post);
        if (response && response.status) {
            let list = response.listing;
            if (list.length > 0) {
                if (post.page === 1) {
                    setSaveOrderList(list);
                } else {
                    setSaveOrderList([...orderList, ...list]);
                }
                if (list.length < 20) {
                    setPagination(false);
                }
                else {
                    setPagination(true);
                }

                setPage(post.page + 1);
                setRefreshing(false);

            } else {
                setPagination(false);
                if (post.page === 1) {
                    setSaveOrderList([]);
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
        getSavedOrders(1);
    };

    const getMore = () => {
        if (pagination) {
            setFetching(true);
            getSavedOrders(page);
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

    const handleDelete = (e) => {
        setDeleteId(e);
        setDeletePopup(true)
    };

    const onConfirm = async () => {
        setLoader(true);
        let response = await OrderController.deleteSavedOrder(deleteId);
        if (response) {
            setDeletePopup(false)
            getSavedOrders(1);
            new Toaster().success(response.message);
            setLoader(false);
        }
        else {
            setLoader(false);
        }
    };


    return (
        <>
            {!loader && <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.main}>
                    <View style={base.container}>
                        <View style={base.row}>
                            <View style={base.col12}>
                                <View>
                                    <FlatList
                                        contentContainerStyle={styles.flat}
                                        data={saveorderList}
                                        onEndReached={getMore}
                                        ListFooterComponent={renderFooter}
                                        ListEmptyComponent={() => <NoRecord image={Images.onlineShopping} message={t('EmptyStates.No Saved Order Found')} submain={styles.nodata} />}
                                        refreshControl={
                                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                                        }
                                        keyExtractor={(item, index) => (index)}
                                        renderItem={({ item }) => (
                                            <SavedorderListing
                                                item={item}
                                                action={(item) => props.navigation.navigate('customerorderedit', { item: item.id, repeat: 'repeat' })}
                                                handleDelete={(item) => handleDelete(item)}
                                                navigation={props.navigation}
                                            />
                                        )}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>}
            <Loader loader={loader} />
            {deletePopup ? <SuccessPopup
                open={deletePopup}
                close={() => setDeletePopup(false)}
                onConfirm={() => onConfirm()}
                RightButtonText={t("SuccessPopup.Proceed")}
                message={t('SuccessPopup.Delete this order.')}
                message1={t('SuccessPopup.Click on proceed button')}
                label={t("SuccessPopup.Are you sure?")}
            /> : null}
        </>
    );
};
export default CustomerSavedOrder;
