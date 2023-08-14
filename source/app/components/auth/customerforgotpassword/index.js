import { Button, Image, Input, Text } from '@rneui/themed';
import React from 'react';
import { useState } from 'react';
import { StatusBar } from 'react-native';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { base } from '../../../assets/global_style/base';
import { colors } from '../../../assets/global_style/colors';
import { Dimension } from '../../../assets/global_style/dimension';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import { Images } from '../../../assets/global_style/images';
import { ButtonLabel } from '../../../assets/global_style/values/button';
import { homeLabel } from '../../../assets/global_style/values/home';
import Loader from '../../Helper/loader';
import { Toaster } from '../../Helper/Toaster';
import Validation from '../../Helper/Validations';
import LogoHeaderCom from '../component/logoheader';
import authController from '../../../../apis/Controller/auth.controller';

import styles from './style';
import { t } from 'i18next';

const ForgotPassword = props => {
    const STATUSBAR_HEIGHT = StatusBar.currentHeight;
    
    const [loader, setLoader] = useState(false);
    let defaultValues = {
        phoneNumber: null
    };
    const [number, setNumber] = useState(defaultValues);
    const [error, setError] = useState({
        phoneNumber: {
            rules: ["required", "number"],
            isValid: true,
            message: "",
        },
    });
    let Validations = new Validation(error);

    const getNumber = (name, value) => {
        let check = Validations.validateField(name, value)
        setError({ ...error, [name]: check })
        setNumber({ [name]: value })
    }

    const postNumber = async () => {
        let validtn = new Validation(error)
        let isValid = await validtn.isFormValid(number);

        if (isValid && !isValid.haveError) {
            setLoader(true)
            let response = await authController.forgetPasword(number)
            if (response && response.status) {
                new Toaster().success(response.message);
                // new Toaster().success(response.otp);
                props.navigation.navigate('customerotpverification' , { userToken : response.token} )
            }
            setLoader(false)
        }
        else {
            setError({ ...isValid.errors })
        }
    };



    return (
        <View style={[styles.main, { marginTop: STATUSBAR_HEIGHT }]}>
            <LogoHeaderCom />
            <View style={base.container}>
                <View style={base.row}>

                    <View style={base.col12}>
                        <View style={styles.headingMain}>
                            <Text style={styles.heading}>
                                {t('forgetPass.Forgot password')}
                            </Text>
                        </View>
                    </View>
                    <View style={base.col12}>
                        <View style={styles.subheadingMain}>
                            <Text style={styles.subHeading}>
                            {t('forgetPass.Enter your registered mobile number. You will receive an OTP')}
                            </Text>
                        </View>
                    </View>
                    <View style={base.col12}>
                        <View style={styles.inputMain}>
                            <Input
                                selectionColor={colors.Secondary}
                                keyboardType={'numeric'}
                                autoCapitalize={false}
                                autoCorrect={false}
                                maxLength={10}
                                onChangeText={(e) => getNumber( 'phoneNumber' , e)}
                                errorMessage={!error.phoneNumber.isValid ? error.phoneNumber.message : ''}
                                placeholder={t('forgetPass.Mobile Number')}
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
                        <View style={styles.btnMain}>
                            <Button
                                buttonStyle={styles.button}
                                title={t('forgetPass.Send OTP')}
                                onPress={() => postNumber() } 
                            />
                        </View>
                    </View>
                    <View style={base.col12}>
                        <View style={styles.txtMain}>
                            {/* <TouchableOpacity
                                onPress={() => props.navigation.navigate('customerlogin')}> */}
                                <Text style={styles.backTo}>
                                    {t('forgetPass.Back to')} <Text onPress={() => props.navigation.navigate('customerlogin')} style={styles.login}>{t("forgetPass.Login")}</Text>
                                </Text>
                            {/* </TouchableOpacity> */}
                        </View>

                    </View>
                </View>
            </View>
            <Loader loader={loader}></Loader>
        </View>
    );
};
export default ForgotPassword;
