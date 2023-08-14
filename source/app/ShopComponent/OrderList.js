import { CheckBox, Icon, Image, Text } from '@rneui/themed';
import { t } from 'i18next';
import React, { useState } from 'react';
import { Linking, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import shopkeeperOrdersController from '../../apis/Controller/shopkeeper/shopkeeper.orders.controller';
import { base } from '../assets/global_style/base';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, hzp, vp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';
import { Images } from '../assets/global_style/images';
import { dateFormatFull } from '../components/Helper/date.formats';
import { numberFormat, renderImage } from '../components/Helper/general';
import Loader from '../components/Helper/loader';
import ConfirmOrder from './confirmOrderModal';

const OrderList = (props) => {
    const { item } = props;
    const [confirm, setConfirm] = useState(false);
    const [loader, setLoader] = useState(false);


    const handleCallAcivity = (nmbr) => {
        let number = nmbr ? nmbr : ''
        let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${number}`;
        }
        else {
            phoneNumber = `telprompt:${number}`;
        }
        Linking.openURL(phoneNumber);
    };

    const handleCheckbox = async (item) => {
        props.handleCheckbox(item)
    };

    const refusedOrder = async () => {
        let post = {
            order_id: item && item.id ? [item.id] : []
        }
        setLoader(true);
        let response = await shopkeeperOrdersController.shopkeeperOrdersRefused(post);
        if (response && response.status) {
            setLoader(false);
            setConfirm(false);
            props.getOrdersList();
        }
        else {
            setLoader(false);
            setConfirm(false);
        }
    };




    return (
        <View>
            {
                item ?
                    <DropShadow style={styles.Shadow}>
                        <View style={styles.subcontainer}>
                            <TouchableOpacity onPress={() => props.action()}>
                                {/* {
                                    props && props.index === 2 ?
                                        <TouchableOpacity onPress={() => setConfirm(true)}>
                                            <View style={styles.dots}>
                                                <Icon type={IconsType.entypo}
                                                    name={Icons.dotsThreeHorizontal}
                                                    size={Dimension.semilarge}
                                                    color={colors.lightgrey}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                        :
                                        null

                                } */}
                                <View style={base.row}>
                                    {
                                        props && props.index === 1 || props && props.index === 2 ?
                                            <View style={base.col1}>
                                                <CheckBox
                                                    containerStyle={styles.checkcon}
                                                    checked={item.checked}
                                                    onPress={() => handleCheckbox(item)}
                                                    checkedColor={colors.primary}
                                                />
                                            </View>
                                            :
                                            null
                                    }

                                    <View style={base.col11}>
                                        <View style={base.row}>
                                            {
                                                item.order_id ?
                                                    <View style={base.col9}>
                                                        <Text style={styles.textqr2}>{t("orderSummary.Order ID")} : <Text style={styles.textqr}>{item.order_id}</Text></Text>
                                                    </View>
                                                    :
                                                    null
                                            }

                                            <View style={[base.col3]}>
                                                <View style={props && props.index == 2 || props && props.index == 4 || props && props.index == 5 || props && props.index == 3 || props && props.index == 6 ? styles.mainpend2 : styles.mainpend}>
                                                    {/* New->  Pending */}
                                                    {parseInt(item.order_status) === 0 ?
                                                        <View style={styles.viewpending}>
                                                            <Text style={styles.Pending}>{t("status.Pending")}</Text>
                                                        </View>
                                                        : parseInt(item.order_status) === 1 ?
                                                            <View style={styles.viewref3}>
                                                                <Text style={styles.accept}>{t("status.Accepted")}</Text>
                                                            </View>
                                                            : parseInt(item.order_status) === 8 ?
                                                                <View style={[base.row]}>
                                                                    <View style={styles.viewaccept}>
                                                                        <Text style={styles.accept}>{t("status.Packing")}</Text>
                                                                    </View>
                                                                    {
                                                                        props && props.index === 3 ?
                                                                            <TouchableOpacity onPress={() => setConfirm(true)}>
                                                                                <View style={styles.dots}>
                                                                                    <Icon type={IconsType.entypo}
                                                                                        name={Icons.dotsthreevertical}
                                                                                        size={Dimension.semilarge}
                                                                                        color={colors.lightgrey}
                                                                                    />
                                                                                </View>
                                                                            </TouchableOpacity>
                                                                            :
                                                                            null
                                                                    }
                                                                </View>
                                                                : parseInt(item.order_status) === 2 ?
                                                                    <View style={[base.row]}>
                                                                        <View style={styles.packed}>
                                                                            <Text style={styles.accept}>{t("status.Packed")}</Text>
                                                                        </View>
                                                                        {
                                                                            props && props.index === 4 ?
                                                                                <TouchableOpacity onPress={() => setConfirm(true)}>
                                                                                    <View style={styles.dots}>
                                                                                        <Icon type={IconsType.entypo}
                                                                                            name={Icons.dotsthreevertical}
                                                                                            size={Dimension.semilarge}
                                                                                            color={colors.lightgrey}
                                                                                        />
                                                                                    </View>
                                                                                </TouchableOpacity>
                                                                                :
                                                                                null
                                                                        }
                                                                    </View>
                                                                    : parseInt(item.order_status) === 3 ?
                                                                        <View style={styles.viewCom}>
                                                                            <Text style={styles.Complt}>{t("status.Completed")}</Text>
                                                                        </View>
                                                                        : parseInt(item.order_status) === 4 ?
                                                                            <View style={styles.refused}>
                                                                                <Text style={styles.refuse}>{t("status.Refused by Customer")}</Text>
                                                                            </View>
                                                                            : parseInt(item.order_status) === 5 ?
                                                                                <View style={styles.refused}>
                                                                                    <Text style={styles.refuse}>{t("status.Refused by Shopkeeper")}</Text>
                                                                                </View>
                                                                                : parseInt(item.order_status) === 6 ?
                                                                                    <View style={styles.viewref}>
                                                                                        <Text style={styles.refuse}>{t("status.Refused")}</Text>
                                                                                    </View>
                                                                                    : null}
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                {
                                    item.items_count ?
                                        <Text style={styles.item}>{t("orderSummary.Quantity")} : {item.items_count > 1 ? `${item.items_count} ${t("orderSummary.items")}` : `${item.items_count} ${t("orderSummary.item")}`}</Text>
                                        :
                                        null
                                }
                                <View style={[base.subrow, styles.viewsub]}>

                                    <View style={{ flex: 0.5 }}>
                                        <Text style={styles.amount}>{item && item.total_amount ? `${t("orderSummary.Total Amount")} :` : ''} <Text style={styles.rupee}>{item && item.total_amount ? `₹ ${numberFormat(item.total_amount)}` : ''}</Text></Text>
                                    </View>

                                    {
                                        item.pickup_date ?
                                            // <View style={base.col6}>
                                            <View style={[styles.viewrow, { flex: 0.5 }]}>
                                                <Text style={styles.pick2}>{item && parseInt(item.delivery_type) === 1 ? t('orderSummary.Home Delivery') : t('orderSummary.Pickup')}</Text>
                                                {/* <Text style={styles.pick}>{dateFormatFull(item.pickup_date)}, {item.pickup_time ? item.pickup_time : null}</Text> */}
                                            </View>
                                            // </View>
                                            :
                                            null
                                    }

                                </View>
                                <View style={[base.subrow]}>
                                    {
                                        item.pickup_date ?
                                            // <View style={base.col6}>
                                            <View style={[styles.viewrow, { flex: 1 }]}>
                                                <Text style={styles.pick}>{dateFormatFull(item.pickup_date)}, {item.pickup_time ? item.pickup_time : null}</Text>
                                            </View>
                                            // </View>
                                            :
                                            null
                                    }

                                </View>
                            </TouchableOpacity>
                            {/* New->Line */}
                            <View style={styles.SubMain}>
                            </View>
                            {/* Packing-> Error Mgs */}
                            {/* <View style={styles.subCon}>
                                    <View style={styles.mainimage}>
                                        <Image style={styles.image} source={Images.error} resizeMode='contain' />
                                    </View>
                                    <Text style={styles.custom}>The customer has remove / update some items from list</Text>
                                </View> */}
                            <View style={styles.viewgrey}>
                                <View style={base.row}>
                                    <View style={styles.MainImage}>
                                        <Image style={styles.image}
                                            source={item && item.user_image ? renderImage(item.user_image, 'medium') : Images.user}
                                            resizeMode='cover'
                                        />
                                    </View>
                                    <View style={styles.MainView}>
                                        <View style={styles.Vone}>
                                            {
                                                item.user_first_name ?
                                                    <Text style={styles.bablu}>{`${item.user_first_name} ${item.user_last_name ? item.user_last_name : null}`}</Text>
                                                    :
                                                    null
                                            }
                                            {
                                                item.address ?
                                                    <View style={styles.viewloc}>
                                                        <View style={base.row}>
                                                            <View style={styles.viewicon}>
                                                                <Icon type={IconsType.ionIcon}
                                                                    name={Icons.locationsharp}
                                                                    size={Dimension.Vsmall}
                                                                    color={colors.lightgrey}
                                                                />
                                                            </View>
                                                            <View style={styles.viewtext}>
                                                                <Text style={styles.lore}>{item.address}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    :
                                                    null
                                            }

                                        </View>
                                        <View style={styles.Vtwo}>
                                            <TouchableOpacity onPress={() => handleCallAcivity(item.user_phonenumber)}>
                                                <View style={styles.Viewicon}>
                                                    <Icon type={IconsType.feather}
                                                        name={Icons.phone}
                                                        size={Dimension.smallicon}
                                                        color={colors.white}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </DropShadow>
                    :
                    null
            }
            {
                confirm ?
                    <ConfirmOrder
                        open={confirm}
                        close={() => setConfirm(false)}
                        onRefused={() => refusedOrder()}
                        navigation={props.navigation}
                        itemID={item ? item.id : null}
                        loader={loader}
                        item={item}
                        setLoader={(e) => setLoader(e)}
                    />
                    :
                    null
            }
            <Loader loader={loader}></Loader>
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
        overflow: 'hidden'
    },
    dots: {
        // flexDirection: 'row',
        // justifyContent: 'flex-end',
        // marginBottom: hp(15),
        // backgroundColor: 'red',
        marginRight: vp(-6),
        // paddingLeft: vp(5),
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
    textqr2: {
        fontSize: fp(16),
        color: colors.black,
        fontFamily: Font.semiBold,
        marginLeft: hp(-5)
    },
    Pending: {
        fontSize: fp(13),
        color: colors.black,
        fontFamily: Font.regular,
    },
    viewpending: {
        // height: hp(23),
        // width: hp(70),
        paddingVertical: vp(4),
        paddingHorizontal: vp(12),
        borderRadius: hp(20),
        backgroundColor: colors.Lgreen,
        justifyContent: 'center',
        alignItems: 'center',
    },
    packed: {
        paddingVertical: vp(4),
        paddingHorizontal: vp(12),
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
    viewaccept: {
        height: hp(23),
        width: hp(70),
        borderRadius: hp(20),
        backgroundColor: colors.offLgreen,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainpend: {
        alignItems: 'flex-end',
        marginRight: vp(-5)
    },
    mainpend2: {
        alignItems: 'flex-end',
        marginRight: vp(-35)
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
        fontSize: fp(12),
        color: colors.lightgrey,
        fontFamily: Font.regular,
    },
    pick2: {
        fontSize: fp(12),
        color: colors.lightgrey,
        fontFamily: Font.semiBold,
    },
    viewrow: {
        alignItems: 'flex-end',
        paddingTop: vp(4),
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
    // threeDots : {
    //     flexDirection : 'row'
    // },
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
    lore: {
        fontSize: fp(14),
        fontFamily: Font.regular,
        color: colors.lightgrey,
        paddingLeft: vp(5)
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
        paddingVertical: vp(4),
        paddingHorizontal: vp(12),
        borderRadius: hp(20),
        backgroundColor: colors.btngrey,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Complt: {
        fontSize: fp(13),
        color: colors.lightgrey,
        fontFamily: Font.regular,
    },
    viewref: {
        paddingVertical: vp(4),
        paddingHorizontal: vp(12),
        borderRadius: hp(20),
        backgroundColor: colors.lightred,
        justifyContent: 'center',
        alignItems: 'center',
    },
    refused: {
        paddingVertical: vp(4),
        paddingHorizontal: vp(7),
        width: hp(150),
        borderRadius: hp(20),
        backgroundColor: colors.lightred,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewref3: {
        paddingVertical: vp(4),
        paddingHorizontal: vp(2),
        width: hp(85),
        borderRadius: hp(20),
        marginHorizontal: hp(30),
        backgroundColor: colors.offLgreen,
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
        marginHorizontal: vp(-24),
        paddingHorizontal: vp(24),
        paddingTop: vp(15),
        marginTop: vp(-15),
        marginBottom: vp(-22),
        paddingBottom: vp(20),
        overflow: 'hidden'
    },
    viewsub: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
    },
    viewicon: {
        // backgroundColor: 'red',
        width: hp(14),
        alignItems: 'flex-start',
    },
    viewtext: {
        flex: 1,
    },
});

export default OrderList;