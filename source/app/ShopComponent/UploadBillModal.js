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
import ImagePickerModal from '../components/Helper/imagePicker';
import Validation from '../components/Helper/Validations';
import OrderController from '../../apis/Controller/order.controller';
import { t } from 'i18next';

const UploadBill = props => {
    const { orderId ,orderDetails} = props;

    const [loader, setLoader] = useState(false);
    const [imagePicker, setImagePicker] = useState(false);
    const [media, setMedia] = useState(false);
    let defaultValues = {
        orderBill: null,
        transactionSlip: null,
    }
    const [values, setValues] = useState(defaultValues)

    const [isError, setError] = useState({
        orderBill: {
            rules: [],
            isValid: true,
            message: "",
        },
        transactionSlip: {
            rules: [],
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

    const handleMedia = item => {
        setMedia(item);
        setImagePicker(true);
    };

    const handleImage = item => {
        if (media === 'order') {
            handleChange('orderBill', item);
        } else if (media === 'tranaction') {
            handleChange('transactionSlip', item);
        }
    };

    const submit = async () => {
        let value = {
            ...values,
            orderId: orderId,
        }
        setLoader(false);
        let response = await OrderController.addOrderSlips(value);
        if (response && response.status) {
            setLoader(false);
            props.close();
            props.getOrderDetails();

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
                                <Text style={styles.select}>{t("uploadBillModal.Upload Bill Receipt")}</Text>
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
                    <View style={styles.viewprint}>
                        <Text style={styles.print}>{t("uploadBillModal.Printed Bill")}</Text>
                    </View>
                    {/* Image Upload */}
                    {values.orderBill ?
                        <TouchableOpacity onPress={() => setImagePicker(true)}>
                            <UploadedImage
                                image={values.orderBill}
                                action={() => setValues({
                                    ...values,
                                    orderBill: null
                                })}
                            />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => handleMedia('order')}>
                            <View style={styles.submain}>
                                <Icon type={IconsType.antDesign} name={Icons.upload} size={Dimension.docicon} color={colors.black} />
                                <Text style={styles.upload}>{t("uploadBillModal.Upload Image")}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    { orderDetails.payment_method === "online"?<>
                        <View style={styles.viewtrans}>
                            <Text style={styles.print} >{t("uploadBillModal.Transaction Slip")}</Text>
                        </View>
                        {values.transactionSlip ?
                            <TouchableOpacity onPress={() => setImagePicker(true)}>
                                <UploadedImage
                                    action={() => setValues({
                                        ...values,
                                        transactionSlip: null
                                    })}
                                    image={values.transactionSlip} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => handleMedia('tranaction')}>
                                <View style={styles.submain}>
                                    <Icon type={IconsType.antDesign} name={Icons.upload} size={Dimension.docicon} color={colors.black} />
                                    <Text style={styles.upload}>{t("uploadBillModal.Upload Image")}</Text>
                                </View>
                            </TouchableOpacity>
                        }
                    </>: null}

                    <View style={styles.button}>
                        <Button
                            title={t('uploadBillModal.Submit')}
                            buttonStyle={styles.buttonstyle}
                            loadingProps={{
                                color: 'black',
                            }}
                            onPress={() => submit()} />
                    </View>
                </View>
            </Modal>
            <ImagePickerModal
                show={imagePicker}
                close={() => setImagePicker(false)}
                type={'upload_slip'}
                response={path => {
                    handleImage(path)
                }}
            />
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
    vone: {
        flex: .89,
        justifyContent: 'center'
    },
    vtwo: {
        flex: .11,
    },
    main: {
        alignItems: 'center',
    },
    print: {
        fontSize: fp(16),
        color: colors.black,
        fontFamily: Font.regular,
    },
    viewprint: {
        marginTop: vp(30),
    },
    submain: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.inputbordercol,
        backgroundColor: colors.offgrey,
        borderRadius: hp(30),
        height: hp(50),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: vp(15),
    },
    upload: {
        fontSize: fp(16),
        color: colors.black,
        fontFamily: Font.regular,
        paddingLeft: vp(10),
    },
    viewtrans: {
        marginTop: vp(20),
    },
    buttonstyle: {
        backgroundColor: colors.primary,
    },
    button: {
        marginTop: vp(30),
    },
});

export default UploadBill;
