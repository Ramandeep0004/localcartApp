import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, CheckBox, Icon, Button, Image, } from '@rneui/themed';
import Modal from "react-native-modal";
import { colors } from '../assets/global_style/colors';
import { fp, hp, hzp, vp, wp } from '../assets/global_style/fontsize';
import { Font } from '../assets/global_style/fontfamily';
import { Icons, IconsType } from '../assets/global_style/icon';
import { Dimension } from '../assets/global_style/dimension';
import { Images } from '../assets/global_style/images';

const RequestSent = props => {
    return (
        <>
            <Modal isVisible={props.open} style={styles.modal} backdropColor={colors.gray} backdropOpacity={0.85} onBackdropPress={() => props.close()} >
                <View style={styles.main}>
                    <View style={styles.mainimage}>
                        <Image style={styles.image} source={Images.star} resizeMode='stretch' />
                        <View style={styles.viewicon}>
                            <Icon type={IconsType.feather} name={Icons.check} color={colors.parrotgreen} size={Dimension.big} />
                        </View>
                    </View>
                    <Text style={styles.text}>Request Sent</Text>
                    <View style={styles.viewtext}>
                        <Text style={styles.lorem}>Lorem ipsum sit dor amet dolor</Text>
                        <Text style={styles.lorem}>el sit dor</Text>
                    </View>
                    <View style={styles.viewbtn}>
                        <Button title={'Ok'} buttonStyle={styles.btn} onPress={() => props.close()} />
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
        alignItems: 'center',
    },
    image: {
        height: '100%',
        width: '100%',
    },
    mainimage: {
        height: hp(86),
        width: hp(86),
        borderRadius: hp(43),
        overflow: 'hidden',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    viewicon: {
        position: 'absolute',
        left: 0,
        right: 0,
        marginTop: vp(25)
    },
    text: {
        fontSize: fp(24),
        color: colors.black,
        fontFamily: Font.regular,
        marginTop: vp(25),
    },
    lorem: {
        fontSize: fp(16),
        fontFamily: Font.regular,
        color: colors.lightgrey,
        textAlign: 'center',
        lineHeight: hp(20),
    },
    viewtext: {
        marginTop: vp(10),
    },
    btn: {
        backgroundColor: colors.primary,
    },
    viewbtn: {
        marginTop: vp(25),
    },
});

export default RequestSent;
