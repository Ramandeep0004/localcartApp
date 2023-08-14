import { Icon, Image, Text } from '@rneui/themed';
import React from 'react';
import {
    FlatList, ScrollView, StyleSheet, TouchableOpacity, View
} from 'react-native';
import Modal from 'react-native-modal';
import ReadMore from 'react-native-read-more-text';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, hzp, vp, wp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';
import { renderImage } from '../components/Helper/general';

const ItemDetailModal = (props) => {
    let productDetail = props.itemDetail ? props.itemDetail : ''

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

    let categoriesName = productDetail && productDetail.categories ? productDetail.categories.map((item) => item.category_name).join(",") : ''

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

                {productDetail ? <View style={styles.ModalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.maincontainer}>
                            <View>
                                <FlatList
                                    contentContainerStyle={styles.listMain}
                                    data={productDetail && productDetail.image}
                                    horizontal={true}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={(item, index) => (item, index)}
                                    renderItem={({ item }) => (
                                        // <TouchableOpacity onPress={() => {
                                        //     // props.navigation.navigate('productdetail', { data: productDetail.product && productDetail.product.image, index: index }),
                                        //     // props.close()
                                        // }}>
                                        <View style={styles.containerlist}>
                                            <View style={styles.imgContainer}>
                                                <Image
                                                    style={styles.image}
                                                    source={renderImage(item, "large")}
                                                // resizeMode='stretch'
                                                />
                                            </View>
                                        </View>
                                        // </TouchableOpacity>
                                    )}
                                />
                            </View>
                            <View style={styles.descriptionMain}>
                                {productDetail && productDetail.title ? <Text style={styles.productName}>{productDetail && productDetail.title}</Text> : null}
                                {productDetail && productDetail.units ? <Text style={styles.gram}>{productDetail && productDetail.units}</Text> : null}
                                <View style={styles.priceContainer}>
                                    <View style={styles.rupessMain}>
                                        {productDetail && productDetail.price ? <Text style={styles.rupees}>₹{`${parseInt(productDetail.price)}`}</Text> : null}
                                        {/* <Text style={styles.price}>₹25</Text> */}
                                    </View>
                                </View>
                            </View>
                            <View style={styles.line}></View>
                            <View style={styles.productContainer}>
                                {
                                    productDetail && productDetail.description ?
                                        <Text style={styles.product}>Product detail</Text>
                                        :
                                        null
                                }
                                <View style={styles.descriptionContainer}>
                                    <ReadMore
                                        numberOfLines={3}
                                        renderTruncatedFooter={renderTruncatedFooter}
                                        renderRevealedFooter={renderRevealedFooter}>
                                        <Text style={styles.description}>
                                            {productDetail && productDetail.description}
                                        </Text>
                                        <Text style={styles.product}>{'\n'}</Text>
                                        {
                                            productDetail && productDetail.key_features ?
                                                <><Text style={styles.product}>{'\n'}Key Features</Text>
                                                    <Text style={styles.product}>{'\n'}</Text>
                                                    <Text style={styles.description}>
                                                        {productDetail && productDetail.key_features}
                                                    </Text>
                                                </>
                                                : null
                                        }
                                        <Text style={styles.product}>{'\n'}</Text>
                                        {
                                            productDetail && productDetail.units ?
                                                <>
                                                    <Text style={styles.product}>{'\n'}Units</Text>
                                                    <Text style={styles.product}>{'\n'}</Text>
                                                    <Text style={styles.description}>
                                                        {productDetail && productDetail.units}
                                                    </Text>
                                                </>
                                                : null
                                        }
                                        <Text style={styles.product}>{'\n'}</Text>
                                        {
                                            productDetail && productDetail.product_type ?
                                                <>
                                                    <Text style={styles.product}>{'\n'}Product Type</Text>
                                                    <Text style={styles.product}>{'\n'}</Text>
                                                    <Text style={styles.description}>
                                                        {productDetail && productDetail.product_type.title}
                                                    </Text>
                                                </>
                                                : null
                                        }
                                        {/* {productDetail && productDetail.custom_fields && productDetail.custom_fields.length > 0 ? null :
                                            <Text style={styles.product}>{'\n'}</Text>}
                                        {
                                            productDetail && productDetail.custom_fields && productDetail.custom_fields.length > 0 ?
                                                <>
                                                    {productDetail && productDetail.custom_fields.map((item, index) => (
                                                        <Text key={index}>
                                                            <Text style={styles.product}>{'\n'}</Text>
                                                            {
                                                                productDetail && productDetail.custom_fields.length > 0 ?
                                                                    <Text style={styles.product}>{'\n'}{item.title}</Text>
                                                                    : null
                                                            }
                                                            <Text style={styles.product}>{'\n'}</Text>
                                                            <Text style={styles.description}>
                                                                {item.value}
                                                            </Text>
                                                        </Text>
                                                    ))
                                                    }
                                                    <Text style={styles.product}>{'\n'}</Text>
                                                </>
                                                :
                                                null
                                        } */}
                                        <Text style={styles.product}>{'\n'}</Text>
                                        {
                                            productDetail && productDetail.expiry_date ?
                                                <><Text style={styles.product}>{'\n'}Expiry Date</Text>
                                                    <Text style={styles.product}>{'\n'}</Text>
                                                    <Text style={styles.description}>
                                                        {productDetail && productDetail.expiry_date}
                                                    </Text>
                                                    <Text style={styles.product}>{'\n'}</Text>
                                                </>
                                                : null
                                        }

                                        {
                                            productDetail && productDetail.categories && productDetail.categories.length > 0 ?
                                                <>
                                                    {productDetail && productDetail.categories.length > 0 ? <Text style={styles.product}>{'\n'}Category </Text> : null}
                                                    <Text>
                                                        <Text style={styles.product}>{'\n'}</Text>
                                                        <Text style={styles.description}>
                                                            {`${categoriesName}`}
                                                        </Text>
                                                    </Text>
                                                </>
                                                : null
                                        }

                                        {
                                            productDetail && productDetail.custom_fields && productDetail.custom_fields.length > 0 ?
                                                <Text>
                                                    {'\n'}{'\n'}
                                                    <Text style={styles.otherINfo}>Other Information : </Text>
                                                    {
                                                        productDetail && productDetail.custom_fields.map((item, index) => (
                                                            <Text key={index}>
                                                                <Text style={styles.product}>{'\n'}</Text>
                                                                {
                                                                    productDetail && productDetail.custom_fields.length > 0 ?
                                                                        <Text style={styles.product}>{'\n'}{item.title}</Text>
                                                                        : null
                                                                }
                                                                <Text style={styles.product}>{'\n'}</Text>
                                                                <Text style={styles.description}>
                                                                    {item.value}
                                                                </Text>
                                                            </Text>
                                                        ))
                                                    }
                                                    <Text style={styles.product}>{'\n'}</Text>
                                                </Text>
                                                : null
                                        }
                                    </ReadMore>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View> : null}
            </Modal>
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
        marginHorizontal: hzp(20),
        marginBottom: vp(20),
    },
    buttonTitle: {
        fontFamily: Font.regular,
        fontSize: fp(15),
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
        fontSize: fp(15),
        fontFamily: Font.light,
        color: colors.lightgrey,
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
    descriptionContainer: {
        marginTop: hp(6),
        flex: 1,
    },
    product: {
        fontSize: fp(18),
        fontFamily: Font.regular,
        color: colors.darkblack,
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
        fontFamily: Font.regular,
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
        backgroundColor: colors.offgrey,
        marginHorizontal: hzp(8),
    },
    rupees: {
        fontSize: fp(30),
        fontFamily: Font.semiBold,
        color: colors.black,
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
        width: wp(200),
        height: hp(200),
    },
    maincontainer: {
        backgroundColor: colors.white,
        paddingTop: vp(20),
        width: '100%',
    },
    gram: {
        paddingTop: hp(6),
        fontSize: fp(20),
        fontFamily: Font.regular,
        color: colors.black,
    },
    buttonContainer: {
        paddingHorizontal: hzp(32),
        paddingVertical: vp(5),
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
        fontSize: fp(24),
        fontFamily: Font.regular,
        color: colors.black,
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
        width: hp(85)
    },
    number: {
        fontSize: fp(14),
        fontFamily: Font.regular,
        color: colors.white,
    },
    otherINfo: {
        fontSize: fp(18),
        fontFamily: Font.semiBold,
        color: colors.darkblack,
        textTransform: 'capitalize',
    },
});


export default ItemDetailModal;
