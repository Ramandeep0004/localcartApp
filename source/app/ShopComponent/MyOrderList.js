import { useIsFocused } from '@react-navigation/native';
import { Button, Icon, Image, Text, Tooltip } from '@rneui/themed';
import { t } from 'i18next';
import { isEmpty } from 'lodash';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Platform } from 'react-native';
import { Modal } from 'react-native';
import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import shopsController from '../../apis/Controller/shops.controller';
import { base } from '../assets/global_style/base';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, vp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';
import { Images } from '../assets/global_style/images';
import { dateFormatFull, newdateformat } from '../components/Helper/date.formats';
import { numberFormat, renderImage } from '../components/Helper/general';
import { finaltotalPriceType, findPercentage } from '../components/Helper/orderHelpers';
import { Toaster } from '../components/Helper/Toaster';
import PaymentMethod from './PaymentMethod';
import PaymentQrCode from './paymentQr';

const MyOrderList = (props) => {
    const [payment, setPayment] = useState();
    const [paymentQrPopUp, setPaymentQrPopUp] = useState(false);
    const [open, setOpen] = useState(false);
    const [finalTotal, setFinalTotal] = useState(null);

    const item = props && props.item;

    let isFocus = useIsFocused();
    useEffect(() => {
        if (isFocus) {
            setOpen(false);
        }
    }, [isFocus]);

    useEffect(() => {
        if (isFocus && item && item.extra_charges) {
            handleFinalTotalOnExtraCharges();
        }
    }, [isFocus, item]);


    const handleCallAcivity = (nmbr) => {
        let phoneNumber = '';
        if (nmbr) {
            if (Platform.OS === 'android') {
                phoneNumber = `tel:${nmbr}`;
            }
            else {
                phoneNumber = `telprompt:${nmbr}`;
            }
            Linking.openURL(phoneNumber);
        }
        else {
            new Toaster().error(t('orderSummary.No contact number found'))
        }
    };


    const handleFinalTotalOnExtraCharges = () => {
        let extraCharges =  item && item.extra_charges ? item.extra_charges : null
        let finalTotalValue = item && item.total_amount ? item.total_amount : null
        let amount = finaltotalPriceType(parseInt(finalTotalValue), parseInt(extraCharges));
        if (amount) {
            setFinalTotal(amount);
        }
        else {
            setFinalTotal(null);
        }
    };
    
 
    return (
        <View>

            {item ?
                <TouchableOpacity onPress={() => props.action(item)}>
                    <DropShadow style={styles.Shadow}>
                        <View style={styles.SubCon}>
                            <View style={styles.viewwhite}>
                                <View style={[base.subrow, { alignItems: 'center', justifyContent: 'space-between' }]}>
                                    {
                                        item && item.order_id ?
                                            <View>
                                                <Text style={styles.textqr2}>{t("orderSummary.Order ID")} : <Text style={styles.textqr}>{item.order_id}</Text></Text>
                                            </View>
                                            :
                                            null
                                    }
                                    <View>
                                        <View style={styles.mainpend}>
                                            <View style={[styles.viewpending, { backgroundColor: parseInt(item.order_status) == 0 ? colors.Lgreen : parseInt(item.order_status) == 6 ? colors.RedL : parseInt(item.order_status) == 4 ? colors.RedL : parseInt(item.order_status) == 5 ? colors.RedL : colors.offLgreen }]}>
                                                <Text style={[styles.Pending, { color: parseInt(item.order_status) == 0 ? colors.black : parseInt(item.order_status) == 6 ? colors.red : parseInt(item.order_status) == 5 ? colors.red : parseInt(item.order_status) == 4 ? colors.red : colors.parrotgreen }]}>{parseInt(item.order_status) == 0 ? t('status.Pending') : parseInt(item.order_status) == 1 ? t("status.Accepted") : parseInt(item.order_status) == 2 ? t("status.Packed") : parseInt(item.order_status) == 3 ? t("status.Delivered") : parseInt(item.order_status) == 4 ? t("status.Refused by customer") : parseInt(item.order_status) == 5 ? t("status.Refused by shopkeeper") : parseInt(item.order_status) == 6 ? t("status.Cancel") : parseInt(item.order_status) == 8 ? t("status.Packing") : null}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                {item.items_count ? <Text style={styles.item}>{t("orderSummary.Quantity")} : {parseInt(item.items_count) > 1 ? `${item.items_count} ${t("orderSummary.items")}` : `${item.items_count} ${t("orderSummary.item")}`}</Text> : null}
                                <View style={[base.row]}>
                                    <View style={base.col6}>
                                        <Text style={styles.amount}>{item && item.total_amount ? `${t('orderSummary.Total Amount')} :` : ''} <Text style={styles.rupee}>{finalTotal ? `₹ ${finalTotal}` : item && item.total_amount ? `₹ ${numberFormat(item.total_amount)}` : ''}</Text></Text>
                                    </View>
                                    <View style={base.col6}>
                                        {item.status && item.status == "pending" ? <View style={styles.viewrow}>
                                            <Text style={styles.pick}>{item && parseInt(item.delivery_type) === 1 ? t('orderSummary.Home Delivery') : t('orderSummary.Pickup')}  {newdateformat(item.pickup_date)}, {item.pickup_time}</Text>
                                        </View> : null}
                                    </View>
                                </View>
                            </View>
                            <View style={styles.viewgrey}>
                                <View style={base.col12}>
                                    <View style={base.row}>
                                        <View style={styles.MainImage}>
                                            <Image style={styles.image}
                                                source={item.shop_image ? renderImage(item.shop_image, 'medium') : Images.dummyShop}
                                                resizeMode='cover'
                                            />
                                        </View>
                                        <View style={styles.MainView}>
                                            <View style={styles.Vone}>
                                                {item.shop_name ? <Text style={styles.bablu}>{item.shop_name}</Text> : null}
                                                {item.shopkeeper_detail && item.shopkeeper_detail.first_name && item.shopkeeper_detail.last_name ? <Text style={styles.arnav}>{item.shopkeeper_detail && item.shopkeeper_detail.first_name}{' '}{item.shopkeeper_detail && item.shopkeeper_detail.last_name} {item && item.shopkeeper_type ? (`(${item.shopkeeper_type})`) : ''} </Text> : null}
                                            </View>
                                            <View style={styles.Vtwo}>
                                                {
                                                    item && parseInt(item.shop_status) === 1 ?
                                                        <TouchableOpacity onPress={() => handleCallAcivity(item && item.shopkeeper_detail && item.shopkeeper_detail.phonenumber ? item.shopkeeper_detail.phonenumber : '')}>
                                                            <View style={styles.Viewicon} >
                                                                <Icon type={IconsType.feather}
                                                                    name={Icons.phone}
                                                                    size={Dimension.smallicon}
                                                                    color={colors.white}
                                                                />
                                                            </View>
                                                        </TouchableOpacity>
                                                        :
                                                        <View style={styles.Viewicon2}>
                                                            <Tooltip
                                                                visible={open}
                                                                containerStyle={styles.tooltipMain}
                                                                onOpen={() => {
                                                                    setOpen(true);
                                                                }}
                                                                onClose={() => {
                                                                    setOpen(false);
                                                                }}
                                                                popover={
                                                                    <Text style={styles.tooltipText}>
                                                                        {
                                                                            t('tooltip.Shop is currently closed.You may contact when the shop is open.')
                                                                        }
                                                                    </Text>
                                                                }
                                                                height={hp(70)}
                                                                width={hp(280)}
                                                                withOverlay={false}
                                                                backgroundColor={colors.lightprimary}
                                                            >
                                                                <Icon
                                                                    containerStyle={styles.marginL}
                                                                    type={IconsType.feather}
                                                                    name={Icons.phone}
                                                                    size={Dimension.smallicon}
                                                                    color={colors.white}

                                                                />
                                                            </Tooltip>
                                                        </View>
                                                }
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.line} />
                                <View style={styles.viewRow}>
                                    <View style={styles.vone}>
                                        <Text style={styles.placed}>{t("orderSummary.Placed on")} {dateFormatFull(item.created)}</Text>
                                    </View>
                                    {/* <View style={styles.vtwo}>
                                        <Button title={'View detail'} buttonStyle={styles.buttonstyle} onPress={() => props.action()} />
                                    </View> */}
                                    {item && (parseInt(item.order_status) === 1 || parseInt(item.order_status) === 2 || parseInt(item.order_status) === 3) && isEmpty(item.payment_method) ?
                                        <View style={styles.vtwo}>
                                            <Button title={t('orderSummary.Pay for order')}
                                                buttonStyle={styles.buttonstyle}
                                                onPress={() => props.navigation.navigate('customerordersummary', { item: item.id })}
                                            />
                                        </View> : null}
                                </View>
                            </View>
                        </View>
                    </DropShadow>
                </TouchableOpacity>
                : null}
            {payment ? <PaymentMethod
                open={payment}
                orderId={item && item.id}
                close={() => setPayment(false)}
                navigation={props.navigation}
                getOrderDetails={() => props.getOrders()}
                setPaymentQrPopUp={() => setPaymentQrPopUp(true)}
            /> : null}
            {paymentQrPopUp ? <PaymentQrCode
                open={paymentQrPopUp}
                close={() => setPaymentQrPopUp(false)}
                image={item && item.payment_qr_code}
            /> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    Shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    flat: {
        marginTop: vp(15),
        paddingBottom: vp(20),
    },
    SubCon: {
        borderRadius: hp(10),
        marginHorizontal: vp(2),
        marginTop: vp(2),
        marginBottom: vp(18),
        overflow: 'hidden',
    },
    viewwhite: {
        backgroundColor: colors.white,
        paddingHorizontal: vp(20),
        paddingTop: vp(20),
        paddingBottom: vp(15),
        overflow: 'hidden',
    },
    textqr: {
        fontSize: fp(16),
        color: colors.Secondary,
        fontFamily: Font.semiBold,
    },
    mainpend: {
        alignItems: 'flex-end',
        marginRight: vp(-5)
    },
    Pending: {
        fontSize: fp(13),
        color: colors.black,
        fontFamily: Font.regular,
        textTransform: 'capitalize'
    },
    viewpending: {
        // height: hp(23),
        // maxWidth: hp(200),
        // paddingHorizontal: hp(5),
        paddingHorizontal: vp(12),
        paddingVertical: vp(4),
        borderRadius: hp(20),
        backgroundColor: colors.Lgreen,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        fontSize: fp(15),
        color: colors.lightgrey,
        fontFamily: Font.regular,
        paddingTop: vp(2)
    },
    amount: {
        fontSize: fp(15),
        color: colors.lightgrey,
        fontFamily: Font.regular,
        paddingTop: vp(2)
    },
    rupee: {
        fontSize: fp(15),
        color: colors.lightgrey,
        fontFamily: Font.semiBold,
    },
    pick: {
        fontSize: fp(11),
        color: colors.lightgrey,
        fontFamily: Font.regular,
    },
    viewrow: {
        alignItems: 'flex-end',
        paddingTop: vp(4),
    },
    viewgrey: {
        backgroundColor: colors.background,
        paddingTop: vp(15),
        paddingHorizontal: vp(20),
        paddingBottom: vp(20),
    },
    image: {
        height: '100%',
        width: '100%',
    },
    MainImage: {
        height: hp(50),
        width: hp(50),
        borderRadius: hp(25),
        overflow: 'hidden',
    },
    MainView: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: vp(15)
    },
    Vone: {
        flex: .85,
        // backgroundColor: 'green',
    },
    Vtwo: {
        flex: .15,
        // backgroundColor: 'red',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    bablu: {
        fontSize: fp(18),
        fontFamily: Font.semiBold,
        color: colors.black,
        textTransform: 'capitalize'
    },
    Viewicon: {
        height: hp(40),
        width: hp(40),
        borderRadius: hp(20),
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    arnav: {
        fontSize: fp(15),
        fontFamily: Font.regular,
        color: colors.lightgrey,
        paddingTop: vp(2)
    },
    line: {
        height: hp(1),
        backgroundColor: colors.inputbordercol,
        marginTop: vp(15),
    },
    viewRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: vp(20),
    },
    vone: {
        flex: .67,
    },
    vtwo: {
        flex: .33,
        // backgroundColor: 'red'
    },
    placed: {
        fontSize: fp(12),
        fontFamily: Font.regular,
        color: colors.lightgrey,
    },
    buttonstyle: {
        backgroundColor: colors.primary,
        paddingHorizontal: vp(0),
        paddingVertical: vp(8)
    },
    textqr2: {
        fontSize: fp(16),
        color: colors.black,
        fontFamily: Font.semiBold,
        marginLeft: hp(-5)
    },
    tooltipMain: {
        borderRadius: hp(10),
        backgroundColor: colors.lightprimary
    },
    Viewicon2: {
        height: hp(40),
        width: hp(40),
        borderRadius: hp(20),
        backgroundColor: colors.gray,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tooltipText: {
        fontSize: fp(15),
        color: colors.black,
        fontFamily: Font.regular,
    },
});

export default MyOrderList;