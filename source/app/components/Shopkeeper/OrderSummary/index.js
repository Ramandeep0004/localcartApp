import { useIsFocused } from '@react-navigation/native';
import { Button, Text } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native';
import OrderController from '../../../../apis/Controller/order.controller';
import shopkeeperOrdersController from '../../../../apis/Controller/shopkeeper/shopkeeper.orders.controller';
import { base } from '../../../assets/global_style/base';
import BillItemOrderSummary from '../../../ShopComponent/BillItemOrderSummary';
import BonnItemList from '../../../ShopComponent/BonnItemlist';
import DeliveryOrder from '../../../ShopComponent/DeliveryOrder';
import ItemRemoveModal from '../../../ShopComponent/ItemRemoveModal';
import NotesModal from '../../../ShopComponent/NotesModal';
import NotesOrder from '../../../ShopComponent/NotesOrder';
import OrderSummaryList from '../../../ShopComponent/OrderSummarylist';
import ShowImage from '../../../ShopComponent/showImage';
import Loader from '../../Helper/loader';
import { styles } from './style';
import ItemModal from '../../../CustomerComponent/ItemModal';
import { finaltotalPrice, finaltotalPricePercentage, finaltotalPriceType, handleDiscount, subTotalPrice, totalPrice, totalPrice2 } from '../../Helper/orderHelpers';
import shopsController from '../../../../apis/Controller/shops.controller';
import filtersController from '../../../../apis/Controller/actionController';
import { Toaster } from '../../Helper/Toaster';
import { checkAfterTime, checkCurrentDAte, checkCurrentTimedate } from '../../Helper/general';
import { t } from 'i18next';

const OrderSummary = (props) => {
    let navparams = props && props.route && props.route.params
    let orderId = navparams && navparams.itemId ? navparams.itemId.id : null

    const [itemRemove, setItemRemove] = useState(false);
    const [note, setNote] = useState(false);
    const [loader, setLoader] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [shopDetail, setShopDetail] = useState(null);
    const [totalValue, setTotalvalue] = useState(0);
    const [finalTotalValue, setFinalTotalvalue] = useState(null);
    const [subTotal, setSubTotal] = useState(null);
    const [itemList, setItemList] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const [serviceChargesPrice, setServiceChargesPrice] = useState(null);
    const [itemDetailPopUp, setItemDetailPopUp] = useState(false);
    const [afterDiscountBillTotal, setAfterDiscountBillTotal] = useState(null);
    const [discount, setDiscount] = useState(null);
    const [item, setItem] = useState(null);
    const [showRefusedbtn, setShowRefusedbtn] = useState(false);
    const isFocus = useIsFocused();
    useEffect(() => {
        if (isFocus) {
            getOrderDetails();
            getServicesCharges();
            setFinalTotalvalue(null);
            setTotalvalue(null);
            setDiscount(null);
            setAfterDiscountBillTotal(null);
            setSubTotal(null);
        }
    }, [isFocus]);

    useEffect(() => {
        if (orderDetails && parseInt(orderDetails.request_status) === 0) {
            setItemRemove(true)
        } else {
            setItemRemove(false)
        }
    }, [orderDetails && orderDetails.request_status]);

    useEffect(() => {
        if (totalValue) {
            handleFinalTotal();
        }
    }, [totalValue, shopDetail, serviceChargesPrice]);

    useEffect(() => {
        if (isFocus && itemList && itemList.length > 0) {
            handleTotal();
        }
    }, [isFocus, itemList]);

    useEffect(() => {
        if (totalValue) {
            handleFinalTotal();
        }
    }, [totalValue]);

    useEffect(() => {
        if (orderDetails && shopDetail) {
            handleSubTotal();
        }
    }, [orderDetails, shopDetail]);

    useEffect(() => {
        if (orderDetails && parseInt(orderDetails.order_status) === 3) {
            if (orderDetails && orderDetails.discount) {
                handleBillTotalOnDiscount();
            }
            else return;
        }
    }, [orderDetails]);


    const getOrderDetails = async () => {
        setLoader(true);
        let response = await OrderController.orderDetails(orderId);
        if (response && response.status) {
            let list = response.page.items
            for (let i in list) {
                list[i]['change_price'] = false
            }
            setOrderDetails(response.page);
            setItemList(list);
            setLoader(false);
            setRefreshing(false);
            getShopDetails(response.page);

        } else {
            setLoader(false);
            setRefreshing(false);
        }
    };

    const getShopDetails = async (data) => {
        let item = {
            id: data && data.shop_id ? data.shop_id : ''
        }
        let response = await shopsController.shopDetail(item);
        if (response && response.status) {
            setShopDetail(response.shop);
        } else return;
    };

    const isExist = (id) => {
        let array = [...itemList];
        let index = array.findIndex((item) => item.product_id === id);
        return index === -1 ? false : index;
    };

    const upadateOrderList = async (value, id) => {
        let list = [...itemList]
        let status = await isExist(id);
        if (status !== false) {
            list[status].products_price = value
            list[status].change_price = true
        }
        else return list
        setItemList(list);
        handleTotal(value);
    };

    const handleTotal = (value) => {
        if (value) {
            let order = { ...orderDetails }
            let totall = totalPrice2(itemList);
            if (totall) {
                order.amount = totall
            }
            else return order
            setOrderDetails(order);
            setTotalvalue(totall);
        }
        else {
            let totall = totalPrice2(itemList);
            setTotalvalue(totall);
        }
    };

    const getServicesCharges = async () => {
        let response = await filtersController.settings();
        if (response && response.status) {
            setServiceChargesPrice(response.data);
        } else {
            setServiceChargesPrice(null);
        }
    };


    const handleFinalTotal = () => {
        let order = { ...orderDetails }
        if (parseInt(orderDetails.delivery_type) === 1 || orderDetails.delivery_type === null) {
            if (shopDetail && shopDetail.delivery_charge_type === 'percentage') {
                let total = finaltotalPricePercentage(totalValue, orderDetails && orderDetails.delivery_charges ? parseInt(orderDetails.delivery_charges) : 0, parseInt(orderDetails && orderDetails.service_charge));
                if (total) {
                    setFinalTotalvalue(total);
                    order.total_amount = total
                }
                else return order
            } else {
                let total = finaltotalPrice(totalValue, orderDetails && orderDetails.delivery_charges ? parseInt(orderDetails.delivery_charges) : 0, parseInt(orderDetails && orderDetails.service_charge));
                if (total) {
                    setFinalTotalvalue(total);
                    order.total_amount = total
                }
                else return order
            }
        } else {
            let total = finaltotalPriceType(totalValue, parseInt(orderDetails && orderDetails.service_charge));
            if (total) {
                setFinalTotalvalue(total);
                order.total_amount = total
            }
            else return order
        }
        setOrderDetails(order);
    };

    const handleSubTotal = () => {
        let serviceCharges = orderDetails && orderDetails.service_charge ? parseInt(orderDetails && orderDetails.service_charge) : 0
        let deliveryCharges = orderDetails && orderDetails.delivery_charges ? parseInt(orderDetails.delivery_charges) : 0

        if (parseInt(orderDetails.delivery_type) === 1 || orderDetails.delivery_type === null) {
            if (shopDetail && shopDetail.delivery_charge_type === 'percentage') {
                let total = subTotalPrice(serviceCharges, 0);
                setSubTotal(total);
            } else {
                let total = subTotalPrice(serviceCharges, deliveryCharges);
                setSubTotal(total);
            }
        } else {
            let total = subTotalPrice(serviceCharges, 0)
            setSubTotal(total);
        }
    };

    const handleBillTotalOnDiscount = (values) => {
        if (values) {
            let newTotal = handleDiscount(orderDetails && orderDetails.total_amount, values.discount);
            setDiscount(values.discount);
            setAfterDiscountBillTotal(newTotal);
        }
        else {
            let newTotal = handleDiscount(orderDetails && orderDetails.total_amount, orderDetails && orderDetails.discount);
            setAfterDiscountBillTotal(newTotal);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        getOrderDetails();
    };

    const acceptOrders = async () => {
        let post = {
            order_id: orderId ? [orderId] : []
        }
        setLoader(true);
        let response = await shopkeeperOrdersController.shopkeeperOrdersAccepted(post);
        if (response && response.status) {
            setLoader(false);
            props.navigation.goBack();
        }
        else {
            setLoader(false);
        }
    };

    const requiredToAcceptOrder = async () => {
        let post = {
            order_id: orderId ? [orderId] : []
        }
        setLoader(true);
        let response = await shopkeeperOrdersController.requiredToPackOrder(post);
        if (response && response.status) {
            setLoader(false);
            props.navigation.goBack();
        }
        else {
            setLoader(false);
        }
    };

    const refusedOrder = async () => {
        let post = {
            order_id: orderId ? [orderId] : []
        }
        setLoader(true);
        let response = await shopkeeperOrdersController.shopkeeperOrdersRefused(post);
        if (response && response.status) {
            setLoader(false);
            getOrderDetails();
            props.navigation.goBack();
        }
        else {
            setLoader(false);
        }
    };

    const checkAllProductPriceIsExist = async (list) => {
        let isPriceExist = false;
        for (let i in list) {
            if (list[i].products_price) {
                isPriceExist = true;
            }
            else {
                isPriceExist = false;
            }
        }
        return isPriceExist;
    };

    const packedOrder = async () => {
        let list = [...itemList]
        let result = await checkAllProductPriceIsExist(list);
        if (result) {
            setLoader(true);
            let response = await shopkeeperOrdersController.shopkeeperOrdersPacked(orderDetails, itemList);
            if (response && response.status) {
                setLoader(false);
                getOrderDetails();
            }
            else {
                setLoader(false);
            }
        }
        else {
            new Toaster().error('All price fields are required');
        }
    };

    const deliveredOrder = async () => {
        let post = {
            order_id: orderId ? [orderId] : [],
            discount: discount ? discount : 0,
            amount: orderDetails && orderDetails.amount ? orderDetails.amount : 0,
            total_amount: discount ? afterDiscountBillTotal : orderDetails && orderDetails.total_amount ? orderDetails.total_amount : 0
        }
        setLoader(true);
        let response = await shopkeeperOrdersController.shopkeeperOrdersDelivered(post);
        if (response && response.status) {
            setLoader(false);
            props.navigation.goBack();
        }
        else {
            setLoader(false);
        }
    };

    return (
        <>
            {!loader && orderDetails ? <ScrollView
                nestedScrollEnabled={true}
                contentContainerStyle={styles.scroll}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                <View style={styles.main}>
                    <View style={base.container}>
                        <OrderSummaryList
                            item={orderDetails}
                        />
                        {
                            orderDetails && orderDetails.items && orderDetails.items.length > 0 ?
                                <Text style={styles.item}>{orderDetails.items.length > 1 ? `${orderDetails.items.length} ${t("orderSummary.items")}` : `${orderDetails.items.length} ${t("orderSummary.item")}`}</Text>
                                :
                                null
                        }
                        <View style={styles.viewbonn}>
                            <ScrollView
                                nestedScrollEnabled={true}
                                contentContainerStyle={styles.scroll}
                                showsVerticalScrollIndicator={false}
                            >
                                <BonnItemList
                                    upadateOrderList={(value, itemId) => upadateOrderList(value, itemId)}
                                    action={(id) => (setItem(id), setItemDetailPopUp(true))}
                                    data={itemList}
                                    shopDetail={orderDetails && orderDetails.shop}
                                    orderDetails={orderDetails}
                                />
                            </ScrollView>
                        </View>
                        {
                            orderDetails && parseInt(orderDetails.delivery_type) === 1 ?
                                <Text style={styles.delivery}>{t("orderSummary.Delivery Address")}</Text>
                                :
                                null
                        }
                        {
                            orderDetails && orderDetails.address ?
                                <DeliveryOrder data={orderDetails.address} />
                                :
                                null
                        }
                        {
                            orderDetails && orderDetails.notes ?
                                <TouchableOpacity onPress={() => setNote(true)}>
                                    <Text style={styles.notes}>{t("orderSummary.Notes")}</Text>
                                    <NotesOrder Note={orderDetails.notes} />
                                </TouchableOpacity>
                                :
                                null

                        }
                        {/* Delivery-> Printed bill & Transaction Slip */}
                        {
                            orderDetails && orderDetails.printed_bill_slip ?
                                <Text style={styles.print}>{t("orderSummary.Printed Bill")}</Text>
                                :
                                null
                        }
                        {orderDetails && orderDetails.printed_bill_slip ?
                            <ShowImage
                                image={orderDetails.printed_bill_slip}
                                navigation={props.navigation}
                            />
                            : null}
                        {
                            orderDetails && orderDetails.transaction_slip ?
                                <Text style={styles.print}>{t("orderSummary.Transaction Slip")}</Text>
                                :
                                null
                        }
                        {orderDetails && orderDetails.transaction_slip ?
                            <ShowImage
                                image={orderDetails.transaction_slip}
                                navigation={props.navigation}
                            />
                            : null}
                    </View>
                    <BillItemOrderSummary
                        type={orderDetails && orderDetails.delivery_type}
                        userType={'shopkeeper'}
                        totalValue={orderDetails && parseInt(orderDetails.order_status) === 3 ? orderDetails && orderDetails.amount : totalValue}
                        finalTotalValue={finalTotalValue}
                        serviceChargesPrice={orderDetails && orderDetails.service_charge}
                        service_charge={orderDetails && orderDetails.service_charge}
                        orderDetails={orderDetails}
                        deliveredOrderStatus={orderDetails && parseInt(orderDetails.order_status) === 2 || orderDetails && parseInt(orderDetails.order_status) === 3 ? 'show' : null}
                        delivery_charges={orderDetails && orderDetails.delivery_charges}
                        shopDetail={orderDetails && orderDetails.shop}
                        discount={orderDetails && orderDetails.discount > 0 ? orderDetails.discount : discount}
                        delivery_charge_type={shopDetail && shopDetail.delivery_charge_type}
                        afterDiscountBillTotal={orderDetails && parseInt(orderDetails.order_status) === 2 || orderDetails && parseInt(orderDetails.order_status) === 3 ? afterDiscountBillTotal : null}
                        handleBillTotalOnDiscount={handleBillTotalOnDiscount}
                        subTotal={subTotal}
                        handleSubTotalHideShow={orderDetails && orderDetails.total_amount === null && orderDetails && parseInt(orderDetails.order_status) === 0
                            || orderDetails && orderDetails.total_amount === null && orderDetails && parseInt(orderDetails.order_status) === 1
                            || orderDetails && orderDetails.total_amount === null && orderDetails && parseInt(orderDetails.order_status) === 8
                            ? 'show' : null}
                    />
                    {/* Packing-> Item Remove */}
                    {orderDetails && parseInt(orderDetails.request_status) === 0 ? <View style={styles.viewitem}>
                        <TouchableOpacity onPress={() => setItemRemove(true)}>
                            <Text style={styles.Item}>{t("orderSummary.Item remove request")} <Text style={styles.Item22}>{t("orderSummary.View")}</Text></Text>
                        </TouchableOpacity>
                        <Text style={styles.list}>{t("orderSummary.The customer has remove / update some items from list")}</Text>
                    </View> : null}

                    {/* New-> Buttons-Refuse & Accept */}
                    <View style={styles.mainbtn}>
                        {
                            orderDetails && parseInt(orderDetails.order_status) === 0 ?
                                <>
                                    <View style={styles.btnone}>
                                        <Button title={t('orderSummary.Refuse Order')}
                                            buttonStyle={styles.buttonone}
                                            titleStyle={styles.title}
                                            onPress={() => refusedOrder()}
                                        />
                                    </View>
                                    <View style={styles.btntwo}>
                                        <Button title={t('orderSummary.Accept Order')}
                                            buttonStyle={styles.buttontwo}
                                            onPress={() => acceptOrders()}
                                        />
                                    </View>
                                </>
                                :
                                orderDetails && parseInt(orderDetails.order_status) === 1 ?
                                    <>
                                        <View style={styles.btnone}>
                                            <Button title={t('orderSummary.Refuse Order')}
                                                buttonStyle={styles.buttonone}
                                                titleStyle={styles.title}
                                                onPress={() => refusedOrder()}
                                            />
                                        </View>
                                        <View style={styles.btntwo}>
                                            <Button title={t('orderSummary.Start Packing')}
                                                buttonStyle={styles.buttontwo}
                                                onPress={() => requiredToAcceptOrder()}
                                            />
                                        </View>
                                    </>
                                    :
                                    null
                        }
                    </View>
                    {
                        orderDetails && parseInt(orderDetails.order_status) === 8 ?
                            <>
                                {orderDetails && parseInt(orderDetails.late_order_deducted) === 0 ? <View style={styles.btmmain}>
                                    <View style={styles.btnone}>
                                        <Button title={t('orderSummary.Refuse Order')}
                                            buttonStyle={styles.buttonone}
                                            titleStyle={styles.title}
                                            onPress={() => refusedOrder()}
                                        />
                                    </View>
                                    <View style={styles.btntwo}>
                                        <Button
                                            title={t('orderSummary.Packed Order')}
                                            buttonStyle={styles.buttontwo}
                                            onPress={() => packedOrder()}
                                        />
                                    </View>
                                </View> :
                                    <View style={styles.btmmain}>
                                        <Button
                                            title={t('orderSummary.Packed Order')}
                                            buttonStyle={styles.buttontwo}
                                            onPress={() => packedOrder()}
                                        />
                                    </View>}
                            </>
                            :
                            null
                    }
                    {
                        orderDetails && parseInt(orderDetails.order_status) === 2 ?
                            <>
                                {orderDetails && parseInt(orderDetails.late_order_deducted) === 0 ? <View style={styles.btmmain}>
                                    <View style={styles.btnone}>
                                        <Button title={t('orderSummary.Refuse Order')}
                                            buttonStyle={styles.buttonone}
                                            titleStyle={styles.title}
                                            onPress={() => refusedOrder()}
                                        />
                                    </View>
                                    <View style={styles.btntwo}>
                                        <Button
                                            title={t('orderSummary.Deliver Order')}
                                            buttonStyle={styles.buttontwo}
                                            onPress={() => deliveredOrder()}
                                        />
                                    </View>
                                </View> :
                                    <View style={styles.btmmain}>
                                        <Button
                                            title={t('orderSummary.Deliver Order')}
                                            buttonStyle={styles.buttontwo}
                                            onPress={() => deliveredOrder()}
                                        />
                                    </View>}
                            </>
                            :
                            null
                    }
                </View>
                {
                    note ?
                        <NotesModal
                            open={note}
                            close={() => setNote(false)}
                            item={orderDetails && orderDetails.notes}
                        />
                        :
                        null
                }
                {
                    itemRemove ?
                        <ItemRemoveModal
                            open={itemRemove}
                            close={() => setItemRemove(false)}
                            requestId={orderDetails && orderDetails.request_id}
                            originalOrderId={orderDetails.id}
                            originalAddress={orderDetails.address}
                            getOrderDetails={() => getOrderDetails()}
                        />
                        :
                        null
                }
                {
                    itemDetailPopUp ?
                        <ItemModal
                            id={item}
                            fromOrderSummary={'forConditionHandleOfADD-TO-CART-button'}
                            orderDetails={{ total_amount: orderDetails && orderDetails.total_amount }}
                            open={itemDetailPopUp}
                            close={() => {
                                setItemDetailPopUp(false)
                            }}
                            navigation={props.navigation}
                        />
                        :
                        null
                }
            </ScrollView> : null}
            <Loader loader={loader}></Loader>
        </>
    )
};
export default OrderSummary;