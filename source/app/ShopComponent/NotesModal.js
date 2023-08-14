import { Icon, Text } from '@rneui/themed';
import { t } from 'i18next';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, vp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';

const NotesModal = props => {
    const { item } = props;
    return (
        <>
            <Modal isVisible={props.open} style={styles.modal} backdropColor={colors.gray} backdropOpacity={0.85} >
                <View style={styles.maincontainer}>
                    <View style={styles.viewmain}>
                        <View style={styles.vone}>
                            <Text style={styles.comment}>{t("orderSummary.Comment")}</Text>
                        </View>
                        <View style={styles.vtwo}>
                            <TouchableOpacity onPress={() => props.close()}>
                                <View style={styles.viewicon}>
                                    <Icon type={IconsType.antDesign} 
                                          name={Icons.close} 
                                          size={Dimension.large} 
                                          color={colors.white} 
                                          />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.viewnote}>
                        <View style={styles.subMain}>
                            <Text style={styles.fusce}>{item}</Text>
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
        paddingTop: vp(12),
        paddingHorizontal: vp(20),
        width: '91%',
        borderRadius: vp(10),
        paddingBottom: vp(20)
    },
    viewmain: {
        flexDirection: 'row',
    },
    vone: {
        flex: .9,
    },
    vtwo: {
        flex: .1,
    },
    comment: {
        fontSize: fp(24),
        color: colors.black,
        fontFamily: Font.regular,
    },
    viewicon: {
        height: hp(40),
        width: hp(40),
        borderRadius: hp(20),
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewnote: {
        marginTop: vp(20),
    },
    subMain: {
        backgroundColor: colors.offpink,
        marginTop: vp(15),
        paddingHorizontal: vp(20),
        paddingVertical: vp(15),
        borderRadius: hp(6),
    },
    fusce: {
        fontSize: fp(13),
        color: colors.grey,
        fontFamily: Font.regular,
        lineHeight: hp(16),
    },
});

export default NotesModal;
