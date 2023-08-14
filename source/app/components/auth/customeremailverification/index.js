import React from 'react';
import { Input } from '@rneui/base';
import { Button, Text } from '@rneui/themed';
import { useState } from 'react';
import { ImageBackground, Platform, ScrollView, View } from 'react-native';
import { base } from '../../../assets/global_style/base';
import { Images } from '../../../assets/global_style/images';
import { ButtonLabel } from '../../../assets/global_style/values/button';
import { homeLabel } from '../../../assets/global_style/values/home';
import Validation from '../../Helper/Validations';
import OtpInputs from 'react-native-otp-inputs';
import styles from './style';
import { Toaster } from '../../Helper/Toaster';
import Loader from '../../Helper/loader';
import LogoHeaderCom from '../component/logoheader';
import ImageHeaderCom from '../component/imageheader';
import VerificationPopup from '../../Helper/modal';
import { StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import { LogBox } from 'react-native';
import authController from '../../../../apis/Controller/auth.controller'
import { KeyboardAvoidingView } from 'react-native';
import { t } from 'i18next';


const EmailVerification = (props) => {
    const STATUSBAR_HEIGHT = StatusBar.currentHeight;
    let navigationParams = props && props.route && props.route.params;
    let userToken = navigationParams && navigationParams.userToken ? navigationParams.userToken : null
    let shopkeeperToken = navigationParams && navigationParams.shopkeeperToken ? navigationParams.shopkeeperToken : null
    let verifiedAtNullDetail = navigationParams && navigationParams.verifiedAtNullDetail ? navigationParams.verifiedAtNullDetail : null
    let verifiedAtNullDetailOnCustomer = navigationParams && navigationParams.verifiedAtNullDetailOnCustomer ? navigationParams.verifiedAtNullDetailOnCustomer : null



    const [verify, setVerify] = useState(false);
    let defaultValues = {
        otp: null,
    };
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
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        setValues(defaultValues);
        if (navigationParams && navigationParams.verifiedAtNullDetail) {
            resendOtp(true);
        }
        if (navigationParams && navigationParams.verifiedAtNullDetailOnCustomer) {
            resendOtp(true);
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
            let token = userToken ? userToken : shopkeeperToken
            if (navigationParams && navigationParams.verifiedAtNullDetail) {
                setLoader(true)
                let response = await authController.emailVerification(verifiedAtNullDetail.token, values.otp);
                if (response && response.status) {
                    setVerify(true);
                    setValues(defaultValues);
                }
                setLoader(false)
            }
            else if (navigationParams && navigationParams.verifiedAtNullDetailOnCustomer) {
                setLoader(true)
                let response = await authController.emailVerification(verifiedAtNullDetailOnCustomer.token, values.otp);
                if (response && response.status) {
                    setVerify(true);
                    setValues(defaultValues);
                }
                setLoader(false)
            }
            else {
                setLoader(true)
                let response = await authController.emailVerification(token, values.otp)
                if (response && response.status) {
                    setVerify(true);
                    setValues(defaultValues);
                }
                setLoader(false)
            }
        }
        else {
            setError({ ...isValid.errors })
        }
    };


    const resendOtp = async (toast) => {
        let token = userToken ? userToken : shopkeeperToken
        if (navigationParams && navigationParams.verifiedAtNullDetail) {
            let response = await authController.resendOtp(verifiedAtNullDetail.token)
            if (response && response.status) {
                if(toast){
                    return;
                }
                else{
                    new Toaster().success(response.message);
                }
              
                // new Toaster().success(response.otp);
            }
            else {
                new Toaster().error(response.message);
            }
        }
        else if (navigationParams && navigationParams.verifiedAtNullDetailOnCustomer) {
            let response = await authController.resendOtp(verifiedAtNullDetailOnCustomer.token)
            if (response && response.status) {
                if(toast){
                    return;
                }
                else{
                    new Toaster().success(response.message);
                }
                // new Toaster().success(response.otp);
            }
            else {
                new Toaster().error(response.message);
            }
        }
        else {
            let response = await authController.resendOtp(token)
            if (response && response.status) {
                new Toaster().success(response.message);
                // new Toaster().success(response.otp);
            }
            else {
                new Toaster().error(response.message);
            }
        }
    };

    const handleClick = () => {
        setVerify(false);
        if (userToken || verifiedAtNullDetailOnCustomer) {
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'customerhome' }]
            })
        }
        else if (shopkeeperToken || verifiedAtNullDetail) {
            props.navigation.reset({
                index: 1,
                routes: [{ name: 'customerlogin' }, { name: 'shopkeeperregistration' }]
            })
        }
    };

    return (
        <View style={[styles.main, { marginTop: STATUSBAR_HEIGHT }]}>
            <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ?  'padding': null}>
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                <LogoHeaderCom />
                {/* <ImageHeaderCom
                title={homeLabel.customersignup.Verifyyouremail}
            /> */}
                <View style={base.container}>
                    <View style={base.row}>
                        <View style={base.col12}>
                            <View style={styles.headingMain}>
                                <Text style={styles.heading}>{t('emailVerification.Verify your phone number')}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={base.col12}>
                        <View style={styles.subheadingMain}>
                            <Text style={styles.subHeading}>
                                {t('emailVerification.OTP has been sent on your phone number.')}
                            </Text>
                        </View>
                    </View>
                    <View style={base.col12}>
                        <View style={styles.cirnumContainer}>
                            <OtpInputs
                                inputStyles={styles.pin}
                                inputContainerStyles={styles.InputContainer}
                                numberOfInputs={4}
                                textInputStyle={styles.pin}
                                defaultValue={values.otp}
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
                        <View style={styles.buttonMain}>
                            <Button
                                buttonStyle={styles.button}
                                title={t('emailVerification.Verify')}
                                onPress={() => onSubmit()}
                            />
                        </View>
                    </View>
                </View>
                </ScrollView>

                {
                    verify ?
                        <VerificationPopup
                            navigation={props.navigation}
                            open={verify}
                            close={() => setVerify(false)}
                            onConfirm={handleClick}
                        /> :
                        null}
              
                <Loader loader={loader}></Loader>
            </KeyboardAvoidingView>
        </View>
    );
};
export default EmailVerification;
