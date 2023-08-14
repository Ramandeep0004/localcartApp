import { Image, Text } from '@rneui/themed';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import { base } from '../assets/global_style/base';
import { colors } from '../assets/global_style/colors';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, vp } from '../assets/global_style/fontsize';
import { Images } from '../assets/global_style/images';
import { renderImage } from '../components/Helper/general';

const BreadSwitchList = (props) => {
    let productDetail = props.productDetail

    return (
        <View>
            <View style={styles.subCon}>
                <View style={styles.mainimage}>
                    <Image
                        style={styles.image}
                        source={productDetail && productDetail.image ? renderImage(productDetail.image[0], 'medium') : Images.noImage}
                        resizeMode='cover'
                    />
                </View>
                <View style={styles.Con}>
                    <View style={styles.viewRow}>
                        {
                            productDetail && productDetail.title ?
                                <View style={styles.Viewone}>
                                    <Text style={styles.bonn}>{productDetail.title}</Text>
                                </View>
                                :
                                null
                        }
                        <View style={styles.Viewtwo}>
                            <ToggleSwitch
                                isOn={productDetail && parseInt(productDetail.status) === 1 ? true : false}
                                onColor={colors.primary}
                                offColor={colors.darkgrey}
                                size='medium'
                                onToggle={isOn => props.disableProduct(productDetail)}
                                animationSpeed={300}
                            />
                        </View>

                    </View>
                    <Text style={styles.gram}>{productDetail && productDetail.units ? productDetail.units : ''}</Text>
                    {
                        productDetail && productDetail.price ?
                            <View style={base.col12}>
                                <View style={base.row}>
                                    <Text style={styles.num}>{`₹ ${parseInt(productDetail.price)}`}</Text>
                                </View>
                            </View>
                            :
                            null
                    }
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    subCon: {
        flexDirection: 'row',
        paddingBottom: vp(12),
        marginBottom: vp(12),
        borderBottomWidth: 1,
        borderBottomColor: colors.offgrey,
    },
    image: {
        height: '100%',
        width: '100%',
    },
    mainimage: {
        height: hp(80),
        width: hp(80),
        overflow: 'hidden',
    },
    Con: {
        flex: 1,
        paddingLeft: vp(15),
        justifyContent: 'center',
    },
    viewRow: {
        flexDirection: 'row',
    },
    Viewone: {
        flex: .9,
    },
    Viewtwo: {
        flex: .2,
        // backgroundColor: 'red',
        alignItems: 'flex-end',
    },
    bonn: {
        fontSize: fp(16),
        color: colors.black,
        fontFamily: Font.regular,
        textTransform: 'capitalize'
    },
    gram: {
        fontSize: fp(14),
        color: colors.black,
        fontFamily: Font.regular,
        paddingTop: vp(5)
    },
    num: {
        fontSize: fp(18),
        color: colors.black,
        fontFamily: Font.semiBold,
        paddingTop: vp(5)
    },
    flat: {
        marginTop: vp(20),
        paddingBottom: vp(20)
    },
    cross: {
        fontSize: fp(12),
        color: colors.lightgrey,
        fontFamily: Font.regular,
        textDecorationLine: 'line-through',
        marginTop: vp(8),
        paddingLeft: vp(4),
    },
});

export default BreadSwitchList;