import { Button, Input } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { styles } from './style';

import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import authController from '../../../../apis/Controller/auth.controller';
import { base } from '../../../assets/global_style/base';
import { colors } from '../../../assets/global_style/colors';
import { Dimension } from '../../../assets/global_style/dimension';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import Loader from '../../Helper/loader';
import { Toaster } from '../../Helper/Toaster';
import Validation from '../../Helper/Validations';
import { t } from 'i18next';

const CustomerChangePassword = props => {
    const [loader, setLoader] = useState(false);
    const [eye, setEye] = useState(true);
    const [secure, setSecure] = useState(true);
    const [eye3, setEye3] = useState(true);

    let defaultValues = {
        oldPassword: null,
        newPassword: null,
        confirmPassword: null,
    };
    const [values, setValues] = useState(defaultValues);
    const [error, setError] = useState({
        oldPassword: {
            rules: ["required", 'password'],
            isValid: true,
            message: "",
        },
        newPassword: {
            rules: ["required", 'password'],
            isValid: true,
            message: "",
        },
        confirmPassword: {
            rules: ["required"],
            isValid: true,
            message: "",
        },
    })

    let isFocus = useIsFocused();
    useEffect(() => {
        setValues(defaultValues)
    }, [isFocus]);

    let Validations = new Validation(error);

    const handleStates = (name, value) => {
        let check = Validations.validateField(name, value)
        setError({ ...error, [name]: check })
        setValues({ ...values, [name]: value })
    };

    const submitData = async () => {
        let err = { ...error }
        let validtn = new Validation(err)
        let isValid = await validtn.isFormValid(values);

        if (isValid && !isValid.haveError) {
            if (values.newPassword !== values.confirmPassword) {
                let err = {
                    ...error.confirmPassword,
                    isValid: false,
                    message:
                        t('changePassword.Confirm password does not match'),
                };
                setError({ ...error, confirmPassword: err });
            }
            else {
                setLoader(true)
                let response = await authController.changePassword(values)
                if (response && response.status) {
                    new Toaster().success(response.message);
                    props.navigation.navigate('customermyprofile')
                    setValues(defaultValues)
                }
                setLoader(false)
            }
        } else {
            setError({ ...isValid.errors })
        }
    };

    return (
        <View style={styles.main}>
            <View style={base.container}>
                <View style={base.row}>
                    <View style={base.col12}>
                        <View style={styles.inputMain}>
                            <View style={base.col12}>
                                <Input
                                    selectionColor={colors.Secondary}
                                    secureTextEntry={eye ? true : false}
                                    errorStyle={styles.error}
                                    placeholder={t("changePassword.Old password")}
                                    value={values.oldPassword}
                                    onChangeText={(e) => handleStates('oldPassword', e)}
                                    errorMessage={!error.oldPassword.isValid ? error.oldPassword.message : ''}
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
                            <View style={base.col12}>
                                <Input
                                    selectionColor={colors.Secondary}
                                    secureTextEntry={secure ? true : false}
                                    errorStyle={styles.error}
                                    placeholder={t("changePassword.New password")}
                                    value={values.newPassword}
                                    onChangeText={(e) => handleStates('newPassword', e)}
                                    errorMessage={!error.newPassword.isValid ? error.newPassword.message : ''}
                                    leftIcon={{
                                        type: IconsType.feather,
                                        name: Icons.lock,
                                        color: colors.gray,
                                        size: Dimension.semilarge,
                                    }}
                                    rightIcon={{
                                        type: IconsType.ionIcon,
                                        name: secure ? Icons.mdeyeoffoutline : Icons.eyeFilled,
                                        size: Dimension.semilarge,
                                        color: colors.gray,
                                        onPress: () => setSecure(!secure)
                                    }}
                                />
                            </View>
                            <View style={base.col12}>
                                <Input
                                    selectionColor={colors.Secondary}
                                    secureTextEntry={eye3 ? true : false}
                                    errorStyle={styles.error}
                                    placeholder={t("changePassword.Confirm password")}
                                    value={values.confirmPassword}
                                    onChangeText={(e) => handleStates('confirmPassword', e)}
                                    errorMessage={!error.confirmPassword.isValid ? error.confirmPassword.message : ''}
                                    leftIcon={{
                                        type: IconsType.feather,
                                        name: Icons.lock,
                                        color: colors.gray,
                                        size: Dimension.semilarge,
                                    }}
                                    rightIcon={{
                                        type: IconsType.ionIcon,
                                        name: eye3 ? Icons.mdeyeoffoutline : Icons.eyeFilled,
                                        size: Dimension.semilarge,
                                        color: colors.gray,
                                        onPress: () => setEye3(!eye3)
                                    }}
                                />
                            </View>
                        </View>
                    </View>

                </View>
                <View style={base.col12}>
                    <View style={styles.buttonMain}>
                        <Button
                            buttonStyle={styles.button}
                            title={t('changePassword.Change')}
                            onPress={() => submitData()}
                        />
                    </View>
                </View>
            </View>
            <Loader loader={loader}></Loader>
        </View>
    );
};
export default CustomerChangePassword;
