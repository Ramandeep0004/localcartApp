import { Icon, Image, Text } from '@rneui/themed';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";
import { base } from '../assets/global_style/base';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, vp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';
import { Images } from '../assets/global_style/images';
import { renderImage } from '../components/Helper/general';

const PaymentQrCode = props => {
    const { image } = props;

    return (
        <>
            <Modal isVisible={props.open} style={styles.modal} backdropColor={colors.gray} backdropOpacity={0.85} >
                <View style={styles.maincontainer}>
                    <View style={styles.vtwo}>
                        <TouchableOpacity onPress={() => props.close()}>
                            <View style={styles.viewicon}>
                                <Icon type={IconsType.antDesign} name={Icons.close} size={Dimension.docicon} color={colors.white} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.Mainview}>
                        <View style={styles.Mainimage}>
                            <Image style={styles.image} source={image ? renderImage(image) : Images.scan} resizeMode='contain' />
                        </View>
                        <Text style={styles.scan}>{t("paymentMethod.Scan this QR code for payment")}</Text>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
    },
    Mainimage: {
        height: hp(260),
        width: hp(260),
        overflow: 'hidden',
    },
    Mainview: {
        alignItems: 'center',
    },
    image: {
        height: '100%',
        width: '100%',
    },
    scan: {
        fontSize: fp(20),
        fontFamily: Font.regular,
        color: colors.lightgrey,
        textAlign: 'center',
    },
    maincontainer: {
        backgroundColor: colors.white,
        paddingTop: vp(30),
        paddingHorizontal: vp(20),
        width: '91%',
        borderRadius: vp(10),
        paddingBottom: vp(25)
    },
    select: {
        fontSize: fp(22),
        color: colors.black,
        fontFamily: Font.regular,
    },
    viewicon: {
        height: hp(35),
        width: hp(35),
        borderRadius: hp(20),
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // mainicon: {
    //     alignItems: 'flex-end',
    //     marginRight: vp(-5),
    // },
    vone: {
        flex: .89,
        justifyContent: 'center'
    },
    vtwo: {
        position: 'absolute',
        top: 10,
        right: 10
        // backgroundColor: 'red'
    },
    main: {
        alignItems: 'center',
    },
    btn: {
        backgroundColor: colors.primary,
        height: hp(50),
        paddingVertical: hp(0),
    },
    title: {
        color: colors.black,
        fontSize: fp(16),
        fontFamily: Font.regular,
        textAlign: 'center',
        alignItems: 'center',
        width: '100%',
    },
    btncan: {
        backgroundColor: colors.btngrey,
        height: hp(50),
        paddingVertical: hp(0),
    },
    button: {
        marginTop: vp(35),
        marginBottom: vp(15),
    },
});

export default PaymentQrCode;
