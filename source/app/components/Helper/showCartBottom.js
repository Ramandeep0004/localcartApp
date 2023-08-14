import { useIsFocused } from '@react-navigation/native';
import { Text } from '@rneui/themed';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Dimensions, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import shopsController from '../../../apis/Controller/shops.controller';
import { colors } from '../../assets/global_style/colors';
import { Font } from '../../assets/global_style/fontfamily';
import { fp, hp, vp } from '../../assets/global_style/fontsize';
import { numberFormat } from './general';
import { totalPrice } from './orderHelpers';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const BottomAddedCart = props => {
    // const { shopDetail} = props;
    const [totalValue, setTotalvalue] = useState(0);
    const [shopDetail, setShopDetail] = useState(null);
    const isFocus = useIsFocused();
    const value = props && props.products;

    useEffect(() => {
        handleTotal();
        // getData();
    }, [isFocus, props && props.products]);

    useEffect(() => {
        getData();
    }, [isFocus, value[0].shop_id]);

    const handleTotal = () => {
        let total = totalPrice(value);
        setTotalvalue(total);
    };

    const getData = async () => {
        let post = {
            id: value && value.length > 0 ? value[0].shop_id : value[0].shop_id,
            category: []
        };
        let response = await new shopsController.shopDetail(post)
        if (response && response.status) {
            setShopDetail(response && response.shop);
        }else{
            setShopDetail(null);
        }
    };

    return (
        <View >
            {value && value.length > 0 ?
                <View style={[styles.mainview, { bottom: props.withoutBottom ? hp(10) : hp(80), }]}>
                    <View style={styles.viewmain22}>
                        <View style={styles.viewone}>
                            <Text style={styles.item}>{value.length} {value.length === 1 ? t('cart.Item') : t('cart.Items')}</Text>
                        </View>

                        <View style={styles.viewthree}>
                            {
                                shopDetail && parseInt(shopDetail.is_price) === 1 ?
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <Text style={styles.num}>₹{totalValue ? numberFormat(totalValue) : 0}</Text>
                                    </View>
                                    :
                                    null
                            }
                            <View style={styles.button}>
                                <TouchableOpacity onPress={() => props.action()} >
                                    <View style={styles.viewcart}>
                                        <Text style={styles.cart}>{t("cart.View cart")}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View> : null}
        </View>
    );
};

const styles = StyleSheet.create({

    met: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        marginBottom: hp(0),
        zIndex: 999999
    },
    met2: {
        left: 0,
        right: 0,
        bottom: 0,
        marginBottom: hp(0),
        zIndex: 999999
    },
    viewbrowse: {
        flexDirection: 'row',
        // backgroundColor: colors.Secondary,
        // borderRadius: hp(25),
        justifyContent: 'center',
        alignSelf: 'center',
        width: hp(182),
        marginBottom: hp(20)
        // paddingVertical: vp(14),
        // paddingHorizontal: vp(14),
    },
    mainview: {
        position: 'absolute',
        left: 0,
        right: 0,

        zIndex: 999999,
    },
    viewmain22: {
        backgroundColor: colors.primary,
        marginVertical: vp(10),
        marginHorizontal: vp(20),
        borderRadius: hp(8),
        flexDirection: 'row',
        flex: 1,
        paddingHorizontal: vp(18),
        paddingVertical: vp(15),
        // marginBottom: hp(30)
    },
    viewone: {
        flex: .5,
        justifyContent: 'center',
        paddingRight: hp(5)
    },
    item: {
        fontSize: fp(16),
        color: colors.white,
        fontFamily: Font.regular,
    },
    viewtwo: {
        //flex: .2,
        // backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: hp(5)
    },
    num: {
        fontSize: fp(18),
        color: colors.Secondary,
        fontFamily: Font.semiBold,
        marginRight: hp(5)
    },
    viewthree: {
        flex: .5,
        alignItems: 'center',
        flexDirection: 'row',

    },
    button: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    viewcart: {
        borderWidth: 1,
        borderColor: colors.white,
        borderRadius: hp(25),
        paddingVertical: vp(4),
        paddingHorizontal: vp(10),
        alignSelf: 'flex-end',
        //  justifyContent: 'center',
        // alignItems: 'center',
    },
    cart: {
        fontSize: fp(14),
        color: colors.white,
        fontFamily: Font.regular
    }
});
const mapStateToProps = state => ({
    products: state.AddToCartReducer.products,
});
export default connect(mapStateToProps)(BottomAddedCart);