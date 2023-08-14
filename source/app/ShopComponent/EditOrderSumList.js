import { useIsFocused } from '@react-navigation/native';
import { Icon, Image, Text, Tooltip } from '@rneui/themed';
import { t } from 'i18next';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Linking, Modal } from 'react-native';
import { Platform } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, View } from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import shopsController from '../../apis/Controller/shops.controller';
import { base } from '../assets/global_style/base';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, vp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';
import { Images } from '../assets/global_style/images';
import { newdateformat } from '../components/Helper/date.formats';
import { renderImage } from '../components/Helper/general';
import { Toaster } from '../components/Helper/Toaster';

const EditOrderSumList = (props) => {
    const { item } = props;
    const [shopOpen, setShopOpen] = useState(false);
    const [open, setOpen] = useState(false);

    let isFocus = useIsFocused();
    useEffect(() => {
        if (isFocus && item) {
            shopOpenCloseStatus();
        }
    }, [isFocus, item]);

    useEffect(() => {
        if (isFocus) {
            setOpen(false);
        }
    }, [isFocus]);

    const shopOpenCloseStatus = async () => {
        let id = item && item.shop ? item.shop.id : ''
        let response = await shopsController.getShopOpenCloseStatus(id);
        if (response && response.status) {
            if (parseInt(response.shop_status) === 1) {
                setShopOpen(true);
            }
            else {
                setShopOpen(false);
            }
        }
        else return;
    };

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
            new Toaster().error('No contact number Found')
        }
    };

    return (
        <View>
            {item ?
                <DropShadow style={styles.Shadow}>
                    <View style={styles.SubCon}>
                        <View style={styles.viewwhite}>
                            <View style={[base.subrow, { alignItems: 'center', justifyContent: 'space-between' }]}>
                                <View>
                                    {item && item.order_id ?
                                        <Text style={styles.textqr2}>{t("orderSummary.Order ID")} : <Text style={styles.textqr}>{item.order_id}</Text></Text>
                                        : null
                                    }
                                </View>
                                <View>
                                    <View style={styles.mainpend}>
                                        <View style={parseInt(item.order_status) == 0 ? styles.viewpending : parseInt(item.order_status) == 6 ? styles.viewcancel : parseInt(item.order_status) == 4 ? styles.viewcancel : parseInt(item.order_status) == 5 ? styles.viewcancel : styles.viewaccept}>
                                            <Text style={[styles.delivery, { color: parseInt(item.order_status) == 0 ? colors.black : parseInt(item.order_status) == 6 ? colors.red : parseInt(item.order_status) == 5 ? colors.red : parseInt(item.order_status) == 4 ? colors.red : colors.lightgrey }]}>{parseInt(item.order_status) == 0 ? t('status.Pending') : parseInt(item.order_status) == 1 ? t("status.Accepted") : parseInt(item.order_status) == 2 ? t("status.Packed") : parseInt(item.order_status) == 3 ? t("status.Delivered") : parseInt(item.order_status) == 4 ? t("status.Refused by customer") : parseInt(item.order_status) == 5 ? t("status.Refused by shopkeeper") : parseInt(item.order_status) == 6 ? t("status.Cancel") : parseInt(item.order_status) == 8 ? t("status.Packing") : null}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {/* <View style={styles.viewmain}> */}
                            <View style={[base.subrow, styles.viewmain]}>
                                <View>
                                    {item.payment_method ? <Text style={styles.amount}>{t("orderSummary.Payment")} : {item.payment_method}</Text> : null}
                                </View>
                                {/* <View style={base.col6}> */}
                                {
                                    item.pickup_date && item.pickup_time ?
                                        <View style={styles.viewrow}>
                                            <Text style={styles.pick}>{item && parseInt(item.delivery_type) === 1 ? t('orderSummary.Home Delivery') : t('orderSummary.Pickup')}  {newdateformat(item.pickup_date)}, {item.pickup_time}</Text>
                                        </View>
                                        :
                                        null
                                }
                                {/* </View> */}
                            </View>
                            {/* </View> */}
                        </View>
                        <View style={styles.viewgrey}>
                            <View style={base.col12}>
                                <View style={base.row}>
                                    <View style={styles.MainImage}>
                                        <Image style={styles.image}
                                            source={item.shop && item.shop.image ? renderImage(item.shop.image) : Images.dummyShop}
                                            resizeMode='cover'
                                        />
                                    </View>
                                    <View style={styles.MainView}>
                                        {item ? <View style={styles.Vone}>
                                            {item.shop && item.shop.shop_name ? <Text style={styles.bablu}>{item.shop ? item.shop.shop_name : null}</Text> : null}
                                            {item.shop && (item.shop.shopkeeper_first_name && item.shop.shopkeeper_last_name) || item.shopkeeper_type ? <Text style={styles.arnav}>{item.shop.shopkeeper_first_name}{' '}{item.shop.shopkeeper_last_name} {item.shopkeeper_type ? (`(${(item.shopkeeper_type)})`) : null} </Text> : null}
                                        </View> : null}
                                        <View style={styles.Vtwo}>
                                            {
                                                shopOpen ?
                                                    <TouchableOpacity onPress={() => handleCallAcivity(item && item.shop && item.shop.shopkeeper_phonenumber ? item.shop.shopkeeper_phonenumber : '')} >
                                                        <View style={styles.Viewicon}>
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
                        </View>
                    </View>
                </DropShadow> : null}
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
        // backgroundColor: 'red'
        // marginRight: vp(-5)
    },
    Pending: {
        fontSize: fp(13),
        color: colors.black,
        fontFamily: Font.regular,
    },
    viewpending: {
        // height: hp(23),
        // maxWidth: hp(200),
        paddingVertical: vp(4),
        paddingHorizontal: hp(12),
        borderRadius: hp(20),
        backgroundColor: colors.Lgreen,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewcancel: {
        paddingVertical: vp(4),
        paddingHorizontal: hp(12),
        borderRadius: hp(20),
        backgroundColor: colors.RedL,
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
        paddingTop: vp(2),
        textTransform: 'capitalize'
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
        paddingTop: vp(2)
    },
    viewrow: {
        alignItems: 'flex-end',
        paddingTop: vp(2),
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
        paddingTop: vp(2),
        textTransform: 'capitalize'
    },
    viewmain: {
        alignItems: 'center',
        marginTop: vp(8),
        justifyContent: 'space-between',
    },
    accept: {
        fontSize: fp(13),
        color: colors.parrotgreen,
        fontFamily: Font.regular,
    },
    viewaccept: {
        paddingVertical: vp(4),
        paddingHorizontal: hp(12),
        borderRadius: hp(20),
        backgroundColor: colors.offLgreen,
        justifyContent: 'center',
        alignItems: 'center',
    },
    delivery: {
        fontSize: fp(13),
        color: colors.lightgrey,
        fontFamily: Font.regular,
        textTransform: 'capitalize'
    },
    viewdelivery: {
        paddingVertical: vp(4),
        paddingHorizontal: hp(12),
        borderRadius: hp(20),
        backgroundColor: colors.greyy,
        justifyContent: 'center',
        alignItems: 'center',
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
    // marginL: {
    //     marginRight: vp(-4),
    //     // backgroundColor: 'red'
    // },
});

export default EditOrderSumList;