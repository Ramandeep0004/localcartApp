import { useIsFocused } from '@react-navigation/native';
import { Icon, Image, Text } from '@rneui/themed';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import {
    FlatList, ScrollView, StyleSheet, TouchableOpacity, View
} from 'react-native';
import Modal from 'react-native-modal';
import ReadMore from 'react-native-read-more-text';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { connect } from 'react-redux';
import filtersController from '../../apis/Controller/actionController';
import shopsController from '../../apis/Controller/shops.controller';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, hzp, vp, wp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';
import { numberFormat, renderImage } from '../components/Helper/general';
import SuccessPopup from '../components/Helper/successPopup';
import { ToastConfig } from '../components/Helper/toast';


const ItemModal = (props) => {
    const { id, shopDetail } = props;
    const [click, setClick] = useState(false);
    const [deleteCart, setDeleteCart] = useState(false);
    const [singleItem, setSingleItem] = useState();
    const [productDetail, setProductDetail] = useState();
    const isFocus = useIsFocused();
    useEffect(() => {
        if (isFocus) {
            getData();
        }
    }, [isFocus]);

    const getData = async () => {
        const value = props && props.products
        let response = await new shopsController.productDetail(id.id, id.shop_id)
        if (response && response.status) {
            let obj = response && response.page;
            let existed_item = value.find(item => parseInt(item.id) === parseInt(obj.product_id) && parseInt(item.shop_id) === parseInt(obj.shop_id))
            if (existed_item) {
                obj['quantity'] = existed_item && existed_item.quantity ? existed_item.quantity : 0;
            } else {
                obj['quantity'] = 0;
            }
            setProductDetail(obj);
        } else {
            setProductDetail(null)
        }
    };

    const renderTruncatedFooter = handlePress => {
        return (
            <TouchableOpacity style={styles.readContainer} onPress={handlePress}>
                <View style={styles.ButtonContainer}>
                    <Text style={styles.buttonTitle}>Read More</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const renderRevealedFooter = handlePress => {
        return (
            <TouchableOpacity style={styles.readContainer} onPress={handlePress}>
                <View style={styles.ButtonContainer}>
                    <Text style={styles.buttonTitle}>Read Less</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const addToCart = async (item) => {
        const value = props && props.products
        if (value.length > 0) {
            if (item.shop_id === value[0].shop_id) {
                item = {
                    id: item.product_id,
                    user_id: item.user_id,
                    shop_id: item.shop_id,
                    title: item.product ? item.product.title : null,
                    brand_id: item.product ? item.product.brand_id : null,
                    units: item.product ? item.product.units : null,
                    image: item.product ? item.product.image : null,
                    status: item.status,
                    price: item.price ? item.price : null,
                    quantity: item.quantity++,
                }
                await new filtersController.setAddToCarts(item);
            } else {
                setSingleItem(item);
                setDeleteCart(true);
            }
        } else {
            item = {
                id: item.product_id,
                user_id: item.user_id,
                shop_id: item.shop_id,
                title: item.product ? item.product.title : null,
                brand_id: item.product ? item.product.brand_id : null,
                units: item.product ? item.product.units : null,
                image: item.product ? item.product.image : null,
                status: item.status,
                price: item.price ? item.price : null,
                quantity: item.quantity++,
            }
            await new filtersController.setAddToCarts(item);
        }
    };


    const removeFromCart = async (item) => {
        item = {
            id: item.product_id,
            user_id: item.user_id,
            shop_id: item.shop_id,
            title: item.product ? item.product.title : null,
            brand_id: item.product ? item.product.brand_id : null,
            units: item.product ? item.product.units : null,
            image: item.product ? item.product.image : null,
            status: item.status,
            price: item.price ? item.price : null,
            quantity: item.quantity--
        }
        await new filtersController.setRemoveFromCarts(item);
    };


    const onConfirm = async () => {
        setDeleteCart(false);
        await new filtersController.setEmptyCarts();
        let item = { ...singleItem, quantity: singleItem.quantity++, }
        item = {
            id: item.product_id,
            user_id: item.user_id,
            shop_id: item.shop_id,
            title: item.product ? item.product.title : null,
            brand_id: item.product ? item.product.brand_id : null,
            units: item.product ? item.product.units : null,
            image: item.product ? item.product.image : null,
            status: item.status,
            price: item.price ? item.price : null,
            quantity: item.quantity--
        }
        await new filtersController.setAddToCarts(item);
    };


    let categoriesName = productDetail && productDetail.product && productDetail.product.categories ? productDetail.product.categories.map(item => item.category_name).join(",") : ''
    return (
        <>
            <Modal
                isVisible={props.open}
                style={styles.modal}
                backdropColor={colors.gray}
                backdropOpacity={0.85}>
                <View style={styles.mainicon}>
                    <TouchableOpacity onPress={() => props.close()}>
                        <View style={styles.viewicon}>
                            <Icon
                                type={IconsType.antDesign}
                                name={Icons.close}
                                size={Dimension.semilarge}
                                color={colors.white}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <Toast config={ToastConfig} />
                {productDetail ? <View style={styles.ModalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollContainer} nestedScrollEnabled>
                        <View style={styles.maincontainer}>
                                <FlatList
                                    contentContainerStyle={styles.listMain}
                                    data={productDetail && productDetail.product && productDetail.product.image}
                                    horizontal={true}
                                    keyExtractor={(item, index) => (index)}
                                    renderItem={({ item, index }) => (
                                        <TouchableOpacity onPress={() => {
                                            props.navigation.navigate('productdetail', { data: productDetail.product && productDetail.product.image, index: index }),
                                                props.close()
                                        }}>
                                            <View style={styles.containerlist}>
                                                <View style={styles.imgContainer}>
                                                    <Image
                                                        style={styles.image}
                                                        source={renderImage(item, "large")}
                                                    // resizeMode='stretch'
                                                    />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                />
                            <View style={styles.descriptionMain}>
                                {/* <TouchableOpacity onPress={() => props.action()}> */}
                                {productDetail && productDetail.product && productDetail.product.title ? 
                                <Text style={styles.productName}>
                                    {productDetail.product && productDetail.product.title}
                                    </Text>
                                 : null}
                                {/* </TouchableOpacity> */}
                                {productDetail && productDetail.product && productDetail.product.units ? 
                                <Text style={styles.gram}>
                                    {productDetail.product && productDetail.product.units}
                                    </Text> 
                                : null}
                                {/* </TouchableOpacity> */}

                                <View style={styles.priceContainer}>
                                    {
                                        productDetail && parseInt(productDetail.status) === 1 ?
                                            <View style={styles.rupessMain}>
                                                {
                                                    props && props.orderDetails && props.orderDetails.total_amount ?
                                                        <Text style={styles.rupees}>{productDetail && productDetail.price ? `₹ ${numberFormat(productDetail.price)}` : ''}</Text>
                                                        :
                                                        null
                                                }
                                                {/* <Text style={styles.price}>₹25</Text> */}
                                            </View>
                                            : null
                                    }
                                    {
                                        props && props.fromOrderSummary ?
                                            null
                                            :
                                            productDetail && parseInt(productDetail.status) === 1 ?
                                                <View style={styles.butttonMain}>
                                                    {productDetail && productDetail.quantity === 0 ?
                                                        <TouchableOpacity onPress={() => addToCart(productDetail)} >
                                                            <View style={styles.buttonContainer}>
                                                                <Text style={styles.AddTxt}>{t('itemModal.ADD')}</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                        :
                                                        <View style={styles.viewicons}>
                                                            <Icon
                                                                name={Icons.minus}
                                                                type={IconsType.entypo}
                                                                size={Dimension.verysmall}
                                                                color={colors.white}
                                                                onPress={() => removeFromCart(productDetail)}
                                                            />
                                                            <Text style={styles.number}>{productDetail && productDetail.quantity}</Text>
                                                            <TouchableOpacity
                                                                onPress={() => addToCart(productDetail)}
                                                            >
                                                                <Icon
                                                                    name={Icons.plus}
                                                                    type={IconsType.entypo}
                                                                    size={Dimension.verysmall}
                                                                    color={colors.white}
                                                                    onPress={() => addToCart(productDetail)}
                                                                />
                                                            </TouchableOpacity>
                                                        </View>}
                                                </View>
                                                :
                                                null
                                    }
                                </View>
                            </View>
                            <View style={styles.line}></View>
                            <View style={styles.productContainer}>
                                <View style={styles.descriptionContainer}>
                                    <ReadMore
                                        numberOfLines={4}
                                        renderTruncatedFooter={renderTruncatedFooter}
                                        renderRevealedFooter={renderRevealedFooter}>
                                        {
                                            productDetail && productDetail.product && productDetail.product.description ?
                                                <>
                                                    <Text style={styles.product}>{t('itemModal.Product detail')}</Text>
                                                    <Text style={styles.product}>{'\n'}</Text>
                                                    <Text style={styles.description}>
                                                        {productDetail && productDetail.product && productDetail.product.description}
                                                    </Text>
                                                </>
                                                :
                                                null

                                        }
                                        {productDetail && productDetail.product && productDetail.product.key_features ?
                                            <>
                                                <Text style={styles.product}>{'\n'}</Text>
                                                <Text style={styles.product}>{'\n'}{t("itemModal.Key Features")}</Text>
                                                <Text style={styles.product}>{'\n'}</Text>
                                                <Text style={styles.description}>
                                                    {productDetail && productDetail.product && productDetail.product.key_features}
                                                </Text>
                                            </>
                                            : null
                                        }
                                            {productDetail && productDetail.product && productDetail.product.brand ?
                                            <>
                                                <Text style={styles.product}>{'\n'}</Text>
                                                <Text style={styles.product}>{'\n'}{t("itemModal.Brand")}</Text><Text style={styles.product}>{'\n'}</Text><Text style={styles.description}>
                                                    {productDetail && productDetail.product && productDetail.product.brand.title}
                                                </Text>
                                            </>
                                            : null
                                        }
                                        {productDetail && productDetail.product && productDetail.product.product_type ?
                                            <>
                                                <Text style={styles.product}>{'\n'}</Text>
                                                <Text style={styles.product}>{'\n'}{t("itemModal.Product Type")}</Text><Text style={styles.product}>{'\n'}</Text><Text style={styles.description}>
                                                    {productDetail && productDetail.product && productDetail.product.product_type.title}
                                                </Text>
                                            </>
                                            : null
                                        }

                                        {productDetail && productDetail.product && productDetail.product.units ?
                                            <>
                                                <Text style={styles.product}>{'\n'}</Text>
                                                <Text style={styles.product}>{'\n'}{t("itemModal.Units")}</Text><Text style={styles.product}>{'\n'}</Text><Text style={styles.description}>
                                                    {productDetail && productDetail.product && productDetail.product.units}
                                                </Text>
                                            </>
                                            : null
                                        }

                                        {
                                            productDetail && productDetail.product && productDetail.product.expiry_date ?
                                                <><Text style={styles.product}>{'\n'}{'\n'}{t("itemModal.Expiry Date")}</Text>
                                                    <Text style={styles.product}>{'\n'}</Text>
                                                    <Text style={styles.description}>
                                                        {productDetail && productDetail.product && productDetail.product.expiry_date}
                                                    </Text>
                                                </>
                                                : null
                                        }

                                        {productDetail && productDetail.product && productDetail.product.categories.length > 0 ?
                                            <>
                                                <Text style={styles.product}>{'\n'}{'\n'}{t("itemModal.Category")}{'\n'} </Text>
                                                <Text style={{ flexDirection: 'row' }}>
                                                    {/* <Text style={styles.product}>{'\n'}</Text> */}
                                                    <Text style={styles.description}>{`${categoriesName}`}</Text>
                                                </Text>
                                            </>
                                            :
                                            null
                                        }

                                        {productDetail && productDetail.product && productDetail.product.custom_fields && productDetail.product && productDetail.product.custom_fields.length > 0 ? null : <Text style={styles.product}>{'\n'}</Text>}
                                        {
                                            productDetail && productDetail.product && productDetail.product.custom_fields && productDetail.product && productDetail.product.custom_fields.length > 0 ?
                                                <Text>
                                                    {'\n'}{'\n'}
                                                    <Text style={styles.otherINfo}>{t("itemModal.Other Information")} : </Text>
                                                    {
                                                        productDetail && productDetail.product && productDetail.product.custom_fields.map((item, index) => (
                                                            <Text key={index} style={styles.customFieldsMain}>
                                                               {index > 0 ? <Text style={styles.product}>{'\n'}</Text> : null}
                                                                {productDetail && productDetail.product && productDetail.product.custom_fields.length > 0 ?
                                                                    <Text style={styles.product}>{'\n'}{item.title}</Text> : null}
                                                                <Text style={styles.product}>{'\n'}</Text>
                                                                <Text style={styles.description}>
                                                                    {item.value}
                                                                </Text>
                                                            </Text>))}
                                                    <Text style={styles.product}>{'\n'}</Text>
                                                </Text>
                                                : null
                                        }
                                    </ReadMore>

                                </View>
                            </View>


                        </View>
                    </ScrollView>
                </View> : null
                }
                {
                    deleteCart ? <SuccessPopup
                        open={deleteCart}
                        close={() => setDeleteCart(false)}
                        onConfirm={() => onConfirm()}
                        RightButtonText={t("SuccessPopup.Procced")}
                        message={t('SuccessPopup.Your cart is not empty?')}
                        message1={t('SuccessPopup.For add new items to cart click on preceed.')}
                        label={t("SuccessPopup.Cart not empty?")}
                    /> : null
                }
            </Modal >
        </>
    );
};

const styles = StyleSheet.create({
    modal: {
        marginTop: hp(80),
        // alignItems: 'center',
        // justifyContent: 'flex-end',
        // backgroundColor: 'red',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        margin: 0,
    },
    ModalContainer: {
        maxHeight: hp(760),
        //flexGrow: 1,
        //backgroundColor: 'white',
        overflow: 'hidden',
    },
    readContainer: {
        marginTop: hp(20),
       // marginHorizontal: hzp(20),
        marginBottom: vp(20),
    },
    buttonTitle: {
        fontFamily: Font.medium,
        fontSize: fp(16),
        color: colors.darkblack,
    },

    ButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.buttonborder,
        borderWidth: hp(1),
        borderRadius: hp(12),
        paddingVertical: vp(12),
    },

    description: {
        fontSize: fp(16),
       lineHeight: hp(23),
        fontFamily: Font.medium,
        color: colors.lightgrey,
       // textTransform: 'capitalize',
        paddingRight: hp(10),
    },
    descriptionRow: {
        flexDirection: 'row',
    },
    description2: {
        flexDirection: 'row',
        fontSize: fp(15),
        fontFamily: Font.regular,
        color: colors.lightgrey,
    },
    productContainer: {
        marginTop: hp(15),
        marginHorizontal: hzp(20),
        paddingBottom: vp(10),
    },
    categoriesName: {
        marginTop: hp(5)
    },
    descriptionContainer: {
        marginTop: hp(6),
        flex: 1,
    },
    product: {
        fontSize: fp(20),
        fontFamily: Font.semiBold,
        color: colors.darkblack,
        textTransform: 'capitalize',
    },
    otherINfo: {
        fontSize: fp(20),
        fontFamily: Font.semiBold,
        color: colors.darkblack,
        textTransform: 'capitalize',
    },
    line: {
        marginTop: hp(20),
        width: '90%',
        marginHorizontal: hzp(20),
        borderBottomWidth: hp(1),
        borderBottomColor: colors.inputbordercol,
    },
    priceContainer: {
        marginTop: hp(5),
        flexDirection: 'row',
    },
    listMain: {
        flexGrow:1,
        paddingHorizontal: hzp(10),
    },
    rupessMain: {
        flex: 1,
        flexDirection: 'row',
    },
    price: {
        fontSize: fp(18),
        fontFamily: Font.regular,
        color: colors.lightgrey,
        textDecorationLine: 'line-through',
        marginTop: vp(5),
    },
    AddTxt: {
        fontSize: fp(16),
        fontFamily: Font.medium,
        color: colors.white,
    },
    // priMain: {
    //     position: 'absolute',
    //     left: wp(47),
    //     right: 0,
    //     top: hp(3),
    //     bottom: 0,
    //     flex: 0.1,
    // },
    containerlist: {
       // backgroundColor: colors.offgrey,
        marginHorizontal: hzp(8),
    },
    rupees: {
        fontSize: fp(28),
        fontFamily: Font.semiBold,
        color: colors.black,
        textTransform: 'capitalize',
    },
    butttonMain: {
        flex: 0.4,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    descriptionMain: {
        paddingHorizontal: hzp(20),
    },
    image: {
        height: '100%',
        width: '100%',
    },
    imgContainer: {
        width: wp(240),
        height: hp(270),
        borderRadius: hp(5),
        overflow:'hidden',
        backgroundColor: colors.offgrey
    },
    maincontainer: {
        backgroundColor: colors.white,
        paddingTop: vp(20),
        width: '100%',
    },
    gram: {
        paddingTop: hp(6),
        fontSize: fp(22),
        fontFamily: Font.medium,
        color: colors.black,
    },
    buttonContainer: {
        paddingHorizontal: hzp(32),
        paddingVertical: vp(7),
        borderRadius: hp(5),
        backgroundColor: colors.primary,
    },
    viewicon: {
        height: hp(40),
        width: hp(40),
        borderRadius: hp(20),
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    productName: {
        paddingTop: hp(15),
        fontSize: fp(26),
        fontFamily: Font.semiBold,
        color: colors.black,
        textTransform: 'capitalize',
    },
    mainicon: {
        alignItems: 'flex-end',
        width: '100%',
        paddingHorizontal: vp(10),
        marginBottom: vp(20),
    },
    viewicons: {
        backgroundColor: colors.primary,
        borderRadius: hp(4),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: hp(32),
        paddingHorizontal: hzp(10),
        paddingVertical: vp(7),
       // width: hp(85)
    },
    number: {
        fontSize: fp(14),
        fontFamily: Font.medium,
        color: colors.white,
        paddingHorizontal: hzp(12),
    },
    customFieldsMain: {
        marginTop: hp(10)
    }
});

const mapStateToProps = state => ({
    products: state.AddToCartReducer.products,
});
export default connect(mapStateToProps)(ItemModal);
