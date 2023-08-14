import { useIsFocused } from '@react-navigation/native';
import { Icon, Text } from '@rneui/themed';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import OrderController from '../../../../apis/Controller/order.controller';
import { base } from '../../../assets/global_style/base';
import { colors } from '../../../assets/global_style/colors';
import { Dimension } from '../../../assets/global_style/dimension';
import { hp } from '../../../assets/global_style/fontsize';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import { Images } from '../../../assets/global_style/images';
import FilterModal from '../../../ShopComponent/FilterModal';
import MyOrderList from '../../../ShopComponent/MyOrderList';
import NoRecord from '../../../ShopComponent/NoRecord';
import { removeUnderscore } from '../../Helper/general';
import Loader from '../../Helper/loader';
import { styles } from './style';

const MyOrderShop = (props) => {
    const [orderFilterModal, setOrderFilterModal] = useState(false);
    const [orderList, setOrderList] = useState([]);
    const [loader, setLoader] = useState(false);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [fetching, setFetching] = useState(false);
    const isFocus = useIsFocused();
    useEffect(() => {
        if (isFocus) {
            getOrders(1);
            setLoader(true);
        }
    }, [isFocus]);

    useEffect(() => {
        getOrders(1);
    }, [props && props.status]);

    const getOrders = async (page) => {
        let post = {
            order_status: props && props.status,
            page: page ? page : 1,
        };

        let response = await OrderController.myShopOrderList(post);
        if (response && response.status) {
            let list = response.listing;
            if (list.length > 0) {
                if (post.page === 1) {
                    setOrderList(list);
                } else {
                    setOrderList([...orderList, ...list]);
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
                    setOrderList([]);
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
        getOrders(1);
    };

    const getMore = () => {
        if (pagination) {
            setFetching(true);
            getOrders(page);
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

    return (
        <View style={styles.main}>
            {!loader && <View style={base.container}>
                <TouchableOpacity onPress={() => setOrderFilterModal(true)}>
                    <View style={styles.viewfilter}>
                        <Text style={styles.filter}>{t("Filters.Filter")}</Text>
                        <Icon type={IconsType.antDesign} name={Icons.caretdown} color={colors.black} size={Dimension.docicon} />
                        {props && props.status.length > 0 ? <View style={{ position: 'absolute', backgroundColor: colors.red, height: hp(10), width: hp(10), borderRadius: hp(10), top: 6, right: 55 }} /> : null}
                    </View>
                </TouchableOpacity>
                <View style={styles.vieworder}>
                    <FlatList
                        contentContainerStyle={styles.flat}
                        data={orderList}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        onEndReached={getMore}
                        ListFooterComponent={renderFooter}
                        ListEmptyComponent={() => <NoRecord image={Images.onlineShopping} message={t('EmptyStates.No Order Found')} submain={styles.nodata} />}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                        keyExtractor={(i, index) => index}
                        renderItem={({ item }) => (
                            <MyOrderList
                                action={(item) => props.navigation.navigate('myordersummary', { item: item.id })}
                                item={item}
                                getOrders={() => getOrders(1)}
                                navigation={props.navigation}
                            />
                        )}
                    />
                </View>
            </View>}
            {orderFilterModal ? <FilterModal
                open={orderFilterModal}
                close={() => setOrderFilterModal(false)}
            /> : null}
            <Loader loader={loader} />
        </View>
    )
};
const mapStateToProps = state => ({
    products: state.AddToCartReducer.products,
    status: state.MyOrderfiltersReducer.filters,
});
export default connect(mapStateToProps)(MyOrderShop);