import { useIsFocused } from '@react-navigation/native';
import { Button, Icon, Input } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import authController from '../../../../apis/Controller/auth.controller';
import { base } from '../../../assets/global_style/base';
import { colors } from '../../../assets/global_style/colors';
import { Dimension } from '../../../assets/global_style/dimension';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import { Toaster } from '../../Helper/Toaster';
import Validation from '../../Helper/Validations';
import { styles } from './style';

const ShopChangePassword = (props) => {
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
            rules: ["required", "passeord"],
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
                        'Confirm password should be same as given password',
                };
                setError({ ...error, confirmPassword: err });
            }
            else {
                setLoader(true)
                let response = await authController.changePassword(values)
                if (response && response.status) {
                    new Toaster().success(response.message);
                    props.navigation.navigate('myprofileshop')
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
                <View style={styles.viewinput}>
                    <Input placeholder='Old password'
                        selectionColor={colors.Secondary}
                        value={values.oldPassword}
                        secureTextEntry={eye ? true : false}
                        onChangeText={(e) => handleStates('oldPassword', e)}
                        errorMessage={!error.oldPassword.isValid ? error.oldPassword.message : ''}
                        leftIcon={<Icon type={IconsType.feather}
                            name={Icons.lock}
                            size={Dimension.smallicon}
                            color={colors.lightgrey}
                        />
                        }
                        rightIcon={<Icon type={IconsType.ionIcon}
                            name={eye ? Icons.mdeyeoffoutline : Icons.eyeFilled}
                            size={Dimension.smallicon}
                            color={colors.lightgrey}
                            onPress={() => setEye(!eye)}
                        />} />
                    <Input placeholder='New password'
                        value={values.newPassword}
                        secureTextEntry={secure ? true : false}
                        onChangeText={(e) => handleStates('newPassword', e)}
                        errorMessage={!error.newPassword.isValid ? error.newPassword.message : ''}
                        leftIcon={<Icon type={IconsType.feather}
                            name={Icons.lock}
                            size={Dimension.smallicon}
                            color={colors.lightgrey}
                        />}
                        rightIcon={<Icon type={IconsType.ionIcon}
                            name={secure ? Icons.mdeyeoffoutline : Icons.eyeFilled}
                            size={Dimension.smallicon}
                            color={colors.lightgrey}
                            onPress={() => setSecure(!secure)}
                        />} />
                    <Input placeholder='Confirm Password'
                        value={values.confirmPassword}
                        secureTextEntry={eye3 ? true : false}
                        onChangeText={(e) => handleStates('confirmPassword', e)}
                        errorMessage={!error.confirmPassword.isValid ? error.confirmPassword.message : ''}
                        leftIcon={<Icon type={IconsType.feather}
                            name={Icons.lock}
                            size={Dimension.smallicon}
                            color={colors.lightgrey}
                        />}
                        rightIcon={<Icon type={IconsType.ionIcon}
                            name={eye3 ? Icons.mdeyeoffoutline : Icons.eyeFilled}
                            size={Dimension.smallicon}
                            color={colors.lightgrey}
                            onPress={() => setEye3(!eye3)}
                        />}
                    />
                </View>
            </View>
            <View style={styles.viewbutton}>
                <Button title={'Change'}
                    buttonStyle={styles.buttonstyle}
                    onPress={() => submitData()}
                />
            </View>
        </View>
    )
};
export default ShopChangePassword;