import { Button, Image, Input, Text } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { base } from '../../../assets/global_style/base';
import { Images } from '../../../assets/global_style/images';
import OtpInputs from 'react-native-otp-inputs';
import { ButtonLabel } from '../../../assets/global_style/values/button';
import { homeLabel } from '../../../assets/global_style/values/home';
import styles from './style';
import LogoHeaderCom from '../component/logoheader';
import { StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Validation from '../../Helper/Validations';
import { Toaster } from '../../Helper/Toaster';
import authController from '../../../../apis/Controller/auth.controller'
import Loader from '../../Helper/loader';
import { KeyboardAvoidingView } from 'react-native';
import { t } from 'i18next';
const OtpVerification = props => {
    const STATUSBAR_HEIGHT = StatusBar.currentHeight;
    const { userToken } = props.route.params;

    const [verify, setVerify] = useState(false);
    let defaultValues = {
        otp: null,
    }
    const [values, setValues] = useState(defaultValues)
    const [loader, setLoader] = useState(false)
    const [show, setShow] = useState(false)
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
            let response = await authController.emailVerification(userToken, values.otp)
            if (response && response.status) {
                setValues({
                    ...values,
                    otp: null,
                });
                new Toaster().success(response.message);
                props.navigation.reset({
                    index: 1,
                    routes: [{ name: 'customerlogin' }, { name: 'customerchangepassword', params: { userToken: response.user.token } }]
                })
            }
            setLoader(false)
        }
        else {
            setError({ ...isValid.errors })
        }
    };

    const resendOtp = async () => {
        setLoader(true)
        let response = await authController.resendOtp(userToken);
        if (response && response.status) {
            new Toaster().success(response.message);
            // new Toaster().success(response.otp);
        }
        setLoader(false)
    };

    return (
        <View style={[styles.main, { marginTop: STATUSBAR_HEIGHT }]}>
            <KeyboardAvoidingView behavior={'padding'}>
                <LogoHeaderCom />
                <View style={base.container}>
                    <View style={base.row}>

                        <View style={base.col12}>
                            <View style={styles.headingMain}>
                                <Text style={styles.heading}>{t("emailVerification.OTP")}</Text>
                                <Text style={styles.heading}>{t("emailVerification.verification")}</Text>
                            </View>
                        </View>
                        <View style={base.col12}>
                            <View style={styles.subheadingMain}>
                                <Text style={styles.subHeading}>
                                    {t('emailVerification.We have sent you an otp on your registered phone number. Please check.')}
                                </Text>
                            </View>
                        </View>
                        <View style={base.col12}>
                            <View style={styles.cirnumContainer}>
                                <OtpInputs
                                    inputStyles={styles.pin}
                                    inputContainerStyles={styles.InputContainer1}
                                    numberOfInputs={4}
                                    textInputStyle={styles.pin}
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
                                    title={t('emailVerification.Submit')}
                                    onPress={() => onSubmit()}
                                />
                            </View>
                        </View>
                        <View style={base.col12}>
                            <View style={styles.txtMain}>
                                <Text style={styles.backTo}>
                                    {t('emailVerification.Back to')}<Text onPress={() => props.navigation.navigate('customerlogin')} style={styles.login}> {t("emailVerification.Login")}</Text>
                                </Text>
                            </View>
                        </View>

                    </View>
                </View>
            </KeyboardAvoidingView>
            <Loader loader={loader}></Loader>
        </View>
    );
};
export default OtpVerification;
