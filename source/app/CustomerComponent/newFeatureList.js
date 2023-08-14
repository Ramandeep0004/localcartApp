import { Icon, Image, Text } from '@rneui/themed';
import { t } from 'i18next';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { base } from '../assets/global_style/base';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, hzp, vp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';
import { Images } from '../assets/global_style/images';
import { numberFormat, renderImage } from '../components/Helper/general';
import ItemModal from '../CustomerComponent/ItemModal';

const NewFeatureItem = props => {
    const { item, addcart, removecart, shopDetail } = props;
    const [count, setCount] = useState(1);
    const [productDetailPopup, setProductDetailPopup] = useState(false);


    return (
        <>

            {item ?
                <View style={styles.container}>
                    <View>
                        <TouchableOpacity onPress={() => setProductDetailPopup(true)}>
                            <View style={item && parseInt(item.status) === 0 ? styles.viewgrey : styles.mainimage}>
                                <Image style={styles.image} source={item && item.image ? renderImage(item.image[0], "medium") : Images.noImage} />
                            </View>
                        </TouchableOpacity>
                        {item && parseInt(item.status) === 0 ? 
                        <View style={styles.viewstock}>
                            <Text style={styles.stock}>{t("shopDetail.Out of Stock")}</Text>
                        </View> : null}
                        {
                                    item && item.product_type ? 
                                        <View style={styles.vieworganic}>
                                            <Text style={styles.organic}>{item.product_type === 'both' || item.product_type === 'Both' ? 'Organic, non organic' : item.product_type}</Text>
                                        </View>
                            :
                            null
                    }
                    </View>
                    <View style={{paddingHorizontal: hp(10), paddingVertical: hp(10),  flexGrow: 1,}}>
                        <View style={styles.mainTittle}>
                            <View style={[{flex: 1,}]} >
                                {
                                    item && item.title ?
                                        <Text numberOfLines={1} style={styles.bonn}>{item && item.title}</Text>
                                        :
                                        null
                                }
                            </View>
                          
                        </View>
                        {item && item.units ? <Text style={styles.gram}>{item.units}</Text> : null}
                        <View >
                            {parseInt(item && item.status) === 1 ? 
                            <View style={styles.submain}>
                                {shopDetail && parseInt(shopDetail.is_price) === 1 && item.price ?  
                                <View style={styles.subone}>
                                    <Text style={styles.num}>{item && item.price ? `₹ ${numberFormat(item.price)}` : ''}
                                    </Text> 
                                    {/* <Text style={styles.Num}>₹25</Text> */}
                                </View>
                                : null}
                                <View style={styles.subtwo}>
                                    {item && item.quantity === 0 ?
                                        <TouchableOpacity style={styles.buttonContainer} onPress={() => addcart(item)}>
                                            <Text style={styles.AddTxt}>{t("shopDetail.ADD")}</Text>
                                        </TouchableOpacity>
                                        :
                                        <View style={styles.viewicons}>
                                            <TouchableOpacity onPress={() => removecart(item)} >
                                                <Icon
                                                    name={Icons.minus}
                                                    type={IconsType.entypo}
                                                    size={Dimension.verysmall}
                                                    color={colors.white}
                                                    onPress={() => removecart(item)}
                                                />
                                            </TouchableOpacity>
                                            <Text style={styles.number}>{item && item.quantity}</Text>
                                            <TouchableOpacity
                                                onPress={() => addcart(item)}
                                            >
                                                <Icon
                                                    name={Icons.plus}
                                                    type={IconsType.entypo}
                                                    size={Dimension.verysmall}
                                                    color={colors.white}
                                                    onPress={() => addcart(item)}
                                                />
                                            </TouchableOpacity>
                                        </View>}
                                </View>
                            </View> : null}
                        </View>
                    </View>
                </View> : null}
            {productDetailPopup ?
                <ItemModal
                    id={item}
                    shopDetail={shopDetail}
                    orderDetails={shopDetail && parseInt(shopDetail.is_price) === 1 ? { total_amount: 133 } : null} //for manually handle the price on off toggle
                    open={productDetailPopup}
                    close={() => {
                        setProductDetailPopup(false)
                        props.setArray()
                    }}
                    navigation={props.navigation}
                />
                : null}

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: (Dimensions.get('window').width - hp(45)) / 2 ,
        marginRight: hp(15),
        marginTop: vp(9),
         backgroundColor:colors.white,
        borderRadius: hp(10),
        overflow:'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        
        elevation: 3,
        //justifyContent:'flex-end',
    },
    image: {
        height: '100%',
        width: '100%',
    },
    mainimage: {
        height: hp(178),
        width: '100%',
        maxHeight: hp(178),
        // overflow: 'hidden',
        // borderRadius: wp(5),
    },
    mainTittle: {
        flexDirection: 'row',
        marginBottom: hp(15)
     //   marginTop: hp(10),
    },
    flat: {
        marginTop: vp(20),
        paddingBottom: hp(70),
    },
    bonn: {
        fontSize: fp(18),
        fontFamily: Font.medium,
        color: colors.black,
        // paddingTop: vp(7),
        justifyContent: 'flex-start',
        textTransform: 'capitalize',
    },
    gram: {
        fontSize: fp(16),
        fontFamily: Font.light,
        color: colors.black,
       
    },
    submain: {
        flexDirection: 'row',
        paddingTop: vp(10),
    },
    subone: {
        flex: .5,
        flexDirection: 'row',
        // backgroundColor: 'green',
    },
    subtwo: {
        flex: .5,
        // backgroundColor: 'red',
        alignItems: 'flex-end',
    },
    num: {
        fontSize: fp(20),
        fontFamily: Font.bold,
        color: colors.black,
    },
    Num: {
        fontSize: fp(12),
        fontFamily: Font.regular,
        color: colors.lightgrey,
        textDecorationLine: 'line-through',
        paddingLeft: vp(3),
        paddingTop: vp(2)
    },
    viewicons: {
        backgroundColor: colors.primary,
        borderRadius: hp(4),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: hp(32),
        width: hp(90)
    },
    number: {
        fontSize: fp(14),
        fontFamily: Font.semiBold,
        color: colors.white,
    },
    stock: {
        fontSize: fp(10),
        fontFamily: Font.semiBold,
        color: colors.black,
    },
    viewstock: {
        backgroundColor: colors.greyy,
        borderColor: colors.gray,
        borderWidth: 1,
        borderRadius: hp(30),
        paddingVertical: vp(10),
        paddingHorizontal: vp(20),
        width: hp(105),
        justifyContent: 'center',
        alignSelf:'center',
        alignItems: 'center',
        position: 'absolute',
         top: '50%',
        // left: 0,
        // right:0,
        zIndex: 9999
    },
    viewgrey: {
        backgroundColor: colors.white,
        opacity: 0.4,
        height: hp(178),
        width: '100%',
        // alignItems:'center',
        // justifyContent:'center'
    },
    buttonContainer: {
        height: hp(32),
        width: hp(90),
        paddingHorizontal: hzp(5),
        paddingVertical: vp(1),
        borderRadius: hp(5),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
    },
    AddTxt: {
        fontSize: fp(16),
        fontFamily: Font.medium,
        color: colors.white,
    },
    vieworganic: {
        position:'absolute',
        right :0,
        bottom:0,
        borderTopLeftRadius: hp(5),
        backgroundColor: colors.Secondary,
        padding: hp(3),
        paddingLeft: hp(8),
       // height: vp(23),
       // borderRadius: hp(5),
        justifyContent: 'center',
        alignItems: 'center',
    },
    organic: {
        fontSize: fp(12),
        color: colors.white,
        fontFamily: Font.medium,
        textTransform: "capitalize",
    },
});

export default NewFeatureItem;
