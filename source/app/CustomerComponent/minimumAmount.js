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

const MinimumAmountModal = props => {
    return (
        <>
            <Modal isVisible={props.open}
                backdropOpacity={0.8}
                backdropColor={colors.grey}>
                <View style={styles.modalContainer}>
                    <View style={base.col12}>
                        <View style={styles.imgContainer}>
                            <View style={{ height: hp(80), width: hp(80), borderRadius: hp(75), backgroundColor: props.iconMainColor ? props.iconMainColor : colors.Secondary }}>
                                <View style={styles.iconMain}>
                                    <Icon
                                        name={props.iconName ? props.iconName : Icons.alertcircle}
                                        type={props.iconType ? props.iconType : IconsType.feather}
                                        size={props.dimension ? props.dimension : Dimension.Big}
                                        color={props.iconColor ? props.iconColor : colors.white}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={base.col12}>
                        <View style={styles.verifiedMain}>
                            <Text style={styles.verified}>{props.label ? props.label : 'Message'}
                            </Text>
                        </View>
                    </View>
                    <View style={base.col12}>
                        <View style={styles.descriptionMain}>
                            <Text style={styles.description}>
                                {props.message ? props.message : 'Message'}
                            </Text>
                        </View>
                    </View>
                    {props.message1 ? <View style={base.col12}>
                        <View style={styles.descriptionMain}>
                            <Text style={styles.description}>
                                {props.message1 ? props.message1 : null}
                            </Text>
                        </View>
                    </View> : null}
                    {props.OneButtonOnly ? <View style={styles.buttonMain}>
                        <View style={styles.button22}>
                            <Button title={props.RightButtonText ? props.RightButtonText : 'Delete'}
                                buttonStyle={styles.buttonstyle}
                                onPress={() => props.onConfirm()}
                            />
                        </View>
                    </View>
                        :
                        <View style={styles.buttonMain}>
                            <View style={styles.button}>
                                <Button title={props.leftButtonText ? props.leftButtonText : 'Cancel'}
                                    titleStyle={{ color: colors.primary }}
                                    buttonStyle={styles.buttonstyle1}
                                    onPress={() => props.close()}
                                />
                            </View>
                            <View style={styles.button}>
                                <Button title={props.RightButtonText ? props.RightButtonText : 'Delete'}
                                    buttonStyle={styles.buttonstyle}
                                    onPress={() => props.onConfirm()}
                                />
                            </View>
                        </View>}

                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        maxHeight: hp(600),
        paddingVertical: vp(26),
        backgroundColor: colors.inputbg,
        borderRadius: hp(10),
    },
    imgContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        height: '100%',
        width: '100%',
    },
    imgMain: {

        height: hp(70),
        width: wp(70),
    },
    iconMain: {
        position: 'absolute',
        bottom: 0,
        top: 8,
        left: 0,
        right: 0
    },
    verifiedMain: {
        marginTop: hp(26),
        alignItems: 'center',
        justifyContent: 'center'
    },
    verified: {
        fontSize: fp(26),
        fontFamily: Font.semiBold,
        color: colors.black,
    },
    descriptionMain: {
        marginTop: hp(14),
        alignItems: 'center',
        justifyContent: 'center',
    },
    description: {
        width: "80%",
        fontSize: fp(18),
        fontFamily: Font.regular,
        color: colors.lightgrey,
        textAlign: 'center'
    },
    buttonstyle: {
        backgroundColor: colors.primary,
        height: hp(50),
        paddingVertical: vp(5),
        borderWidth: hp(0.5),
        borderColor: colors.primary
    },
    buttonstyle1: {
        backgroundColor: colors.white,
        height: hp(50),
        paddingVertical: vp(5),
        borderWidth: hp(1),
        borderColor: colors.primary
    },
    button: {
        marginHorizontal: vp(10),
        marginTop: vp(20),
        flex: 0.5
    },
    button1: {
        marginHorizontal: vp(10),
        marginTop: vp(20),
        flex: 0.5
    },
    buttonMain: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: hp(20)
    },
    button22: {
        marginHorizontal: vp(10),
        marginTop: vp(20),
        flex: 1
    },
});

export default MinimumAmountModal;
