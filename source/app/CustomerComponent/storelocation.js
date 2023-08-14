import { Button, Icon, Image, Input, Text } from '@rneui/themed';
import React from 'react';

import { Dimensions, StyleSheet } from 'react-native';
import { ImageBackground, StatusBar, View } from 'react-native';
import { base } from '../assets/global_style/base';
import { colors } from '../assets/global_style/colors';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, hzp, vp, wp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';
import { Images } from '../assets/global_style/images';
import { Dimension } from '../assets/global_style/dimension';

const StoreLocationComp = props => {
    return (
        <View>
            <View style={styles.ContainerMain1}>
                <View style={styles.imgMain}>
                    <View style={styles.imgContainer}>
                        <Image
                            style={styles.image}
                            source={Images.shop}
                            resizeMode='stretch'
                        />
                    </View>
                    <View style={styles.subprofileMain}>
                        <View style={styles.profileMain2}>
                            <Image
                                style={styles.image}
                                source={Images.person}
                                resizeMode='stretch'
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.descriptionMain}>
                    <Text style={styles.store}>A2Z Store</Text>
                    <Text style={styles.sundesc}>Arnav Dauswami (Retailer)</Text>
                    <View style={styles.locationContainer}>
                        <View style={styles.IconMain}>
                            <Icon
                                name={Icons.ioslocationsharp}
                                type={IconsType.ionIcon}
                                size={Dimension.verysmall}
                                color={colors.lightgrey}
                            />
                        </View>
                        <View style={styles.textMain}>
                            <Text style={styles.locationtxt}>Loremsit</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.iconMain}>
                    {/* In case of organic items */}
                    {/* <View style={styles.boxMain}>
            <Text style={styles.organic}>Organic</Text>
          </View> */}
                    <View style={styles.boxMain}>
                        <Text style={styles.organic}>Non-Organic</Text>
                    </View>
                    <Icon
                        containerStyle={styles.mapIcon}
                        name={Icons.map}
                        color={colors.black}
                        type={IconsType.feather}
                        size={Dimension.semilarge}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    ContainerMain1: {
        flexDirection: 'row',
    },
    mapIcon: {
        marginRight: wp(3),
        marginTop: hp(38),
    },
    locationtxt: {
        paddingLeft: wp(5),
        fontSize: fp(16),
        fontFamily: Font.regular,
        color: colors.lightgrey,
    },

    IconMain: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: wp(-3)
    },
    locationContainer: {
        paddingTop: hp(4),
        flexDirection: 'row',
    },
    descriptionMain: {
        paddingLeft: wp(37),
        flex: 0.5,
    },
    profileMain2: {
        height: hp(44),
        width: hp(44),
        borderRadius: hp(22),
        overflow: 'hidden',
    },
    subprofileMain: {
        bottom: 0,
        right: 0,
        left: wp(50),
        top: hp(53),
        position: 'absolute',
    },
    organic: {
        fontSize: fp(14),
        fontFamily: Font.regular,
        color: colors.darkkgreen,
    },
    boxMain: {
        paddingHorizontal: hzp(10),
        paddingVertical: vp(5),
        backgroundColor: 'rgba(225, 245, 199, 0.7)',
        borderRadius: hp(30),
    },
    imgMain: {
        flex: 0.2,
    },
    sundesc: {
        paddingTop: hp(4),
        fontSize: fp(16),
        fontFamily: Font.regular,
        color: colors.lightgrey,
    },
    image: {
        height: '100%',
        width: '100%',
    },
    store: {
        paddingTop: hp(5),
        fontSize: fp(20),
        paddingRight: wp(30),
        fontFamily: Font.semiBold,
        color: colors.black,
    },
    imgContainer: {
        height: hp(90),
        width: hp(90),
        borderRadius: hp(45),
        overflow: 'hidden',
    },
    iconMain: {
        flex: 0.3,
        alignItems: 'flex-end',
    },
});

export default StoreLocationComp;
