import React, { useState } from 'react';
import { StyleSheet, View, FlatList, StatusBar, TouchableOpacity, } from 'react-native';
import { Icon, Image, Button, Text, CheckBox, Chip, Input, } from '@rneui/themed';
import Modal from "react-native-modal";
import { colors } from '../assets/global_style/colors';
import { fp, hp, hzp, vp, wp } from '../assets/global_style/fontsize';
import { base } from '../assets/global_style/base';
import { Font } from '../assets/global_style/fontfamily';
import { Images } from '../assets/global_style/images';
import { Dimension } from '../assets/global_style/dimension';
import { Icons, IconsType } from '../assets/global_style/icon';
import NotesOrder from './NotesOrder';
import UploadedImage from './UploadedImage';
import { t } from 'i18next';

const RepeatOrder = props => {
    return (
        <>
            <Modal isVisible={props.open} style={styles.modal} backdropColor={colors.gray} backdropOpacity={0.85} >
                <View style={styles.maincontainer}>
                    <TouchableOpacity onPress={() => props.close()} >
                        <View style={styles.mainicon}>
                            <View style={styles.viewicon}>
                                <Icon type={IconsType.antDesign} name={Icons.close} size={Dimension.verysmall} color={colors.white} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.vieworder}>
                        <Text style={styles.order}>{t("repeatOrderModal.Do you want to continue with")}</Text>
                        <Text style={styles.order}>{t("repeatOrderModal.the same order?")}</Text>
                    </View>
                    <View style={styles.mainbtn}>
                        <View style={styles.btnone}>
                            <Button title={t('repeatOrderModal.No')} buttonStyle={styles.buttonone} titleStyle={styles.title} onPress={() =>  props.close()} />
                        </View>
                        <View style={styles.btntwo}>
                            <Button title={t('repeatOrderModal.Yes')} buttonStyle={styles.buttontwo} onPress={() =>  props.action()} />
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
        margin: 0,
    },
    maincontainer: {
        backgroundColor: colors.white,
        paddingTop: vp(15),
        paddingHorizontal: vp(20),
        width: '91%',
        borderRadius: vp(10),
        paddingBottom: vp(20)
    },
    mainicon: {
        alignItems: 'flex-end',
    },
    viewicon: {
        height: hp(40),
        width: hp(40),
        borderRadius: hp(20),
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    order: {
        fontSize: fp(24),
        fontFamily: Font.regular,
        color: colors.black,
    },
    vieworder: {
        alignItems: 'center',
        marginTop: vp(25),
    },
    mainbtn: {
        flexDirection: 'row',
        marginTop: vp(25),
    },
    btnone: {
        flex: .5,
        marginRight: vp(8),
    },
    btntwo: {
        flex: .5,
        marginLeft: vp(8),
    },
    buttonone: {
        backgroundColor: colors.btngrey,
        width: '100%'
    },
    title: {
        color: colors.black,
        fontSize: fp(16),
        fontFamily: Font.regular,
        textAlign: 'center',
        alignItems: 'center',
        width: '100%',
    },
    buttontwo: {
        backgroundColor: colors.primary,
    },
});

export default RepeatOrder;
