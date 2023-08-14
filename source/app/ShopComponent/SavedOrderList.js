import { Button, CheckBox, Icon, Image, Input, Text } from '@rneui/themed';
import { t } from 'i18next';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Linking } from 'react-native';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import { base } from '../assets/global_style/base';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, vp, hzp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';
import { Images } from '../assets/global_style/images';
import { addCalenderEvent } from '../components/Helper/addCalenderEventHandler';
import { dateFormatFull } from '../components/Helper/date.formats';
import { renderImage } from '../components/Helper/general';
import { finaltotalPriceType } from '../components/Helper/orderHelpers';
import DeleteModal from './DeleteModal';

const SavedOrderList = (props) => {
    const { item } = props;
    const [dlt, setDlt] = useState(false);
    
    
    const [finalTotal, setFinalTotal] = useState(null);

    useEffect(() => {
        if ( item && item.extra_charges) {
            handleFinalTotalOnExtraCharges();
        }
    }, [item]);

    
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

            {item ? <DropShadow style={styles.Shadow}>
                <View style={styles.SubCon}>
                    <View style={styles.viewwhite}>
                        <View style={[base.row, styles.viewsub]}>
                            <View style={styles.viewone}>
                                <Text style={styles.textqr2}>{t("ordersListComponent.Order ID")} : <Text style={styles.textqr}>{item.order_id}</Text></Text>
                            </View>
                            <View style={styles.viewtwo}>
                                <TouchableOpacity onPress={() => addCalenderEvent(item)}>
                                    <View style={styles.viewicon}>
                                        <Icon
                                            type={IconsType.octIcon}
                                            name={Icons.stopwatch}
                                            color={colors.black}
                                            size={Dimension.verysmall}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => props.handleDelete(item.id)}>
                                    <View style={styles.viewIcon}>
                                        <Icon
                                            type={IconsType.antDesign}
                                            name={Icons.close}
                                            color={colors.black}
                                            size={Dimension.verysmall}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[base.subrow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                            {item.order_title && <Text style={styles.amount}>
                                {t("ordersListComponent.Title")} : <Text style={styles.rupee}> {item.order_title ? item.order_title : ''}</Text>
                            </Text>}
                            {item.items_count ? <Text style={styles.item}>{t("ordersListComponent.Quantity")} : {item.items_count}{' '}{parseInt(item.items_count) === 1 ? t('ordersListComponent.item') : t('ordersListComponent.items')}</Text> : null}
                        </View>
                        <View style={[base.row]}>
                            <View style={[base.col6]}>
                                {
                                    item && item.total_amount ?
                                        <Text style={styles.amount}>
                                            {t("ordersListComponent.Total Amount")} : <Text style={styles.rupee}> ₹{ finalTotal ? finalTotal : item.total_amount}</Text>
                                        </Text>
                                        :
                                        null
                                }
                            </View>
                            <View style={[base.col6]}>
                                {item.pickup_time && item.pickup_date && item.delivery_type ? (
                                    <View style={[styles.viewrow, { flex: 0.5 }]}>
                                        <Text style={styles.pick2}>{item && parseInt(item.delivery_type) === 1 ? t('ordersListComponent.Home Delivery') : t('ordersListComponent.Pickup')}</Text>
                                        {/* <Text style={styles.pick}>{dateFormatFull(item.pickup_date)}, {item.pickup_time ? item.pickup_time : null}</Text> */}
                                    </View>
                                ) : null}
                            </View>
                        </View>
                        <View style={[base.subrow, { justifyContent: 'space-between', alignItems: 'center' }]}>
                            {item.pickup_time && item.pickup_date && item.delivery_type ? (
                                <View style={[styles.viewrow, { flex: 1 }]}>
                                    <Text style={styles.pick}>{dateFormatFull(item.pickup_date)}, {item.pickup_time ? item.pickup_time : null}</Text>
                                </View>
                            ) : null}
                        </View>
                    </View>
                    <View style={styles.viewgrey}>
                        <View style={base.col12}>
                            <View style={base.row}>
                                <View style={styles.MainImage}>
                                    <TouchableOpacity onPress={() => {
                                        props.navigation.navigate('shopstore', { item: { id: item && item.shop_id } })
                                    }}>
                                        <Image style={styles.image}
                                            source={item.shop_image ? renderImage(item.shop_image, 'medium') : Images.dummyShop}
                                            resizeMode='cover'
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.MainView}>
                                    <View style={styles.Vone}>
                                        {item.shop_name ? <Text style={styles.bablu}>{item.shop_name}</Text> : null}
                                        {item.shopkeeper_detail && item.shopkeeper_detail.first_name && item.shopkeeper_detail.last_name ? <Text style={styles.arnav}>{item.shopkeeper_detail && item.shopkeeper_detail.first_name}{' '}{item.shopkeeper_detail && item.shopkeeper_detail.last_name} ({item.shopkeeper_type}) </Text> : null}
                                    </View>
                                    {/* <View style={styles.Vtwo}>
                                        <View style={styles.Viewicon}>
                                            <Icon type={IconsType.feather} name={Icons.phone} size={Dimension.smallicon} color={colors.white} onPress={() => { item.shopkeeper_detail && item.shopkeeper_detail.phonenumber ? Linking.openURL(`tel:${item.shopkeeper_detail && item.shopkeeper_detail.phonenumber}`) : new Toaster().error('No shop number available'); }} />
                                         </View>
                                    </View> */}
                                </View>
                            </View>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.viewRow}>
                            <View style={styles.vone}>
                                {item && item.created ? <Text style={styles.placed}>
                                    {t("ordersListComponent.Saved on")} {dateFormatFull(item.created)}
                                </Text> : null}
                            </View>
                            <View style={styles.vtwo}>
                                <Button
                                    title={t('ordersListComponent.View details')}
                                    buttonStyle={styles.buttonstyle}
                                    onPress={() => props.action(item)}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </DropShadow> : null}
            {
                dlt ?
                    <DeleteModal
                        open={dlt}
                        close={() => setDlt(false)}
                    />
                    :
                    null
            }
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
    pick2: {
        fontSize: fp(12),
        color: colors.lightgrey,
        fontFamily: Font.semiBold,
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
        paddingTop: vp(15),
        paddingBottom: vp(15),
        overflow: 'hidden',
    },
    textqr: {
        fontSize: fp(16),
        color: colors.Secondary,
        fontFamily: Font.semiBold,
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
        height: hp(40),
        paddingVertical: vp(2),
        paddingHorizontal: vp(0),
    },
    viewicon: {
        height: hp(34),
        width: hp(34),
        borderRadius: hp(17),
        backgroundColor: colors.btngrey,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewIcon: {
        height: hp(34),
        width: hp(34),
        borderRadius: hp(17),
        backgroundColor: colors.btngrey,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: vp(8)
    },
    viewone: {
        // flex: .79,
        // backgroundColor: 'green',
        paddingLeft: hp(2),
        justifyContent: 'center',
    },
    viewtwo: {
        // flex: .21,
        flexDirection: 'row',
        // backgroundColor: 'red',
        justifyContent: 'space-between',
    },
    viewsub: {
        //  backgroundColor: 'red', 
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textqr2: {
        fontSize: fp(16),
        color: colors.black,
        fontFamily: Font.semiBold,
        marginLeft: hp(-5)
    },
});

export default SavedOrderList;