import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    StatusBar,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Icon, Image, Button, Text, CheckBox, Chip, Input } from '@rneui/themed';
import Modal from 'react-native-modal';
import { Icons, IconsType } from '../assets/global_style/icon';
import { Dimension } from '../assets/global_style/dimension';
import { colors } from '../assets/global_style/colors';
import { fp, hp, hzp, vp, wp } from '../assets/global_style/fontsize';
import { Font } from '../assets/global_style/fontfamily';
import { Images } from '../assets/global_style/images';
import { renderImage } from '../components/Helper/general';

const ItemBonnModal = props => {
    const [check1, setCheck1] = useState();
    let itemDetail = props.itemDetail ? props.itemDetail : ''

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

                <View style={styles.ModalContainer}>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <View style={styles.maincontainer}>
                            <View>
                                <FlatList
                                    contentContainerStyle={styles.listMain}
                                    data={itemDetail.image}
                                    horizontal={true}
                                    keyExtractor={(index, item) => (index, item)}
                                    renderItem={({ item }) => (
                                        <View>
                                            <View style={styles.containerlist}>
                                                <View style={styles.imgContainer}>
                                                    <Image
                                                        style={styles.image}
                                                        source={item ? renderImage(item, 'large') : Images.bread}
                                                        // resizeMode='stretch'
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                />
                            </View>
                            <View style={styles.descriptionMain}>
                                <Text style={styles.productName}>{itemDetail.title}</Text>
                                <Text style={styles.gram}>{itemDetail.units}</Text>
                                <View style={styles.priceContainer}>
                                    <Text style={styles.rupees}>{`₹ ${parseInt(itemDetail.price)}`}</Text>
                                    {/* <Text style={styles.price}>₹25</Text> */}
                                </View>
                            </View>
                            <View style={styles.line}></View>
                            <View style={styles.productContainer}>
                                <Text style={styles.product}>Product detail</Text>
                                <View style={styles.descriptionContainer}>
                                    <Text style={styles.description}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
                                        aliquam, purus sit amet luctus venenatis, lectus magna
                                        fringilla urna, porttitor
                                    </Text>
                                </View>
                            </View>

                            {/* In case of read More */}

                            {/* <View style={styles.readContainer}>
                                <View style={styles.ButtonContainer}>
                                    <Text style={styles.buttonTitle}>Read More</Text>
                                </View>
                            </View> */}

                            <View style={styles.productContainer}>
                                <Text style={styles.product}>Key Features</Text>
                                <View style={styles.descriptionContainer}>
                                    <Text style={styles.description}>
                                        Made from 100% unprocessed whole wheat flour . Softer,
                                        fresher tastier and healthier way to stay in shape. Doed not
                                        contail trans and added colour.
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.productContainer}>
                                <Text style={styles.product}>Units</Text>
                                <View style={styles.descriptionContainer}>
                                    <Text style={styles.description}>400 g</Text>
                                </View>
                            </View>
                            <View style={styles.productContainer}>
                                <Text style={styles.product}>Shelf life</Text>
                                <View style={styles.descriptionContainer}>
                                    <Text style={styles.description}>7 days</Text>
                                </View>
                            </View>
                            <View style={styles.productContainer}>
                                <Text style={styles.product}>Manufacturer Details</Text>
                                <View style={styles.descriptionContainer}>
                                    <Text style={styles.description}>
                                        bonn bread comapny ltd , ludhian, punjab
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.productContainer}>
                                <Text style={styles.product}>FSSAI License</Text>
                                <View style={styles.descriptionContainer}>
                                    <Text style={styles.description}>10012021000071</Text>
                                </View>
                            </View>
                            <View style={styles.productContainer}>
                                <Text style={styles.product}>Disclaimer</Text>
                                <View style={styles.descriptionContainer}>
                                    <Text style={styles.description}>every effort is made to maintain accuracy of all information however actual product packaging.</Text>
                                </View>
                            </View>
                            <View style={styles.productContainer}>
                                <Text style={styles.product}>Country of Origin</Text>
                                <View style={styles.descriptionContainer}>
                                    <Text style={styles.description}>India</Text>
                                </View>
                            </View>
                            <View style={styles.productContainer}>
                                <Text style={styles.product}>Customer care details</Text>
                                <View style={styles.descriptionContainer}>
                                    <Text style={styles.description}>Email : info@lorem.com</Text>
                                    <Text style={styles.description}>customer care Number : 1-800-208-8888</Text>
                                </View>
                            </View>
                            <View style={styles.productContainer}>
                                <Text style={styles.product}>Category</Text>
                                <View style={styles.descriptionContainer}>
                                    <Text style={styles.description}>Breads , milk & eggs</Text>
                                </View>
                            </View>
                            <View style={styles.productContainer}>
                                <Text style={styles.product}>Expiry Date</Text>
                                <View style={styles.descriptionContainer}>
                                    <Text style={styles.description}>2023-3-04</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    modal: {
        marginTop: hp(80),
        alignItems: 'center',
        margin: 0,
    },
    ModalContainer: {
        height: hp(760),

    },
    readContainer: {
        marginTop: hp(20),
        marginHorizontal: hzp(20),
    },
    buttonTitle: {
        fontFamily: Font.regular,
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
    },
    product: {
        fontSize: fp(18),
        fontFamily: Font.regular,
        color: colors.darkblack,
    },
    line: {
        marginTop: hp(15),
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
    // rupessMain: {
    //     flex: 0.2,
    // },
    price: {
        fontSize: fp(18),
        fontFamily: Font.regular,
        color: colors.lightgrey,
        textDecorationLine: 'line-through',
        marginTop: vp(4),
        paddingLeft: vp(2),
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
});

export default ItemBonnModal;
