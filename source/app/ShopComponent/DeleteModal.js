import { Button, Icon, Text } from '@rneui/themed';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Modal from "react-native-modal";
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, vp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';

const DeleteModal = props => {
    return (
        <>
            <Modal isVisible={props.open} style={styles.modal} backdropColor={colors.gray} backdropOpacity={0.85} onBackdropPress={() => props.close()} >
                <View style={styles.main}>
                    <View style={styles.viewmain}>
                        <View style={styles.viewicon}>
                            <Icon type={props.IconType ? props.IconType : ''}
                                name={props.IconName ? props.IconName : ''}
                                color={props.IconColor ? props.IconColor : ''}
                                size={props.IconSize ? props.IconSize : ''}
                            />
                        </View>
                    </View>
                    {
                        props.message1 ?
                            <Text style={styles.sure}>{props.message1}</Text>
                            :
                            <Text style={styles.sure2}></Text>
                    }
                    <View style={styles.viewtext}>
                        {
                            props && props.message2 ?
                                <Text style={props && props.textStyle1 ? props.textStyle1 : styles.text}>{props.message2}</Text>
                                :
                                null
                        }
                        {
                            props && props.message3 ?
                                <Text style={props && props.textStyle2 ? props.textStyle2 : styles.text}>{props.message3}</Text>
                                :
                                null
                        }
                    </View>
                    <View style={styles.mainbutton}>
                        {
                            props && props.buttonTitle1 ?
                                <View style={styles.btnone}>
                                    <Button title={props.buttonTitle1 ? props.buttonTitle1 : ''}
                                        buttonStyle={styles.btnonestyle}
                                        titleStyle={styles.titlebtn}
                                        onPress={() => props.close()}
                                    />
                                </View>
                                :
                                null

                        }
                        {
                            props && props.buttonTitle2 ?
                                <View style={styles.btntwo}>
                                    <Button title={props.buttonTitle2 ? props.buttonTitle2 : ''}
                                        buttonStyle={styles.btntwostyle}
                                        loading={props && props.loader ? props.loader : ''}
                                        onPress={() => props.deletItemRequest()}
                                    />
                                </View>
                                :
                                null

                        }
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
    viewicon: {
        height: hp(86),
        width: hp(86),
        borderRadius: hp(43),
        backgroundColor: colors.lightred,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewmain: {
        alignItems: 'center',
    },
    text: {
        fontSize: fp(16),
        fontFamily: Font.regular,
        color: colors.lightgrey,
        lineHeight: hp(20),
    },
    viewtext: {
        marginTop: vp(10),
        alignItems: 'center',
    },
    sure: {
        fontSize: fp(24),
        fontFamily: Font.regular,
        color: colors.black,
        textAlign: 'center',
        marginTop: vp(20),
    },
    sure2: {
        // marginTop: vp(0),
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
});

export default DeleteModal;
