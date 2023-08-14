import { useIsFocused } from '@react-navigation/native';
import { Button, Image, Text } from '@rneui/themed';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native';
import DropShadow from "react-native-drop-shadow";
import PieChart from 'react-native-pie-chart';
import { connect } from 'react-redux';
import filtersController from '../../../../apis/Controller/actionController';
import shopkeeperOrdersController from '../../../../apis/Controller/shopkeeper/shopkeeper.orders.controller';
import { base } from '../../../assets/global_style/base';
import { colors } from '../../../assets/global_style/colors';
import { Dimension } from '../../../assets/global_style/dimension';
import { hp } from '../../../assets/global_style/fontsize';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import { Images } from '../../../assets/global_style/images';
import DeleteModal from '../../../ShopComponent/DeleteModal';
import NoRecord from '../../../ShopComponent/NoRecord';
import OrderList from '../../../ShopComponent/OrderList';
import Loader from '../../Helper/loader';
import { FixedNavgationTabs, NavgationTabs } from '../../Helper/navtabs';
import { Toaster } from '../../Helper/Toaster';
import { styles } from './style';

let ref = null;
const OrderShop = (props) => {
    let navigationParams = props && props.route && props.route.params
    let notifyNewOrder = navigationParams && navigationParams.notifyNewOrder ? navigationParams.notifyNewOrder : null;

    const [topActivityBar, setTopActivityBar] = useState(false);
    const [active, setActiveIndex] = useState(1);
    const [blockYaxis, setBlockYAxis] = useState(null);
    const widthAndHeight = 150;
    // const series = [12, 80, 130];
    // const sliceColor = ['#E97657', '#BCB759', '#F3EC64', '#E97657'];
    // const sliceColor = ['#E97657','#BCB759','#F3EC64', '#4CAF50', '#E97657']
    const sliceColor = [colors.yellowp, colors.orange, colors.green, colors.Secondary]

    const [types, setTypes] = useState([
        { id: 1, name: t("status.New"), value: 'new' },
        { id: 2, name: t("status.Accepted"), value: 'accepted' },
        { id: 3, name: t("status.Packing"), value: 'packing' },
        { id: 4, name: t('status.Ready'), value: 'ready' },
        { id: 5, name: t('status.Delivered'), value: 'delivered' },
        { id: 6, name: t('status.Refused'), value: 'refused' },
    ]);

    const handleScroll = (e) => {
        if (e.nativeEvent.contentOffset.y >= blockYaxis + 246) {
            setTopActivityBar(true);
        }
        else {
            setTopActivityBar(false);
        }
    };
    const [selectedValue, setSelectedvalue] = useState('new');
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [loader, setLoader] = useState(false);
    const [loader2, setLoader2] = useState(false);
    const [odersDetail, setOrdersDetail] = useState([]);
    const [select, setSelect] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [momentumValue, setMomentumValue] = useState(false);
    const isFocus = useIsFocused();

    useEffect(() => {
        if (isFocus) {
            setLoader(true);
            getOrdersList(1);
            setPage(1);
            setSelect([]);
        }
    }, [isFocus]);

    useEffect(() => {
        if (props.status == '') {
            return;
        }
        else {
            setLoader(true);
            getOrdersList(1);
            setSelect([]);
        }
    }, [props && props.status]);


    const getOrdersList = async (page) => {
        let post = {
            order_status: props && props.status ? props.status : 'new',
            page: page ? page : 1,
        };
        let response = await shopkeeperOrdersController.shopkeeperOrders(post);
        if (response && response.status) {
            let b = chartData
            b.length = 0
            setOrdersDetail(response.data);
            setChartArray(response.data);
            let list = response.data.shop_orders;
            for (let i in list) {
                list[i]['checked'] = false;
            }
            if (list.length > 0) {
                if (post.page === 1) {
                    setOrders(list);
                } else {
                    setOrders([...orders, ...list]);
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
                    setOrders([]);
                }
                setRefreshing(false);
            }
        }
        setFetching(false);
        setLoader(false);
        setRefreshing(false);
    };

    const setChartArray = (data) => {
        let upadated = chartData ? [...chartData] : [];
        if (data.pending || data.packing || data.ready || data.delivered) {
            upadated.push(data.pending, data.packing, data.ready, data.delivered);
        }
        setChartData(upadated)
    };

    const getMore = () => {
        if (pagination && !fetching) {
            setFetching(true);
            setMomentumValue(false);
            getOrdersList(page);

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

    const onRefresh = () => {
        setRefreshing(true);
        getOrdersList(1);
    };

    const isExist = (id) => {
        let array = [...select];
        let index = array.findIndex((item) => item === id);
        return index === -1 ? false : index;
    };

    const handleCheckBox = async (item) => {
        let array = [...select];
        let status = await isExist(item.id);
        if (status === false) {
            array.push(item.id);
        }
        else {
            array.splice(status, 1)
        }
        item.checked = !item.checked
        setSelect(array);
    };


    const acceptOrders = async () => {
        let post = {
            order_id: select ? select : []
        }
        setLoader2(true);
        let response = await shopkeeperOrdersController.shopkeeperOrdersAccepted(post);
        if (response && response.status) {
            setLoader2(false);
            setLoader(false);
            getOrdersList(1);
            setSelect([]);
        }
        else {
            setLoader2(false);
            setLoader(false);
        }
    };


    const requiredToPackOrder = async () => {
        let post = {
            order_id: select ? select : []
        }
        setLoader2(true);
        let response = await shopkeeperOrdersController.requiredToPackOrder(post);
        if (response && response.status) {
            new Toaster().success(response.message);
            setLoader2(false);
            setLoader(false);
            getOrdersList(1);
            setSelect([]);
        }
        else {
            setLoader2(false);
            setLoader(false);
        }
    };

    const refusedOrder = async () => {
        let post = {
            order_id: select ? select : []
        }
        setLoader2(true);
        let response = await shopkeeperOrdersController.shopkeeperOrdersRefused(post);
        if (response && response.status) {

            setLoader2(false);
            setLoader(false);
            getOrdersList(1);
            setSelect([]);
            setDeleteModal(false)
        }
        else {
            setLoader2(false);
            setLoader(false);
            setDeleteModal(false)
        }
    };

    const deliveredOrder = async () => {
        let post = {
            order_id: select ? select : [],
            discount: 0,
            total_amount: 0,
            amount: 0
        }
        setLoader2(true);
        let response = await shopkeeperOrdersController.shopkeeperOrdersDelivered(post);
        if (response && response.status) {
            setLoader2(false);
            setLoader(false);
            getOrdersList(1);
            setSelect([]);
        }
        else {
            setLoader2(false);
            setLoader(false);
        }
    };

    const selectAllItems = async () => {
        let selected = select
        selected.length = 0
        let list = [...orders]
        for (let i in list) {
            list[i]['checked'] = true
            let status = await isExist(list[i].id);
            if (status === false) {
                selected.push(list[i].id);
            }
            else return selected
        }
        setOrders(list);
        setSelect(selected);
    };

    const handleFilter = async (e) => {
        setSelectedvalue(e);
        await filtersController.shopkeeperOrdersFilters(e);
    };

    function isScrollviewCloseToBottom({
        layoutMeasurement,
        contentOffset,
        contentSize,
    }) {
        const paddingToBottom = 20;
        return (
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom
        );
    }

    return (
        <>
            {<View style={styles.main}>
                {
                    topActivityBar
                    &&
                    <FixedNavgationTabs
                        types={types}
                        active={active}
                        setActiveIndex={setActiveIndex}
                        handleFilter={handleFilter}
                    />
                }
                <ScrollView
                    onScroll={handleScroll}
                    keyboardShouldPersistTaps='handled'
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                    onMomentumScrollEnd={event => {
                        if (isScrollviewCloseToBottom(event.nativeEvent)) {
                            getMore();
                        }
                    }}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    <View style={base.container}>
                        <DropShadow style={styles.shadow}>
                            <View style={styles.viewpie}>
                                <View style={base.row}>
                                    <View style={base.col8}>
                                        <View style={styles.pie}>
                                            <PieChart
                                                widthAndHeight={widthAndHeight}
                                                series={chartData ? chartData : []}
                                                sliceColor={sliceColor}
                                                doughnut={true}
                                                coverRadius={0.45}
                                            // coverFill={colors.Secondary}
                                            />
                                            {
                                                odersDetail && odersDetail.orders ?
                                                    <View style={styles.viewquant}>
                                                        <Text style={styles.quant}>{odersDetail.orders}</Text>
                                                        <Text style={styles.order}>{t("shopOrders.Orders")}</Text>
                                                    </View>
                                                    :
                                                    <View style={styles.viewquant}>
                                                        <Text style={styles.quant}>{t("shopOrders.Please wait...")}</Text>
                                                        <Text style={styles.order}>{t("shopOrders.No New Orders found for your shop")}</Text>
                                                    </View>
                                            }
                                        </View>
                                    </View>
                                    <View style={base.col4}>
                                        <View>
                                            <View style={styles.mainimage}>
                                                <Image style={styles.image}
                                                    source={Images.background}
                                                    resizeMode='stretch'
                                                />
                                            </View>
                                            <View style={styles.maincircle}>
                                                <View style={styles.viewone}>
                                                    <View style={styles.viewnum}>
                                                        <Text style={styles.num}>{odersDetail.pending}</Text>
                                                    </View>
                                                    <Text style={styles.pending}>{t("status.Pending")}</Text>
                                                </View>
                                                <View style={styles.viewone}>
                                                    <View style={styles.viewnum2}>
                                                        <Text style={styles.num}>{odersDetail.packing}</Text>
                                                    </View>
                                                    <Text style={styles.pending}>{t("status.Packing")}</Text>
                                                </View>
                                                <View style={styles.viewtwo}>
                                                    <View style={styles.viewcount}>
                                                        <Text style={styles.num}>{odersDetail.ready}</Text>
                                                    </View>
                                                    <Text style={styles.pending}>{t("status.Ready")}</Text>
                                                </View>
                                                <View style={styles.viewthree}>
                                                    <View style={styles.viewNum}>
                                                        <Text style={styles.num}>{odersDetail.delivered}</Text>
                                                    </View>
                                                    <Text style={styles.pending}>{t("status.Delivered")}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </DropShadow>
                    </View>
                    <View style={styles.viewtab}>
                        <View
                            ref={(r) => (ref = r)}
                            onLayout={event => {
                                const layout = event.nativeEvent.layout;
                                setBlockYAxis(layout.y);
                            }}
                        >
                            <View style={{ height: hp(50) }}>
                                {
                                    !topActivityBar
                                    &&
                                    <NavgationTabs
                                        types={types}
                                        active={active}
                                        setActiveIndex={setActiveIndex}
                                        reRenderFunction={() => getOrdersList(1)}
                                        handleFilter={handleFilter}
                                    />

                                }
                            </View>
                        </View>
                    </View>
                    {!loader && <View style={styles.viewmain}>
                        <View style={base.container}>
                            {
                                orders && orders.length > 0 && active == 1 || orders && orders.length > 0 && active == 2 ?
                                    <View style={styles.viewselect}>
                                        <TouchableOpacity onPress={() => selectAllItems()}>
                                            <Text style={styles.select}>{t("shopOrders.Select all")}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    null
                            }
                            <View style={select.length === 0 ? styles.viewflat2 : styles.viewflat}>
                                <FlatList
                                    nestedScrollEnabled={true}
                                    contentContainerStyle={styles.flat}
                                    initialNumToRender={10}
                                    maxToRenderPerBatch={20}
                                    windowSize={12}
                                    data={orders}
                                    disableVirtualization={true}
                                    keyExtractor={(index, item) => (index, item)}
                                    showsVerticalScrollIndicator={false}
                                    ListEmptyComponent={() => <NoRecord image={Images.cartnr} message={selectedValue === 'new' ? t('EmptyStates.No New Order Found') : selectedValue === 'accepted' ? t('EmptyStates.No Accepted Order Found') : selectedValue === 'packing' ? t('EmptyStates.No Packed Order Found') : selectedValue === 'ready' ? t('EmptyStates.No Ready Order Found') : selectedValue === 'delivered' ? t('EmptyStates.No Delivered Order Found') : t('EmptyStates.No Refused Order Found')} submain={styles.emptyContainer} />}
                                    renderItem={({ item }) => (
                                        <OrderList
                                            item={item}
                                            action={() => props.navigation.navigate('ordersummary', { itemId: { id: item.id } })}
                                            index={active}
                                            handleCheckbox={handleCheckBox}
                                            acceptOrders={acceptOrders}
                                            refusedOrder={refusedOrder}
                                            navigation={props.navigation}
                                            getOrdersList={getOrdersList}
                                        />
                                    )}
                                />
                            </View>
                        </View>
                    </View>}
                    {fetching ? renderFooter() : null}
                </ScrollView>
                {/* New-> Refuse & Accept */}
                {
                    active === 1 && select.length > 0 ?
                        <View style={styles.mainbutton}>
                            <View style={styles.btnone}>
                                <Button title={t('shopOrders.Refuse')}
                                    buttonStyle={styles.btnonestyle}
                                    titleStyle={styles.titlebtn}
                                    onPress={() => setDeleteModal(true)}
                                />
                            </View>
                            <View style={styles.btntwo}>
                                <Button title={t('shopOrders.Accept')}
                                    buttonStyle={styles.btntwostyle}
                                    onPress={() => acceptOrders()}
                                />
                            </View>
                        </View>
                        :
                        active === 2 && select.length > 0 ?
                            <View style={styles.mainbutton}>
                                <View style={styles.btnone}>
                                    <Button title={t('shopOrders.Refuse')}
                                        buttonStyle={styles.btnonestyle}
                                        titleStyle={styles.titlebtn}
                                        onPress={() => setDeleteModal(true)}
                                    />
                                </View>
                                <View style={styles.btntwo}>
                                    <Button title={t('shopOrders.Start Packing')}
                                        buttonStyle={styles.btntwostyle}
                                        onPress={() => requiredToPackOrder()}
                                    />
                                </View>
                            </View>
                            :
                            active === 3 && select.length > 0 ?
                                <View style={styles.MainBtn}>
                                    <Button
                                        title={t('shopOrders.Delivered')}
                                        buttonStyle={styles.buttontwo}
                                        onPress={() => deliveredOrder()}
                                    />
                                </View>
                                : null
                }
            </View>}
            {deleteModal ? <DeleteModal
                message1={''}
                message2={t('deletPopUp.Are you sure to refuse this order?')}
                message3={t('deletPopUp.This process cannot be undone.')}
                buttonTitle1={t('deletPopUp.Cancel')}
                buttonTitle2={t('deletPopUp.Refuse')}
                open={deleteModal}
                IconType={IconsType.antDesign}
                IconName={Icons.delete}
                loader={loader2}
                IconColor={colors.red}
                IconSize={Dimension.Large}
                textStyle1={styles.textStyle1}
                textStyle2={styles.textStyle2}
                close={() => setDeleteModal(false)}
                deletItemRequest={() => refusedOrder()}
            /> : null}
            {loader ? <Loader loader={loader} /> : null}
            {loader2 ? <Loader loader={loader2} /> : null}
        </>
    )
};
const mapStateToProps = state => ({
    status: state.shopkeeperOrdersFilters.filters
});
export default connect(mapStateToProps)(OrderShop);