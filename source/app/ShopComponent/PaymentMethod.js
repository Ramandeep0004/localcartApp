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
import OrderController from '../../apis/Controller/order.controller';
import { t } from 'i18next';

const PaymentMethod = props => {
    const { orderId } = props;

    const [loader, setLoader] = useState(false);
    const [type, setType] = useState(null);
    const submitPayment = async (e) => {
        setType(e)
        let post = {
            orderId: orderId,
            paymentMethod: e
        }
        setLoader(false);
        let response = await OrderController.orderPayment(post);
        if (response && response.status) {
            setLoader(false);
            props.close();
            if (e === 'online') {
                props.getOrderDetails();
                props.setPaymentQrPopUp();
            } else {
                props.getOrderDetails();
            }
        } else {
            setLoader(false);
        }
    };

    return (
        <>
            <Modal isVisible={props.open} style={styles.modal} backdropColor={colors.gray} backdropOpacity={0.85} >
                <View style={styles.maincontainer}>
                    <View style={styles.main}>
                        <View style={base.row}>
                            <View style={styles.vone}>
                                <Text style={styles.select}>{t("paymentMethod.Select Payment Method")}</Text>
                            </View>
                            <View style={styles.vtwo}>
                                <TouchableOpacity onPress={() => props.close()}>
                                    <View style={styles.viewicon}>
                                        <Icon type={IconsType.antDesign} name={Icons.close} size={Dimension.verysmall} color={colors.white} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.button}>
                        <Button
                            title={t('paymentMethod.Online payment')}
                            buttonStyle={styles.btn}
                            loading={type === 'online' ? loader : null}
                            loadingProps={{
                                color: 'white',
                            }}
                            onPress={() => submitPayment('online')}
                        />
                    </View>
                    <Button
                        title={t('paymentMethod.Cash')}
                        buttonStyle={styles.btncan}
                        titleStyle={styles.title}
                        loading={type === 'cash' ? loader : null}
                        loadingProps={{
                            color: 'black',
                        }}
                        onPress={() => submitPayment('cash')}
                    />
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
        paddingBottom: vp(25)
    },
    select: {
        fontSize: fp(22),
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
    // mainicon: {
    //     alignItems: 'flex-end',
    //     marginRight: vp(-5),
    // },
    vone: {
        flex: .89,
        justifyContent: 'center'
    },
    vtwo: {
        flex: .11,
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

export default PaymentMethod;
