import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, CheckBox, Icon, Button, } from '@rneui/themed';
import Modal from "react-native-modal";
import { colors } from '../assets/global_style/colors';
import { fp, hp, hzp, vp, wp } from '../assets/global_style/fontsize';
import { Font } from '../assets/global_style/fontfamily';
import { Icons, IconsType } from '../assets/global_style/icon';
import { Dimension } from '../assets/global_style/dimension';
import { base } from '../assets/global_style/base';

const SuccessModal = props => {
    return (
        <>
            <Modal isVisible={props.open} style={styles.modal} backdropColor={colors.gray} backdropOpacity={0.85} >
                <View style={styles.main}>
                    <View style={styles.viewmain}>
                        <View style={styles.viewicon}>
                            <Icon
                                name={Icons.check}
                                type={IconsType.octIcon}
                                size={Dimension.Large}
                                color={colors.parrotgreen}
                            />
                        </View>
                    </View>
                    <View style={styles.viewtext}>
                        <Text style={styles.text}> Your payment has been paid successfully</Text>
                    </View>
                    <View style={styles.buttomMain}>
                        <View style={base.col12}>
                            <Button buttonStyle={styles.buttonContainer}
                                title="OK"
                                onPress={() => props.navigation.goBack()}
                            />
                        </View>
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
        width: '82%',
        height: "30%",
        borderRadius: hp(10),
        overflow: 'hidden',
        paddingHorizontal: vp(20),
        paddingVertical: vp(20),
    },
    viewicon: {
        height: hp(86),
        width: hp(86),
        borderRadius: hp(43),
        backgroundColor: colors.Lgreen,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewmain: {
        alignItems: 'center',
    },
    text: {
        fontSize: fp(16),
        fontFamily: Font.semiBold,
        color: colors.lightgrey,
        lineHeight: hp(20),
    },
    viewtext: {
        marginTop: vp(30),
        alignItems: 'center',
    },
    sure: {
        fontSize: fp(24),
        fontFamily: Font.regular,
        color: colors.black,
        textAlign: 'center',
        marginTop: vp(20),
    },
    mainbutton: {
        flexDirection: 'row',
        marginTop: vp(40),
        backgroundColor: colors.white,
    },
    btnone: {
        flex: .5,
        marginRight: vp(8),
    },
    btntwo: {
        flex: .5,
        marginLeft: vp(8),
    },
    btnonestyle: {
        backgroundColor: colors.greyy,
    },
    btntwostyle: {
        backgroundColor: colors.primary,
    },
    titlebtn: {
        color: colors.black,
        fontSize: fp(16),
        fontFamily: Font.regular,
        textAlign: 'center',
        alignItems: 'center',
        width: '100%',
    },
    buttomMain: {
        marginTop: hp(15),
    },
    buttonContainer: {
        backgroundColor: colors.primary,
    },
});

export default SuccessModal;
