import { useIsFocused } from '@react-navigation/native';
import { Button, Text } from '@rneui/themed';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { LogBox, RefreshControl, ScrollView, View } from 'react-native';
import OrderController from '../../../../apis/Controller/order.controller';
import shopsController from '../../../../apis/Controller/shops.controller';
import { base } from '../../../assets/global_style/base';
import { colors } from '../../../assets/global_style/colors';
import ItemModal from '../../../CustomerComponent/ItemModal';
import BillItemOrderSummary from '../../../ShopComponent/BillItemOrderSummary';
import BillItem from '../../../ShopComponent/BillItems';
import BonnItemList from '../../../ShopComponent/BonnItemlist';
import EditOrderSumList from '../../../ShopComponent/EditOrderSumList';
import PaymentMethod from '../../../ShopComponent/PaymentMethod';
import PaymentQrCode from '../../../ShopComponent/paymentQr';
import RepeatOrder from '../../../ShopComponent/RepeatOrder';
import ShowImage from '../../../ShopComponent/showImage';
import UploadBill from '../../../ShopComponent/UploadBillModal';
import { isEmpty } from '../../Helper/empty';
import Loader from '../../Helper/loader';
import { finaltotalPrice, finaltotalPricePercentage, finaltotalPriceType, handleDiscount, subTotalPrice, totalPrice, totalPrice2 } from '../../Helper/orderHelpers';
import SuccessPopup from '../../Helper/successPopup';
import { Toaster } from '../../Helper/Toaster';
import { styles } from './style';

const MyOrderSummary = (props) => {
    const navparams = props && props.route && props.route.params && props.route.params.item;
    const [repeat, setRepeat] = useState();
    const [Upload, setUpload] = useState();
    const [payment, setPayment] = useState();
    const [loader, setLoader] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [cancelOrder, setCancelOrder] = useState(false);
    const [shopDetail, setShopDetail] = useState(null);
    const [itemsArray, setItemArray] = useState([]);
    const [totalValue, setTotalvalue] = useState(0);
    const [subTotal, setSubTotal] = useState(null);
    const [afterDiscountBillTotal, setAfterDiscountBillTotal] = useState(null);
    const [finalTotalValue, setFinalTotalvalue] = useState(null);
    const [finaltotalValueOnExtraCharges, setFinalTotalValueOnExtraCharges] = useState(null);
    const [paymentQrPopUp, setPaymentQrPopUp] = useState(false);
    const [productDetailId, setProductDetailId] = useState(null);
    const [productDetailPopup, setProductDetailPopup] = useState(false);
    const [handleScanPaymentText, setHandleScanPaymentText] = useState(true);

    const isFocus = useIsFocused();
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        if (isFocus) {
            getOrderDetails(1);
            setLoader(true);
            setAfterDiscountBillTotal(null);
            setTotalvalue(null);
            setFinalTotalvalue(null);
            setSubTotal(null);
        }
    }, [isFocus]);

    useEffect(() => {
        scanPaymentText();
    }, [orderDetails]);

    useEffect(() => {
        if (isFocus && itemsArray && itemsArray.length > 0) {
            handleTotal();
        }
    }, [isFocus, itemsArray]);

    useEffect(() => {
        if (totalValue) {
            handleFinalTotal();
        }
    }, [totalValue, shopDetail]);

    useEffect(() => {
        if (orderDetails && shopDetail) {
            handleSubTotal();
        }
    }, [orderDetails, shopDetail]);

    useEffect(() => {
        if (orderDetails && parseInt(orderDetails.order_status) === 3) {
            if (orderDetails && orderDetails.discount && finalTotalValue) {
                handleBillTotalOnDiscount();
            }
            else return;
        }
    }, [orderDetails, finalTotalValue]);


    useEffect(() => {
        if ((orderDetails && orderDetails.extra_charges) && finalTotalValue) {
            handleFinalTotalOnExtraCharges();
        }
        else return;
    }, [orderDetails, finalTotalValue]);


    const getOrderDetails = async () => {
        let response = await OrderController.orderDetails(navparams);
        if (response && response.status) {
            setOrderDetails(response.page);
            setItemArray(response.page.items);
            setLoader(false);
            setRefreshing(false);
            getShopDetail(response.page.shop_id);
        } else {
            setLoader(false);
            setRefreshing(false);
        }
    };

    const getShopDetail = async (id) => {
        let post = {
            id: id ? id : '',
        };
        let response = await new shopsController.shopDetail(post)
        if (response && response.status) {
            setShopDetail(response && response.shop);
        }
        else return;
    };

    const scanPaymentText = () => {
        if (orderDetails && parseInt(orderDetails.order_status) === 3 && !isEmpty(orderDetails.printed_bill_slip) || orderDetails && parseInt(orderDetails.order_status) === 3 && !isEmpty(orderDetails.transaction_slip)) {
            setHandleScanPaymentText(false);
        }
        else {
            setHandleScanPaymentText(true);
        }
    };

    const handleTotal = () => {
        let totall = totalPrice2(itemsArray);
        setTotalvalue(totall);
    };


    const handleFinalTotal = () => {
        if (parseInt(orderDetails.delivery_type) === 1 || orderDetails.delivery_type === null) {
            if (shopDetail && shopDetail.delivery_charge_type === 'percentage') {
                let total = finaltotalPricePercentage(totalValue, orderDetails && orderDetails.delivery_charges ? parseInt(orderDetails.delivery_charges) : 0, parseInt(orderDetails && orderDetails.service_charge));
                setFinalTotalvalue(total);
            } else {
                let total = finaltotalPrice(totalValue, orderDetails && orderDetails.delivery_charges ? parseInt(orderDetails.delivery_charges) : 0, parseInt(orderDetails && orderDetails.service_charge));
                setFinalTotalvalue(total);
            }
        } else {
            let total = finaltotalPriceType(totalValue, parseInt(orderDetails && orderDetails.service_charge));
            setFinalTotalvalue(total);
        }
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

    const handleBillTotalOnDiscount = () => {
        let newTotal = handleDiscount(finalTotalValue, orderDetails && orderDetails.discount);
        setAfterDiscountBillTotal(newTotal);
    };


    const handleFinalTotalOnExtraCharges = () => {
        if (orderDetails && orderDetails.extra_charges) {
            let amount = finaltotalPriceType(parseInt(finalTotalValue), parseInt(orderDetails.extra_charges));
            if (amount) {
                setFinalTotalValueOnExtraCharges(amount);
            }
            else {
                setFinalTotalValueOnExtraCharges(null);
            }
        }
        else {
            setFinalTotalValueOnExtraCharges(null);
        }
    };


    const orderCancel = async () => {
        let post = {
            orderId: [navparams]
        }
        setLoader(true);
        let response = await OrderController.refuseOrder(post);
        if (response && response.status) {
            setCancelOrder(false);
            new Toaster().success(response.message);
            setLoader(false);
            getOrderDetails()
        } else {
            setLoader(false);

        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        getOrderDetails();
    };

    const handleProductDetailPage = (e) => {
        setProductDetailId(e)
        setProductDetailPopup(true)
    };

    return (
        <>
            {orderDetails ?
                <ScrollView nestedScrollEnabled={true}
                    contentContainerStyle={styles.scroll}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                    <View style={styles.main}>
                        <View style={base.container}>
                            <View style={styles.viewedit}>
                                {orderDetails && parseInt(orderDetails.request_status) === 0 ?
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={styles.edit}>{t("orderSummary.Edit request already submitted")}</Text>
                                        <View style={styles.viewpending}>
                                            <Text style={[styles.delivery, { color: orderDetails && parseInt(orderDetails.request_status) == 0 ? colors.black : colors.lightgrey }]}>{t('status.Pending')}</Text>
                                        </View>
                                    </View>
                                    : orderDetails && parseInt(orderDetails.request_status) === 1 ?
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={styles.edit}>{t("orderSummary.Edit request already submitted")}</Text>
                                            <View style={styles.viewpending222}>
                                                <Text style={[styles.delivery, { color: orderDetails && parseInt(orderDetails.request_status) == 1 ? colors.black : colors.lightgrey }]}>{t("status.Accepted")}</Text>
                                            </View>
                                        </View> : orderDetails && parseInt(orderDetails.request_status) === 2 ?
                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={styles.edit}>{t("orderSummary.Edit request already submitted")}</Text>
                                                <View style={styles.viewpending33}>
                                                    <Text style={[styles.delivery, { color: orderDetails && parseInt(orderDetails.request_status) == 2 ? colors.red : colors.lightgrey }]}>{t("status.Declined")}</Text>
                                                </View>
                                            </View> :
                                            <>
                                                {orderDetails && parseInt(orderDetails.order_status) === 0 ? <TouchableOpacity onPress={() => props.navigation.navigate('editorder', { item: orderDetails && orderDetails.id })}>
                                                    <Text style={styles.edit}>{t("orderSummary.Edit order")}</Text>
                                                </TouchableOpacity> : null}</>}
                            </View>
                            <View>
                                <EditOrderSumList
                                    item={orderDetails}
                                />
                            </View>
                            {orderDetails && orderDetails.items_count ? <Text style={styles.item}>{orderDetails.items_count}{' '}{parseInt(orderDetails.items_count) === 1 ? t('orderSummary.item') : t('orderSummary.items')} </Text> : null}
                            <View style={styles.viewbonn}>
                                <ScrollView nestedScrollEnabled={true}
                                    contentContainerStyle={styles.scroll}
                                    showsVerticalScrollIndicator={false}
                                >
                                    <BonnItemList
                                        data={itemsArray}
                                        shopDetail={orderDetails && orderDetails.shop}
                                        action={(e) => handleProductDetailPage(e)} />
                                </ScrollView>
                            </View>
                            {orderDetails && orderDetails.address ? <><Text style={styles.delivery}>{t("orderSummary.Delivery Address")}</Text><View style={styles.Container}>
                                {orderDetails && orderDetails.address ? <Text style={styles.txt}>{orderDetails.address}</Text> : null}
                            </View></> : null}
                            {orderDetails && orderDetails.notes ? <Text style={styles.notes}>{t("orderSummary.Notes")}</Text> : null}
                            {orderDetails && orderDetails.notes ? <View style={styles.subMain}>
                                <Text style={styles.fusce}>{orderDetails.notes}</Text>
                            </View> : null}
                            {orderDetails && orderDetails.order_prec ?
                                <Text style={styles.notes}>{t("orderSummary.Medical Prescription")}</Text>
                                : null}
                            {orderDetails && orderDetails.order_prec ?
                                <ShowImage
                                    image={orderDetails.order_prec}
                                    navigation={props.navigation}
                                />
                                : null}
                            {orderDetails && orderDetails.printed_bill_slip ?
                                <Text style={styles.notes}>{t("orderSummary.Printed Bill")}</Text>
                                : null}
                            {orderDetails && orderDetails.printed_bill_slip ?
                                <ShowImage
                                    image={orderDetails.printed_bill_slip}
                                    navigation={props.navigation}
                                />
                                : null}
                            {orderDetails && orderDetails.transaction_slip ?
                                <Text style={styles.notes}>{t("orderSummary.Transaction Slip")}</Text>
                                : null}
                            {orderDetails && orderDetails.transaction_slip ?
                                <ShowImage
                                    image={orderDetails.transaction_slip}
                                    navigation={props.navigation}
                                />
                                : null}
                            <View style={styles.bill}>
                                <BillItemOrderSummary
                                    type={orderDetails && orderDetails.delivery_type}
                                    totalValue={totalValue}
                                    userType={'customer'}
                                    finalTotalValue={finalTotalValue}
                                    deliveredOrderStatus={orderDetails && parseInt(orderDetails.order_status) === 3 ? 'show' : null}
                                    discount={orderDetails && orderDetails.discount > 0 ? orderDetails.discount : null}
                                    afterDiscountBillTotal={afterDiscountBillTotal}
                                    serviceChargesPrice={orderDetails && orderDetails.service_charge}
                                    service_charge={orderDetails && orderDetails.service_charge}
                                    delivery_charges={orderDetails && orderDetails.delivery_charges}
                                    delivery_charge_type={shopDetail && shopDetail.delivery_charge_type}
                                    shopDetail={orderDetails && orderDetails.shop}
                                    subTotal={subTotal}
                                    handleSubTotalHideShow={orderDetails && orderDetails.total_amount === null && orderDetails && parseInt(orderDetails.order_status) === 0
                                        || orderDetails && orderDetails.total_amount === null && orderDetails && parseInt(orderDetails.order_status) === 1 ? 'show' : null}
                                    extraCharges={orderDetails && orderDetails.extra_charges}
                                    finaltotalValueOnExtraCharges={finaltotalValueOnExtraCharges}
                                />
                            </View>
                            {orderDetails && orderDetails.payment_method === "online" && handleScanPaymentText ? <View style={styles.bill22}>
                                <TouchableOpacity onPress={() => setPaymentQrPopUp(true)}>
                                    <Text style={styles.notes22}>{t("orderSummary.Scan Payment QR code")}</Text>
                                </TouchableOpacity>
                            </View> : null}
                            {orderDetails && parseInt(orderDetails && orderDetails.order_status) === 0 ? <View style={styles.button}>
                                <Button title={t('orderSummary.Cancel order')}
                                    buttonStyle={styles.buttonstyle}
                                    titleStyle={styles.Title}
                                    onPress={() => setCancelOrder(true)}
                                />
                            </View> : null}

                            {orderDetails && parseInt(orderDetails && orderDetails.order_status) === 1 && !isEmpty(orderDetails.payment_method) ? <View style={styles.button}>
                                <Button title={t('orderSummary.Cancel order')}
                                    buttonStyle={styles.buttonstyle}
                                    titleStyle={styles.Title}
                                    onPress={() => setCancelOrder(true)}
                                />
                            </View> : null}

                            {orderDetails && parseInt(orderDetails && orderDetails.order_status) === 1 && isEmpty(orderDetails.payment_method) ? <View style={styles.mainbtn}>
                                <View style={styles.btnone}>
                                    <Button title={t('orderSummary.Cancel order')}
                                        buttonStyle={styles.buttonone}
                                        titleStyle={styles.title}
                                        onPress={() => setCancelOrder(true)}
                                    />
                                </View>
                                <View style={styles.btntwo}>
                                    <Button title={t('orderSummary.Pay for order')}
                                        buttonStyle={styles.buttontwo}
                                        onPress={() => setPayment(true)}
                                    />
                                </View>
                            </View> :
                                null}
                            {orderDetails && (parseInt(orderDetails.order_status) === 2 || parseInt(orderDetails.order_status) === 3) && isEmpty(orderDetails.payment_method) ? <View style={styles.viewbtn}>
                                <Button title={t('orderSummary.Pay for order')}
                                    buttonStyle={styles.buttonpay}
                                    onPress={() => setPayment(true)}
                                />
                            </View> : null}
                            {/* OrderSummary -> edit order-> delivery-> Upload bill & Repeat Order */}
                            {orderDetails && parseInt(orderDetails.order_status) === 3 && isEmpty(orderDetails.printed_bill_slip) && !isEmpty(orderDetails.payment_method) ? <View style={styles.mainbtn}>
                                <View style={styles.btnone}>
                                    <Button title={t('orderSummary.Upload bill')}
                                        buttonStyle={styles.buttonone}
                                        titleStyle={styles.title}
                                        onPress={() => setUpload(true)}
                                    />
                                </View>
                                <View style={styles.btntwo}>
                                    <Button title={t('orderSummary.Repeat order')}
                                        buttonStyle={styles.buttontwo}
                                        onPress={() => setRepeat(true)}
                                    />
                                </View>
                            </View> : null}
                            {orderDetails && parseInt(orderDetails.order_status) === 3 && !isEmpty(orderDetails.printed_bill_slip) ?
                                <View style={styles.button}>
                                    <Button title={t('orderSummary.Repeat order')}
                                        buttonStyle={styles.buttontwo}
                                        onPress={() => setRepeat(true)}
                                    />
                                </View>
                                : null}
                        </View>
                        {payment ? <PaymentMethod
                            open={payment}
                            orderId={navparams}
                            close={() => {
                                setPayment(false)
                            }}
                            navigation={props.navigation}
                            getOrderDetails={() => getOrderDetails()}
                            setPaymentQrPopUp={() => setPaymentQrPopUp(true)}
                        /> : null}
                        {Upload ? <UploadBill
                            open={Upload}
                            close={() => setUpload(false)}
                            orderId={navparams}
                            navigation={props.navigation}
                            getOrderDetails={() => getOrderDetails()}
                            orderDetails={orderDetails}
                        /> : null}
                        {repeat ? <RepeatOrder
                            open={repeat}
                            close={() => setRepeat(false)}
                            navigation={props.navigation}
                            action={() => {
                                props.navigation.navigate('editorder', { item: orderDetails && orderDetails.id, repeat: 'repeat' })
                                setRepeat(false)
                            }}
                        /> : null}
                        {cancelOrder ? <SuccessPopup
                            open={cancelOrder}
                            close={() => setCancelOrder(false)}
                            onConfirm={() => orderCancel()}
                            RightButtonText={t("SuccessPopup.Proceed")}
                            message={t('SuccessPopup.Cancel this order.')}
                            message1={t('SuccessPopup.Click on proceed button')}
                            label={t("SuccessPopup.Are you sure?")}
                        /> : null}
                        {paymentQrPopUp ? <PaymentQrCode
                            open={paymentQrPopUp}
                            close={() => setPaymentQrPopUp(false)}
                            image={orderDetails && orderDetails.shop && orderDetails.shop.payment_qr_code}
                        /> : null}
                    </View>
                </ScrollView> : null}
            <Loader loader={loader} />
            {productDetailPopup ?
                <ItemModal
                    id={productDetailId}
                    shopDetail={orderDetails && orderDetails.shop}
                    orderDetails={{ total_amount: orderDetails && orderDetails.total_amount }}
                    fromOrderSummary={'forConditionHandleOfADD-TO-CART-button'}
                    open={productDetailPopup}
                    close={() => {
                        setProductDetailPopup(false)
                        // props.setArray()
                    }}
                    navigation={props.navigation}
                />
                : null}
        </>
    )
};
export default MyOrderSummary;