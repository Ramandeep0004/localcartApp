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
import Validation from '../../Helper/Validations';
import LogoHeaderCom from '../component/logoheader';
import authController from '../../../../apis/Controller/auth.controller'
import styles from './style';
import { Toaster } from '../../Helper/Toaster';
import Loader from '../../Helper/loader';
import { KeyboardAvoidingView } from 'react-native';
import { t } from 'i18next';

const ChangePassword = props => {
  const STATUSBAR_HEIGHT = StatusBar.currentHeight;

  let { userToken } = props.route.params
  const [eye, setEye] = useState(true);
  const [eye2, setEye2] = useState(true);
  const [loader, setLoader] = useState(false);

  const defaultValues = {
    newPassword: '',
    confirmPassword: '',
  };
  const [inputData, setInputData] = useState(defaultValues);
  const [error, setError] = useState({
    newPassword: {
      rules: ["required", "password"],
      isValid: true,
      message: "",
    },
    confirmPassword: {
      rules: ["required", "password"],
      isValid: true,
      message: "",
    },
  });
  let Validations = new Validation(error)


  const handleChange = (name, value) => {
    let check = Validations.validateField(name, value)
    setError({ ...error, [name]: check })
    setInputData({ ...inputData, [name]: value })
  };


  const handleResetPassword = async () => {
    let token = userToken ? userToken : ''
    let err = { ...error }
    let validitn = new Validation(err)
    let isValid = await validitn.isFormValid(inputData)

    if (isValid && !isValid.haveError) {
      if (inputData.newPassword !== inputData.confirmPassword) {
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
        let response = await authController.recoverPassword(token, inputData)
        if (response && response.status) {
          new Toaster().success(response.message)
          props.navigation.navigate('customerlogin')
          setInputData(defaultValues)
        }
        setLoader(false)
      }
    }
    else {
      setError({ ...isValid.errors })
    }
  };

  return (
    <View style={[styles.main, { marginTop: STATUSBAR_HEIGHT }]}>
      <KeyboardAvoidingView behavior='position'>
        <LogoHeaderCom />
        <View style={base.container}>
          <View style={base.row}>
            <View style={base.col12}>
              <View style={styles.headingMain}>
                <Text style={styles.heading}>
                  {t('resetPass.Reset password')}
                </Text>
              </View>
            </View>
            <View style={base.col12}>
              <View style={styles.subheadingMain}>
                <Text style={styles.subHeading}>
                  {
                   t('resetPass.Verification is successfully done. Now you can create new password.')
                  }
                </Text>
              </View>
            </View>
            <View style={base.col12}>
              <View style={styles.inputMain}>
                <Input
                  selectionColor={colors.Secondary}
                  secureTextEntry={eye ? true : false}
                  errorStyle={styles.error}
                  placeholder={ t('resetPass.New Password')}
                  onChangeText={(value) => handleChange('newPassword', value)}
                  errorMessage={!error.newPassword.isValid ? error.newPassword.message : ''}
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
              <Input
                selectionColor={colors.Secondary}
                secureTextEntry={eye2 ? true : false}
                errorStyle={styles.error}
                placeholder={t('resetPass.Confirm Password')}
                onChangeText={(value) => handleChange('confirmPassword', value)}
                errorMessage={!error.confirmPassword.isValid ? error.confirmPassword.message : ''}
                leftIcon={{
                  type: IconsType.feather,
                  name: Icons.lock,
                  color: colors.gray,
                  size: Dimension.semilarge,
                }}
                rightIcon={{
                  type: IconsType.ionIcon,
                  name: eye2 ? Icons.mdeyeoffoutline : Icons.eyeFilled,
                  size: Dimension.semilarge,
                  color: colors.gray,
                  onPress: () => setEye2(!eye2)
                }}
              />
            </View>

            <View style={base.col12}>
              <View style={styles.btnMain}>
                <Button
                  buttonStyle={styles.button}
                  title={t('button.Submit')}
                  onPress={() => handleResetPassword()}
                />
              </View>
            </View>
            <View style={base.col12}>
              <View style={styles.txtMain}>
                {/* <TouchableOpacity
                onPress={() => props.navigation.navigate('customerlogin')}> */}
                <Text style={styles.backTo}>
                  {t('resetPass.Back to')}
                  <Text onPress={() => props.navigation.navigate('customerlogin')} style={styles.login}>
                    {' '}
                    {t("resetPass.Login")}
                  </Text>
                </Text>
                {/* </TouchableOpacity> */}
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      <Loader loader={loader}></Loader>
    </View>
  );
};
export default ChangePassword;
