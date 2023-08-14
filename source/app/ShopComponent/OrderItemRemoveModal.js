import { Button, CheckBox, Icon, Image, Input, Text } from '@rneui/themed';
import { t } from 'i18next';
import React from 'react';
import { useState } from 'react';
import { FlatList } from 'react-native';
import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ImageBackground, StatusBar, View } from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import { base } from '../assets/global_style/base';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, vp, hzp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';
import { Images } from '../assets/global_style/images';
import { dateFormatFull } from '../components/Helper/date.formats';
import { renderImage } from '../components/Helper/general';

const OrderItemRemove = (props) => {
    const { item, originalAddress } = props;
    return (
        <View>
            <DropShadow style={styles.Shadow}>
                <View style={styles.subcontainer}>
                    <View style={base.row}>
                        <View style={base.col9}>
                            <Text style={styles.textqr22}>{t("orderSummary.Order ID")}: <Text style={styles.textqr}>{item.order_id}</Text></Text>
                        </View>
                        <View style={base.col3}>
                            <View style={styles.mainpend}>
                                {/* New->  Pending */}
                                {item && parseInt(item.order_status) === 0 ?
                                    <View style={styles.viewpending}>
                                        <Text style={styles.Pending}>{t("status.Pending")}</Text>
                                    </View>
                                    :
                                    item && parseInt(item.order_status) === 1 ?
                                        <View style={styles.viewaccept}>
                                            <Text style={styles.accept}>{t("status.Accepted")}</Text>
                                        </View>
                                        :
                                        item && parseInt(item.order_status) === 2 ?
                                            <View style={styles.viewaccept}>
                                                <Text style={styles.accept}>{t("status.Packed")}</Text>
                                            </View>
                                            :
                                            item && parseInt(item.order_status) === 3 ?
                                                <View style={styles.viewCom}>
                                                    <Text style={styles.Complt}>{t("status.Completed")}</Text>
                                                </View>
                                                :
                                                item && parseInt(item.order_status) === 4 ?
                                                    <View style={styles.viewref2}>
                                                        <Text style={styles.refuse}>{t("status.Refused by Customer")}</Text>
                                                    </View>
                                                    :
                                                    item && parseInt(item.order_status) === 5 ?
                                                        <View style={styles.viewref2}>
                                                            <Text style={styles.refuse}>{t("status.Refused by Shopkeeper")}</Text>
                                                        </View>
                                                        :
                                                        item && parseInt(item.order_status) === 6 ?
                                                            <View style={styles.viewref}>
                                                                <Text style={styles.refuse}>{t("status.Refused")}</Text>
                                                            </View>
                                                            :
                                                            null}
                            </View>
                        </View>
                    </View>
                    <View style={styles.viewpay}>
                        <View style={[base.subrow, styles.submain]}>
                            <View>
                                {item && item.payment_method ? <Text style={styles.amount}>{t("orderSummary.Payment")} : {item.payment_method ? item.payment_method : null}</Text> : null}
                            </View>
                            {/* <View style={base.col6}> */}
                            <View style={styles.viewrow}>
                                <Text style={styles.pick}>{item && parseInt(item.delivery_type) === 1 ? t('orderSummary.Home Delivery') : t('orderSummary.Pickup')} {dateFormatFull(item.pickup_date)}, {item.pickup_time ? item.pickup_time : null}</Text>
                            </View>
                            {/* </View> */}
                        </View>
                    </View>
                    <View style={styles.SubMain}>
                    </View>
                    {/* <View style={styles.viewgrey}> */}
                    <View style={[base.row,{justifyContent:'center',alignItems:'center'}]}>
                        <View style={styles.MainImage}>
                            <Image style={styles.image} 
                            source={item && item.user && item.user.image ? renderImage(item.user.image, 'medium') : Images.user} 
                            />
                        </View>
                        <View style={styles.MainView}>
                            <View style={styles.Vone}>
                                {
                                    item && item.user && item.user.first_name ?
                                        <Text style={styles.bablu}>{item.user.first_name} {item.user.last_name ? item.user.last_name : null}</Text>
                                        :
                                        null
                                }
                                {
                                    originalAddress || item && item.address ?
                                        <View style={styles.viewloc}>
                                            <View style={base.row}>
                                                <Icon type={IconsType.ionIcon}
                                                    name={Icons.locationsharp}
                                                    size={Dimension.Vsmall}
                                                    color={colors.lightgrey}
                                                />
                                                <Text style={styles.lore}>{originalAddress ? originalAddress : item.address}</Text>
                                            </View>
                                        </View>
                                        :
                                        null
                                }
                            </View>
                            {/* <View style={styles.Vtwo}>
                                <View style={styles.Viewicon}>
                                    <Icon type={IconsType.feather} name={Icons.phone} size={Dimension.smallicon} color={colors.white} />
                                </View>
                            </View> */}
                        </View>
                    </View>
                    {/* </View> */}
                </View>
            </DropShadow>
        </View>
    );
};

const styles = StyleSheet.create({
    subcontainer: {
        backgroundColor: colors.white,
        marginTop: vp(20),
        paddingHorizontal: hzp(20),
        paddingVertical: vp(20),
        borderRadius: hp(10),
        marginHorizontal: vp(2),
        overflow: 'hidden',
    },
    checkcon: {
        margin: 0,
        padding: 0,
        marginHorizontal: 0,
        backgroundColor: colors.white,
        marginLeft: vp(-5)
    },
    flat: {
        paddingBottom: vp(10),
    },
    SubMain: {
        borderBottomWidth: 1,
        borderBottomColor: colors.LLgrey,
        marginBottom: vp(15),
        paddingBottom: vp(15),
    },
    textqr: {
        fontSize: fp(16),
        color: colors.Secondary,
        fontFamily: Font.semiBold,
    },
    textqr22: {
        fontSize: fp(16),
        color: colors.black,
        fontFamily: Font.semiBold,
    },
    Pending: {
        fontSize: fp(13),
        color: colors.black,
        fontFamily: Font.regular,
    },
    viewpending: {
        height: hp(23),
        width: hp(70),
        borderRadius: hp(20),
        backgroundColor: colors.Lgreen,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewaccept: {
        height: hp(23),
        width: hp(70),
        borderRadius: hp(20),
        backgroundColor: colors.offLgreen,
        justifyContent: 'center',
        alignItems: 'center',
    },
    accept: {
        fontSize: fp(13),
        color: colors.parrotgreen,
        fontFamily: Font.regular,
    },
    mainpend: {
        alignItems: 'flex-end',
        marginRight: vp(-5)
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
        paddingTop: vp(4)
    },
    viewpay: {
        marginTop: vp(8),
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
        flex: 1,
        // backgroundColor: 'green',
    },
    // Vtwo: {
    //     flex: .15,
    //     // backgroundColor: 'red',
    //     alignItems: 'flex-end',
    //     justifyContent: 'center'
    // },
    bablu: {
        fontSize: fp(18),
        fontFamily: Font.semiBold,
        color: colors.black,
    },
    lore: {
        fontSize: fp(14),
        fontFamily: Font.regular,
        color: colors.lightgrey,
        paddingRight: hp(7),
        paddingLeft: hp(3)
    },
    viewloc: {
        marginTop: vp(2),
        paddingLeft: vp(2)
    },
    Viewicon: {
        height: hp(40),
        width: hp(40),
        borderRadius: hp(20),
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
    subCon: {
        backgroundColor: colors.offpink,
        flexDirection: 'row',
        paddingHorizontal: vp(20),
        marginHorizontal: hzp(-20),
        alignItems: 'center',
        marginVertical: vp(15),
        paddingVertical: vp(10),
    },
    custom: {
        fontSize: fp(13),
        color: colors.lightgrey,
        fontFamily: Font.regular,
        paddingLeft: vp(10),
    },
    image: {
        height: '100%',
        width: '100%',
    },
    mainimage: {
        height: hp(19),
        width: hp(19),
        overflow: 'hidden',
    },
    viewCom: {
        height: hp(23),
        width: hp(75),
        borderRadius: hp(20),
        backgroundColor: colors.btngrey,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewref2: {
        paddingVertical: vp(4),
        paddingHorizontal: vp(8),
        width: hp(144),
        borderRadius: hp(20),
        backgroundColor: colors.lightred,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Complt: {
        fontSize: fp(13),
        color: colors.lightgrey,
        fontFamily: Font.regular,
    },
    viewref: {
        height: hp(23),
        width: hp(68),
        borderRadius: hp(20),
        backgroundColor: colors.lightred,
        justifyContent: 'center',
        alignItems: 'center',
    },
    refuse: {
        fontSize: fp(13),
        color: colors.red,
        fontFamily: Font.regular,
    },
    viewgrey: {
        backgroundColor: colors.background,
        marginHorizontal: vp(-21),
        paddingHorizontal: vp(20),
        paddingTop: vp(15),
        marginTop: vp(-15),
        marginBottom: vp(-20),
        paddingBottom: vp(20),
        overflow: 'hidden'
    },
    submain: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default OrderItemRemove;