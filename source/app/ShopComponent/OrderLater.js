import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, CheckBox, Icon, Button, Input, } from '@rneui/themed';
import Modal from "react-native-modal";
import { colors } from '../assets/global_style/colors';
import { fp, hp, hzp, vp, wp } from '../assets/global_style/fontsize';
import { Font } from '../assets/global_style/fontfamily';
import { Icons, IconsType } from '../assets/global_style/icon';
import { Dimension } from '../assets/global_style/dimension';
import { TouchableOpacity } from 'react-native';
import Validation from '../components/Helper/Validations';
import { Toaster } from '../components/Helper/Toaster';
import OrderController from '../../apis/Controller/order.controller';
import filtersController from '../../apis/Controller/actionController';
import { t } from 'i18next';

const OrderLater = props => {
    const [orders, setOrder] = useState(props.value ? props.value : null);
    const [loader, setLoader] = useState(false);
    let defaultValues = {
        orderName: null,
    }
    const [values, setValues] = useState(defaultValues)

    const [isError, setError] = useState({
        orderName: {
            rules: ['required'],
            isValid: true,
            message: "",
        },

    })
    
    let Validations = new Validation(isError)

    const handleChange = (name, value) => {
        let check = Validations.validateField(name, value)
        setError({ ...isError, [name]: check })
        setValues({ ...values, [name]: value })
    };

    const submit = async () => {
        let savedAddress = props && props.savedAddress ? props.savedAddress : null
        let extraCharges = props && props.extraCharges ? props.extraCharges : null
        let finalTotalValue = props && props.finalTotalValue ? props.finalTotalValue : null
        let shopDetail = props && props.shopDetail ? props.shopDetail : '' 
        let validtn = new Validation(isError)
        let isValid = await validtn.isFormValid(values)
        let val = { ...orders, order_title: values.orderName }
        if (isValid && !isValid.haveError) {
            setLoader(true)
            let response = await OrderController.createOrder(val, shopDetail, extraCharges, savedAddress, finalTotalValue);
            if (response && response.status) {
              new Toaster().success(response.message);
              setLoader(false);
              props.close();
              props.toScreen();
              await new filtersController.setEmptyCarts();
            } 
            setLoader(false);
        }
        else {
          setError({ ...isValid.errors })
          setLoader(false);
        }
      };
   

    return (
        <>
            <Modal isVisible={props.open} style={styles.modal} backdropColor={colors.gray} backdropOpacity={0.85} onBackdropPress={() => props.close()} >
                <View style={styles.main}>
                    <View style={styles.viewmain}>
                        <View style={styles.vone}>
                            <Text style={styles.comment}>{t("orderLater.Order later")}</Text>
                        </View>
                        <View style={styles.vtwo}>
                            <TouchableOpacity onPress={() => props.close()}>
                                <View style={styles.viewicon}>
                                    <Icon type={IconsType.antDesign} name={Icons.close} size={Dimension.large} color={colors.white} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.viewinput}>
                        <Input
                            placeholder={t("orderLater.Order name")}
                            value={values.orderName}
                            errorMessage={
                                !isError.orderName.isValid
                                    ? isError.orderName.message
                                    : null
                            }
                            onChangeText={e => handleChange('orderName', e)} />
                    </View>
                    {/* <View style={styles.viewbtn1}>
                        <Button title={'Reminder'} buttonStyle={styles.btnone} onPress={() => addCalenderEvent(orders)} />
                    </View> */}
                    <View>
                        <Button title={t('orderLater.Save')} buttonStyle={styles.btntwo} titleStyle={styles.title} 
                        loading={loader}
                        loadingProps={{
                            size: 'small',
                            color: 'black',
                        }}
                        onPress={()=> submit()}
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
    viewinput: {
        marginTop: vp(40),
    },
    btnone: {
        backgroundColor: colors.primary,
    },
    btntwo: {
        backgroundColor: colors.primary,
    },
    title: {
        color: colors.white,
        fontSize: fp(16),
        fontFamily: Font.regular,
        textAlign: 'center',
        alignItems: 'center',
        width: '100%',
    },
    viewbtn1: {
        marginTop: vp(20),
        marginBottom: vp(16),
    },
});

export default OrderLater;
