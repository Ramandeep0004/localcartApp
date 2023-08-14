import { Button, Icon, Image, Text } from '@rneui/themed';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, vp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';
import { Images } from '../assets/global_style/images';

const Congratulations = props => {
    return (
        <>
            <Modal isVisible={props.open} style={styles.modal} backdropColor={colors.gray} backdropOpacity={0.85} onBackdropPress={() => props.close()} >
                <View style={styles.main}>
                    <View style={styles.viewicon}>
                        <TouchableOpacity onPress={() => props.close()} >
                            <Icon type={IconsType.antDesign} name={Icons.close} color={colors.white} size={Dimension.semilarge} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viewimage}>
                        <View style={styles.mainimage}>
                            <Image style={styles.image} source={Images.starc} resizeMode='contain' />
                        </View>
                        <Text style={styles.congrat}>{props.heading ? props.heading : t("spinAndWheel.Congratulations")}</Text>
                        <View style={styles.viewtext}>
                            {props.message1 ? <Text style={styles.lorem}>{props.message1 ? props.message1 : ''}</Text> : null}
                            {props.message2 ? <Text style={styles.lorem}>{props.message2 ? props.message2 : ''}</Text> : null}
                        </View>
                    </View>
                    <View style={styles.viewbtn}>
                        <Button title={props.buttonText ? props.buttonText : t('spinAndWheel.Spin')} buttonStyle={styles.btnstyle} onPress={()=> props.onPress()}/>
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
        marginHorizontal: 20,
    },
    main: {
        backgroundColor: colors.white,
        width: '98%',
        borderRadius: hp(10),
        overflow: 'hidden',
        paddingHorizontal: vp(20),
        paddingVertical: vp(20),
    },
    icon: {
        height: hp(40),
        width: hp(40),
        borderRadius: hp(20),
        overflow: 'hidden',
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewicon: {
        alignItems: 'flex-end',
    },
    image: {
        height: '100%',
        width: '100%',
    },
    mainimage: {
        height: hp(50),
        width: hp(50),
        borderRadius: hp(25),
        overflow: 'hidden',
    },
    viewimage: {
        alignItems: 'center',
    },
    congrat: {
        fontSize: fp(24),
        fontFamily: Font.regular,
        color: colors.black,
        marginTop: vp(20),
    },
    lorem: {
        fontSize: fp(16),
        color: colors.lightgrey,
        fontFamily: Font.regular,
        textAlign: 'center',
    },
    viewtext: {
        marginTop: vp(16),
    },
    btnstyle: {
        backgroundColor: colors.primary,
    },
    viewbtn: {
        marginTop: vp(25),
    },
});

export default Congratulations;
