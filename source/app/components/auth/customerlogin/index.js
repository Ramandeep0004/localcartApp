import React, { useState } from 'react';
import styles from './style';
import { Button, Text, Input } from '@rneui/themed';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import {
    KeyboardAvoidingView,
    Linking,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { base } from '../../../assets/global_style/base';
import { Dimension } from '../../../assets/global_style/dimension';
import { View } from 'react-native';
import { colors } from '../../../assets/global_style/colors';
import Validation from '../../../components/Helper/Validations';
import { Toaster } from '../../Helper/Toaster';
import LogoHeaderCom from '../component/logoheader';
import { StatusBar } from 'react-native';
import authController from '../../../../apis/Controller/auth.controller'
import Loader from '../../Helper/loader';
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import Constant from '../../../../apis/constant';
import { useTranslation } from 'react-i18next';

const Loginmain = props => {
    const STATUSBAR_HEIGHT = StatusBar.currentHeight;
    let { t } = useTranslation();
    const [eye, setEye] = useState(true);
    const [loader, setLoader] = useState(false);

    const defaultValues = {
        phoneNumber: '',
        password: '',
    };
    const [values, setValues] = useState(defaultValues);

    const [error, setError] = useState({
        phoneNumber: {
            rules: ['phoneNumberRequired'],
            isValid: true,
            message: '',
        },
        password: {
            rules: ['passwordRequired'],
            isValid: true,
            message: '',
        },
    });
    let Validations = new Validation(error);

    const isFocus = useIsFocused();
    useEffect(() => {
        setEye(true);
        setValues(defaultValues)
        setError({
            phoneNumber: {
                rules: ["phoneNumberRequired"],
                isValid: true,
                message: "",
            },
            password: {
                rules: ["passwordRequired"],
                isValid: true,
                message: "",
            },
        });
    }, [isFocus])

    const handleStates = (name, value) => {
        let check = Validations.validateField(name, value);
        setError({ ...error, [name]: check });
        setValues({ ...values, [name]: value });
    };

    const handleLogin = async () => {
        let validtn = new Validation(error);
        let isValid = await validtn.isFormValid(values);

        if (isValid && !isValid.haveError) {
            setLoader(true)
            let response = await authController.login(values)
            if (response && response.status) {
                if (response.user.user_type === 'shopkeeper') {
                    if (response.user.mobile_verification === null || parseInt(response.user.mobile_verification) === 0) {
                        new Toaster().success(response.message);
                        props.navigation.navigate('customeremailverification', { verifiedAtNullDetail: response });
                        setValues(defaultValues);
                    }
                    else if (response.user) {
                        if (response.user.shop === null) {
                            new Toaster().success(response.message);
                            props.navigation.navigate('shopkeeperregistration');
                            setValues(defaultValues);
                        }
                        else {
                            new Toaster().success(response.message);
                            props.navigation.reset({
                                index: 0,
                                routes: [{ name: 'shophomescreen' }]
                            })
                            setValues(defaultValues);
                        }
                    }
                }
                else if ((response.user.user_type === 'customer')) {
                    if (response.user.mobile_verification === null || parseInt(response.user.mobile_verification) === 0) {
                        new Toaster().success(response.message);
                        props.navigation.navigate('customeremailverification', { verifiedAtNullDetailOnCustomer: response });
                        setValues(defaultValues);
                    }
                    else {
                        new Toaster().success(response.message);
                        props.navigation.reset({
                            index: 0,
                            routes: [{ name: 'customerhome' }]
                        })
                        setValues(defaultValues)
                    };
                }
            }
            setLoader(false)
        } else {
            setError({ ...isValid.errors });
        }
    };

    return (
        <View style={[styles.main, { marginTop: STATUSBAR_HEIGHT }]}>
            <KeyboardAvoidingView behavior='height'>
                <ScrollView nestedScrollEnabled keyboardShouldPersistTaps='handled'>
                    <LogoHeaderCom />
                    <View style={[base.container, { flexGrow: 1 }]}>
                        <View style={base.row}>
                            <View style={base.col12}>
                                <View style={styles.titleMain}>
                                    <Text style={styles.title}>{t('loginScreen.Login')}</Text>
                                    <Text style={styles.subtitle}>
                                        {t('loginScreen.Welcome back!')}
                                    </Text>
                                </View>
                            </View>
                            <View style={base.col12}>
                                <View style={styles.inputMain1}>
                                    <Input
                                        selectionColor={colors.Secondary}
                                        keyboardType={'numeric'}
                                        autoCapitalize={false}
                                        autoCorrect={false}
                                        maxLength={10}
                                        value={values.phoneNumber}
                                        onChangeText={e => handleStates('phoneNumber', e)}
                                        errorMessage={
                                            error.phoneNumber && !error.phoneNumber.isValid
                                                ? error.phoneNumber.message
                                                : ''
                                        }
                                        placeholder={t('loginScreen.Mobile Number')}
                                        leftIcon={{
                                            type: IconsType.feather,
                                            name: Icons.phone,
                                            color: colors.gray,
                                            size: Dimension.semilarge,
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={base.col12}>
                                <View style={styles.inputMain2}>
                                    <Input
                                        selectionColor={colors.Secondary}
                                        value={values.password}
                                        secureTextEntry={eye ? true : false}
                                        onChangeText={e => handleStates('password', e)}
                                        errorMessage={
                                            error.password && !error.password.isValid
                                                ? error.password.message
                                                : ''
                                        }
                                        placeholder={t('loginScreen.Password')}
                                        leftIcon={{
                                            type: IconsType.feather,
                                            name: Icons.lock,
                                            color: colors.gray,
                                            size: Dimension.semilarge,
                                        }}
                                        rightIcon={{
                                            type: IconsType.ionIcon,
                                            name: eye ? Icons.mdeyeoffoutline : Icons.eyeFilled,
                                            size: Dimension.semilarge,
                                            color: colors.gray,
                                            onPress: () => setEye(!eye)
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={base.col12}>
                                <View style={styles.txtMain}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            props.navigation.navigate('customerforgotpassword')
                                        }>
                                        <Text style={styles.forgotTxt}>
                                            {t('loginScreen.Forgot Password')}?
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={base.col12}>
                                <View style={styles.buttonMain}>
                                    <Button
                                        buttonStyle={styles.button}
                                        title={t('loginScreen.Login')}
                                        onPress={() => handleLogin()}
                                    />
                                </View>
                            </View>
                            <View style={[base.col12, styles.descripMain]}>
                                <Text style={styles.registrationTxt}>
                                    {t('loginScreen.If you have issues with registration/login')}
                                </Text>
                                <TouchableOpacity onPress={() => Linking.openURL(Constant.contactUs)}>
                                    <Text style={styles.clickTxt}>{t('loginScreen.Click here')}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={base.col12}>
                                <View style={styles.ContainerMain}>
                                    {/* <TouchableOpacity  onPress={() => props.navigation.navigate('customerregister')}> */}
                                    <Text style={styles.newTxt}>{t('loginScreen.New here')}? <Text onPress={() => props.navigation.navigate('customerregister')} style={styles.signTxt}>{t('loginScreen.Sign Up')}</Text></Text>
                                    {/* </TouchableOpacity> */}
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <Loader loader={loader}></Loader>
        </View>
    );
};
export default Loginmain;
