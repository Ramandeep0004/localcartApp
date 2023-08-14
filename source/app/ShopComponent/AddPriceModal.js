import { Button, Icon, Input, Text } from '@rneui/themed';
import { t } from 'i18next';
import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, vp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';

const AddPriceModal = props => {

    return (
        <Modal isVisible={props.open} style={styles.modal} backdropColor={colors.gray} backdropOpacity={0.85} avoidKeyboard={true} >
         
                <View style={styles.main}>
                <KeyboardAvoidingView>
                    <View style={styles.viewmain}>
                        <View style={styles.vone}>
                            <Text style={styles.comment}>{props && props.tittle ? props.tittle : t("shopDetail.Add Price")}</Text>
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
                    <View style={styles.viewinput}>
                        <Input
                            inputStyle={styles.inputTxt}
                            placeholder={props && props.placeholder ? props.placeholder : t("shopDetail.Add Price")}
                            keyboardType={'number-pad'}
                            containerStyle={styles.container}
                            inputContainerStyle={styles.container}
                            value={props && props.values && props.values.price ? props.values.price : props.values.discount}
                            errorMessage={
                                props && props.isError && props.isError.price && !props.isError.price.isValid
                                    ? props.isError.price.message
                                    : props && props.isError && props.isError.discount && !props.isError.discount.isValid
                                        ? props.isError.discount.message
                                        : null
                            }
                            onChangeText={e => props.handleChange(props && props.priceProp ? 'price' : 'discount', e)}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button title={t('orderSummary.Save')}
                            buttonStyle={styles.buttonstyle}
                            loading={props.loading}
                            onPress={() => props.handleItemFinalPrice()}
                        />
                    </View>
                    </KeyboardAvoidingView>
                </View>
          
        </Modal>
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
        width: '88%',
       // height: '30%',
        minHeight: '30%',
        borderRadius: hp(10),
        overflow: 'hidden',
        paddingHorizontal: vp(20),
        paddingVertical: vp(20),
    },
    inputTxt: {
        // marginBottom: hp(38)
    },
    viewmain: {
        flexDirection: 'row',
    },
    vone: {
        flex: .9,
        justifyContent: 'center',
    },
    vtwo: {
        flex: .1,
    },
    comment: {
        fontSize: fp(22),
        color: colors.black,
        fontFamily: Font.regular,
    },
    viewicon: {
        height: hp(30),
        width: hp(30),
        borderRadius: hp(20),
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        minHeight: vp(60),
    },
    viewinput: {
        marginTop: vp(20)
    },
    buttonstyle: {
        backgroundColor: colors.primary,
    },
    button: {
        // marginTop: vp(10),
    },
});

export default AddPriceModal;
