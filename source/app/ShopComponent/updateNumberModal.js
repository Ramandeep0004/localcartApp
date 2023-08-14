import { Button, Icon, Text } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import OtpInputs from 'react-native-otp-inputs';
import { useIsFocused } from '@react-navigation/native';
import { KeyboardAvoidingView } from 'react-native';
import { t } from 'i18next';
import customerAuthController from '../../apis/Controller/auth.controller';
import { fp, hp, hzp, wp } from '../assets/global_style/fontsize';
import { colors } from '../assets/global_style/colors';
import { Font } from '../assets/global_style/fontfamily';
import Validation from '../components/Helper/Validations';
import { Toaster } from '../components/Helper/Toaster';
import { base } from '../assets/global_style/base';
import { StyleSheet } from 'react-native';
import { Icons, IconsType } from '../assets/global_style/icon';
import { Dimension } from '../assets/global_style/dimension';

const UpdateNumberModal = props => {
    let updateNumberData = props && props.detail
    let defaultValues = {
        otp: null,
    }
    const [values, setValues] = useState(defaultValues)
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState({
        otp: {
            rules: ['required'],
            isValid: true,
            message: '',
        },
    });

    const isFocus = useIsFocused();
    useEffect(() => {
        if (isFocus) {
            setValues({
                ...values,
                otp: null,
            })
        }
    }, [isFocus]);

    let validations = new Validation(error);

    const handleChange = (name, value) => {
        let check = validations.validateField(name, value)
        setError({ ...error, [name]: check })
        setValues({ ...values, [name]: value ? value : null })
    };

    const onSubmit = async () => {
        let validtn = new Validation(error)
        let isValid = await validtn.isFormValid(values)

        if (isValid && !isValid.haveError) {
            setLoader(true)
            if (updateNumberData) {
                let data = {
                    number: updateNumberData ? updateNumberData.number : '',
                    otp: values && values.otp ? values.otp : ''
                }
                let response = await customerAuthController.updateNumber(data);
                if (response && response.status) {
                    if (updateNumberData.userType === "shopkeeper") {
                        props.navigation.navigate('editprofile');
                    }
                    else {
                        props.navigation.navigate('customereditprofile');
                    }
                    setValues({
                        ...values,
                        otp: null,
                    });
                    new Toaster().success(response.message);
                    props.close();
                }
                setLoader(false);
            }
            else {
                setLoader(false);
            }
        }
        else {
            setError({ ...isValid.errors })
        }
    };

    const resendOtp = async () => {
        if (updateNumberData) {
            setLoader(true);
            let response = await customerAuthController.sentOtpOnUpdateNumber();
            if (response && response.status) {
                new Toaster().success(response.message);
                setLoader(false);
            } else {
                setLoader(false);
            }
        }
        else return;
    };

    return (
        <View style={styles.main}>
            <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
                <View style={[base.container,{flex:1}]}>
                    <View style={styles.otptextmain}>
                        <View style={base.col10}>
                            <Text style={styles.heading}>{t("emailVerification.OTP")}</Text>
                        </View>
                        <View style={[base.col2, { alignItems: 'flex-end' }]}>
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
                    <View style={base.col12}>
                        <Text style={styles.heading}>{t("emailVerification.verification")}</Text>
                    </View>
                    <View style={base.col12}>
                        <View style={styles.subheadingMain}>
                            <Text style={styles.subHeading}>
                                {updateNumberData && updateNumberData.message ? updateNumberData.message : null}
                            </Text>
                        </View>
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems:"center"}}>
                        <View style={styles.cirnumContainer}>
                            <OtpInputs
                                inputStyles={styles.pin}
                                inputContainerStyles={styles.InputContainer1}
                                numberOfInputs={4}
                                // textInputStyle={styles.pin}
                                // defaultValue={values.otp}
                                handleChange={(e) => handleChange('otp', e)}
                            />
                        </View>
                        <View style={styles.errorcenter}>
                            {!error.otp.isValid ? (
                                <Text style={styles.errorStyle}>
                                    {error.otp.message}
                                </Text>
                            ) : (
                                <View style={styles.space} />
                            )}
                        </View>
                    </View>
                    <View style={base.col12}>
                        <View style={styles.descriptionMain}>
                            <Text style={styles.subHeading}>{t('emailVerification.Didn’t receive OTP?')}
                            </Text>
                            <TouchableOpacity onPress={() => resendOtp()}>
                                <Text style={styles.resendTxt}> {t('emailVerification.Resend OTP')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={base.col12}>
                        <View style={styles.btnMain}>
                            <Button
                                buttonStyle={styles.button}
                                loading={loader}
                                title={t('emailVerification.Submit')}
                                onPress={() => onSubmit()}
                            />
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: colors.white,
        maxHeight: hp(550),
        borderRadius: hp(30),
        paddingVertical: hp(15),
        paddingHorizontal: hp(5)
    },
    otptextmain: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    vtwo: {
        justifyContent: 'flex-end'
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
    pin: {
        fontSize: fp(26),
        fontFamily: Font.regular,
        alignSelf: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: colors.black,
    },
    InputContainer1: {

        height: fp(60),
        width: fp(60),
        marginHorizontal: hzp(2),
        fontSize: fp(50),
        borderRadius: wp(30),
        backgroundColor: colors.lightpink,
        borderWidth: wp(1),
        borderColor: colors.buttonborder,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        textAlign: 'center',
        // marginRight: wp(14),
        // marginLeft:wp(14)

    },
    InputContainer2: {

        height: fp(60),
        width: fp(60),
        paddingHorizontal: hzp(0),
        fontSize: fp(50),
        borderRadius: wp(30),
        borderWidth: wp(1),
        borderColor: colors.buttonborder,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        textAlign: 'center',
        // marginRight: wp(14),
        // marginLeft:wp(14)

    },
    imageMain: {
        height: "100%",
        width: "100%",
    },
    heading: {
        fontSize: fp(48),
        fontFamily: Font.semiBold,
        color: colors.Secondary,
    },
    headingMain: {
        marginTop: hp(10),
        // width: '80%',
    },
    subheadingMain: {
        marginTop: hp(16),
    },
    subHeading: {
        fontSize: fp(18),
        fontFamily: Font.regular,
        color: colors.lightgrey,
        lineHeight: hp(25),
    },
    inputContainer: {
        borderColor: colors.inputbordercol,
        borderRadius: hp(40),
        borderWidth: hp(1),
    },
    inputMain: {
        marginTop: hp(42)
    },
    button: {
        backgroundColor: colors.primary
    },
    btnMain: {
        marginTop: hp(20)
    },
    imgcontainer: {
        height: hp(100),
        width: wp(180),
    },
    logoMain: {
        marginTop: hp(60),
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: "100%",
        width: "100%",
    },
    txtMain: {
        marginTop: hp(82),
        alignItems: 'center',
        justifyContent: 'center'
    },
    backTo: {
        fontSize: fp(18),
        fontFamily: Font.regular,
        color: colors.black,
    },
    login: {
        fontSize: fp(18),
        fontFamily: Font.regular,
        color: colors.Secondary,
    },
    cirnumContainer: {
        // marginHorizontal: hzp(50),
        // marginTop: hp(42),
        alignItems: 'center',
        justifyContent: 'center',
        // flexDirection: 'row',
    },
    cirMain: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: hzp(8),
        height: hp(70),
        width: hp(70),
        borderRadius: hp(35),
        backgroundColor: colors.lightpink,
    },
    cirMain2: {
        marginHorizontal: hzp(8),
        borderWidth: hp(1),
        borderColor: colors.inputbordercol,
        height: hp(70),
        width: hp(70),
        borderRadius: hp(35),
    },
    num: {
        fontSize: fp(26),
        fontFamily: Font.regular,
        color: colors.darkblack,
    },
    descriptionMain: {
        marginTop: hp(32),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    subHeading: {
        fontSize: fp(18),
        fontFamily: Font.regular,
        color: colors.lightgrey,
    },
    resendTxt: {
        fontSize: fp(18),
        fontFamily: Font.regular,
        color: colors.Secondary,
    },
    button: {
        backgroundColor: colors.primary,
    },
    btnMain: {
        marginTop: hp(42)
    },
    errorStyle: {
        color: colors.red,
        marginHorizontal: fp(60),
        // marginTop: hp(5),
        fontFamily: Font.regular,
        fontSize: fp(15),
    },

});

export default UpdateNumberModal;
