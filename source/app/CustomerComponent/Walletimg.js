import { Button, Icon, Image, Input, Text } from '@rneui/themed';
import { t } from 'i18next';
import React from 'react';

import { StyleSheet, TouchableOpacity } from 'react-native';
import { ImageBackground, StatusBar, View } from 'react-native';
import { colors } from '../assets/global_style/colors';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, vp, wp } from '../assets/global_style/fontsize';
import { Images } from '../assets/global_style/images';

const WalletimgCom = props => {
    const { availiableBalance } = props;
    return (
        <View style={styles.containerMain}>
            {availiableBalance ? <View style={styles.imgMain}>
                <ImageBackground
                    style={styles.image}
                    source={Images.walletimg}
                    resizeMode='stretch'>
                    <View style={styles.balance}>
                        <Text style={styles.text1}>{t("myProfilePages.Available Balance")}</Text>
                        <View style={{ flexDirection: 'row', marginTop: vp(5) }}>
                            <Text style={styles.text2}>₹</Text>
                            <Text style={styles.price}>{availiableBalance && availiableBalance.wallet_balance}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        height: '100%',
        width: '100%',

        overflow: 'hidden',
    },
    balance: {
        // position: 'absolute',
        // top: 0,
        // left: 0,
        marginLeft: wp(30),
        marginTop: hp(30),
        marginHorizontal: vp(30),
    },
    text1: {
        fontSize: fp(24),
        fontFamily: Font.semiBold,
        color: colors.white,
    },
    text2: {
        marginTop: hp(8),
        fontSize: fp(20),
        fontFamily: Font.semiBold,
        color: colors.white,
    },
    price: {
        marginLeft: wp(5),
        fontSize: fp(38),
        fontFamily: Font.semiBold,
        color: colors.white,
    },
    imgMain: {
        borderRadius: hp(10),
        height: hp(145),
        width: '100%',
        // backgroundColor: 'red',
        // borderRadius:hp(10),
        overflow: 'hidden',
    },
    containerMain: {
        marginHorizontal: vp(-13)
    },
});

export default WalletimgCom;
