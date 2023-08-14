import { Icon, Image, Text } from '@rneui/themed';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import { base } from '../assets/global_style/base';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, hzp, vp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';
import { Images } from '../assets/global_style/images';

const DeliveryOrderList = (props) => {
    const { index } = props;
    return (
        <View>
            {/* <FlatList
                contentContainerStyle={styles.flat}
                data={props.data}
                keyExtractor={(index, item) => (item, index)}
                renderItem={({ item }) => ( */}
                    <DropShadow style={styles.Shadow}>
                        <View style={styles.subcontainer}>
                            {/* <View style={styles.SubMain}> */}
                            <TouchableOpacity onPress={() => props.action()}>
                                <View style={base.row}>
                                    <View style={[base.col9]}>
                                        <Text style={styles.textqr}>QRD289794117</Text>
                                    </View>
                                    <View style={base.col3}>
                                        <View style={styles.mainpend}>
                                            {/* New->  Pending */}
                                            {/* {index === 0 ?
                                                <View style={styles.viewpending}>
                                                    <Text style={styles.Pending}>Pending</Text>
                                                </View>
                                                : index === 1 ?
                                                    <View style={styles.viewaccept}>
                                                        <Text style={styles.accept}>Accepted</Text>
                                                    </View>
                                                    : index === 2 ?
                                                        <View style={styles.viewaccept}>
                                                            <Text style={styles.accept}>Packed</Text>
                                                        </View> */}
                                            {index === 4 ?
                                                <View style={styles.viewCom}>
                                                    <Text style={styles.Complt}>Completed</Text>
                                                </View>
                                                : index === 5 ?
                                                    <View style={styles.viewref}>
                                                        <Text style={styles.refuse}>Refused</Text>
                                                    </View>
                                                    : null}
                                        </View>
                                    </View>
                                    <Text style={styles.item}>8 items</Text>
                                    <View style={base.row}>
                                        <View style={base.col6}>
                                            <Text style={styles.amount}>Total Amount - <Text style={styles.rupee}> ₹82</Text></Text>
                                        </View>
                                        <View style={base.col6}>
                                            <View style={styles.viewrow}>
                                                <Text style={styles.pick}>Pickup  mon, 25 apr22, 4:00pm</Text>
                                            </View>
                                        </View>
                                    </View>

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
                                        <Image style={styles.image} source={Images.man} resizeMode='contain' />
                                    </View>
                                    <View style={styles.MainView}>
                                        <View style={styles.Vone}>
                                            <Text style={styles.bablu}>Bablu Gauswami</Text>
                                            <View style={styles.viewloc}>
                                                <View style={base.row}>
                                                    <Icon type={IconsType.ionIcon} name={Icons.locationsharp} size={Dimension.Vsmall} color={colors.lightgrey} />
                                                    <Text style={styles.lore}>Loremsit</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.Vtwo}>
                                            <View style={styles.Viewicon}>
                                                <Icon type={IconsType.feather} name={Icons.phone} size={Dimension.smallicon} color={colors.white} />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </DropShadow>
                {/* )}
            /> */}
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
        fontFamily: Font.regular,
        marginLeft: vp(-5)
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
    },
    lore: {
        fontSize: fp(14),
        fontFamily: Font.regular,
        color: colors.lightgrey,
        marginTop: vp(-2),
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
        height: hp(23),
        width: hp(75),
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
    // viewtext: {
    //     marginHorizontal: vp(-4),
    // },

});

export default DeliveryOrderList;