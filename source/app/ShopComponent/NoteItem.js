import { Icon, Text } from '@rneui/themed';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, vp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';
import NotesOrder from './NotesOrder';

const NoteItem = props => {
    return (
        <>
            <Modal isVisible={props.open} style={styles.modal} backdropColor={colors.gray} backdropOpacity={0.85} >
                <View style={styles.maincontainer}>
                    <View style={styles.viewmain}>
                        <View style={styles.vone}>
                            <Text style={styles.comment}>Note</Text>
                        </View>
                        <View style={styles.vtwo}>
                            <TouchableOpacity onPress={() => props.close()}>
                                <View style={styles.viewicon}>
                                    <Icon
                                        type={IconsType.antDesign}
                                        name={Icons.close}
                                        size={Dimension.large}
                                        color={colors.white}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.viewnote}>
                        <NotesOrder
                            action={() => console.log('')}
                            Note={props && props.Note ? props.Note : null}
                        />
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
});

export default NoteItem;
