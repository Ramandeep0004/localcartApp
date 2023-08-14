import React, { useEffect, useState } from 'react';

import styles from '../stepone/style';
import { Button, Image, Text, Input, Icon } from '@rneui/themed';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import { t } from 'i18next';
import { base } from '../../../../assets/global_style/base';
import { Images } from '../../../../assets/global_style/images';
import { Icons, IconsType } from '../../../../assets/global_style/icon';
import { colors } from '../../../../assets/global_style/colors';
import { Dimension } from '../../../../assets/global_style/dimension';
import { homeLabel } from '../../../../assets/global_style/values/home';
import { ButtonLabel } from '../../../../assets/global_style/values/button';
import SearchDropDown from '../../../Helper/dropdown';
import { StatusBar } from 'react-native';
import Validation from '../../../Helper/Validations';
import shopkeeperAuthController from '../../../../../apis/Controller/shopkeeper.auth.controller';
import LocationService from '../../../Helper/loaction';
import { Toaster } from '../../../Helper/Toaster';
import Loader from '../../../Helper/loader';
import ImagePickerModal from '../../../Helper/imagePicker';
import { renderImage, spaceAfter4Digit } from '../../../Helper/general';
import { useIsFocused } from '@react-navigation/native';
import referralController from '../../../../../apis/Controller/ReferralController/referral.controller';
import { isError } from 'lodash';

const PersonalDetail = props => {
  const STATUSBAR_HEIGHT = StatusBar.currentHeight;
  const [addressDetail, setAddressDetail] = useState();
  const [loader, setLoader] = useState(false);
  const [imagePicker, setImagePicker] = useState(false);
  const [imageType, setImageType] = useState('');
  const [eye, setEye] = useState(true);
  const [eye2, setEye2] = useState(true);
  let defaultValues = {
    image: null,
    firstName: null,
    lastName: null,
    phoneNumber: null,
    email: null,
    adhaarNumber: null,
    address: null,
    gender: null,
    password: null,
    confirmPassword: null,
    place: null,
    city: null,
    district: null,
    state: null,
    referalCode: null,
  }
  const [values, setValues] = useState(defaultValues)
  const [error, setError] = useState({
    image: {
      rules: [],
      isValid: true,
      message: "",
    },
    firstName: {
      rules: ["required", 'alphabetic'],
      isValid: true,
      message: "",
    },
    lastName: {
      rules: ["required", 'alphabetic'],
      isValid: true,
      message: "",
    },
    phoneNumber: {
      rules: ["required", 'numeric', 'min:10'],
      isValid: true,
      message: "",
    },
    address: {
      rules: ["required"],
      isValid: true,
      message: "",
    },
    email: {
      rules: ["required", 'email'],
      isValid: true,
      message: "",
    },
    adhaarNumber: {
      rules: [""],
      isValid: true,
      message: "",
    },
    gender: {
      rules: ["required"],
      isValid: true,
      message: "",
    },
    password: {
      rules: ["required", "password"],
      isValid: true,
      message: "",
    },
    confirmPassword: {
      rules: ["required"],
      isValid: true,
      message: "",
    },
    place: {
      rules: ["required"],
      isValid: true,
      message: "",
    },
    city: {
      rules: ['required'],
      isValid: true,
      message: "",
    },
    district: {
      rules: ['required'],
      isValid: true,
      message: "",
    },
    state: {
      rules: ['required'],
      isValid: true,
      message: "",
    },
    referalCode: {
      rules: [''],
      isValid: true,
      message: "",
    }
  })

  let Validations = new Validation(error)

  const isFocus = useIsFocused();
  useEffect(() => {
    getAddress()
  }, [isFocus]);

  const handleStates = (name, value) => {
    let check = Validations.validateField(name, value)
    setError({ ...error, [name]: check })
    setValues({ ...values, [name]: value })
  }


  const signUp = async () => {
    var err = { ...error }
    let validtn = new Validation(error)
    let isValid = await validtn.isFormValid(values)

    if (isValid && !isValid.haveError) {
   
      if (values.password !== values.confirmPassword) {
        let err = {
          ...error.confirmPassword,
          isValid: false,
          message:
            t('validations.Confirm password should be same as given password'),
        };
        setError({ ...error, confirmPassword: err });
      }
      else {
        if (values.referalCode) {
          let valid = await referralController.checkReferral(values.referalCode);
          if (valid.statusMessage === 'true') {
            setLoader(true)
            let response = await shopkeeperAuthController.signUp(values, addressDetail);
            if (response && response.status) {
              new Toaster().success(response.message);
             // new Toaster().success(response.user.otp);
              props.navigation.reset({
                index: 1,
                routes: [{ name: 'customerlogin' }, { name: 'customeremailverification', params: { shopkeeperToken: response.user.token } }]
              })
              setValues(defaultValues);
              setLoader(false);
            }
            else {
              setLoader(false)
            }
          }
          else {
            new Toaster().error(valid.message);
          }
        }
        else {
          setLoader(true)
          let response = await shopkeeperAuthController.signUp(values, addressDetail);
          if (response && response.status) {
            new Toaster().success(response.message);
        //   new Toaster().success(response.user.otp);
            props.navigation.reset({
              index: 1,
              routes: [{ name: 'customerlogin' }, { name: 'customeremailverification', params: { shopkeeperToken: response.user.token } }]
            })
          
            setValues(defaultValues);
            setLoader(false);
          }
          else {
            setLoader(false)
          }
        }
      }
    }
    else {
      setError({ ...isValid.errors })
    }
  };


  const getAddress = async () => {
    const grant = await new LocationService().checkLocation();
    if (grant == false) {
      await new LocationService().location();
    } else {
      await new LocationService().location();
    }
  }


  const getAddressDetail = async(item) => {
    setAddressDetail(item)
    if (item) {
      setValues({
        ...values,
        place: item.village_name,
        city: item.city_name,
        district: item.district_name,
        state: item.state_name,
      })
    }
    if(item && item.village_name){
      let errors = {
        ...error,
        place: {
          rules: ["required"],
          isValid: true,
          message: "",
        },
        city: {
          rules: ['required'],
          isValid: true,
          message: "",
        },
        district: {
          rules: ['required'],
          isValid: true,
          message: "",
        },
        state: {
          rules: ['required'],
          isValid: true,
          message: "",
        },
      }
      setError(errors);
    }
  };

  let gender = [
    {
      id: 1,
      name: t('shopKeeperSignUp.Male'),
      value : 'Male',
    },
    {
      id: 2,
      name: t('shopKeeperSignUp.Female'),
      value : 'Female',
    },
  ];

  return (
    <View style={[styles.main, { marginTop: STATUSBAR_HEIGHT }]}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.imageMain}
          source={Images.headerimage}
          resizeMode="stretch"
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps={'handled'}>
        <View style={base.container}>
          <View style={base.col12}>
            <View style={styles.headingMain}>
              <View style={styles.iconMain}>
                {/* <TouchableOpacity onPress={() => props.navigation.goBack()}>
                  <Icon
                    name={Icons.arrowleft}
                    type={IconsType.antDesign}
                    color={colors.primary}
                  />
                </TouchableOpacity> */}
              </View>
              <Text style={[styles.heading]}>
                {t('shopKeeperSignUp.Personal info')}
              </Text>
            </View>
          </View>
          <View style={base.col12}>
            <View style={styles.cirContainer}>
              <View style={styles.circlMain}>
                <Image
                  style={styles.userimageLogo}
                  source={values.image ? renderImage(values.image) : Images.user}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.cirContainer2}>
                <TouchableOpacity onPress={() => (
                  setImagePicker(true),
                  setImageType('users')
                )}>
                  <View style={styles.circleMain2}>
                    <Icon
                      name={Icons.camera}
                      type={IconsType.simpleLineIcon}
                      color={colors.white}
                      size={Dimension.semilarge}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.inputMain}>
            <View style={base.col12}>
              <View style={base.row}>
                <View style={base.col6}>
                  <Input
                    inputContainerStyle={styles.inputContainer}
                    selectionColor={colors.Secondary}
                    keyboardType={'default'}
                    autoCapitalize={false}
                    autoCorrect={false}
                    onChangeText={(e) => handleStates('firstName', e)}
                    errorMessage={error.firstName && !error.firstName.isValid ? error.firstName.message : ''}
                    placeholder={ t('shopKeeperSignUp.First Name')}
                  />
                </View>
                <View style={base.col6}>
                  <Input
                    selectionColor={colors.Secondary}
                    keyboardType={'default'}
                    autoCapitalize={false}
                    autoCorrect={false}
                    onChangeText={(e) => handleStates('lastName', e)}
                    errorMessage={error.lastName && !error.lastName.isValid ? error.lastName.message : ''}
                    placeholder={t('shopKeeperSignUp.Last Name')}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={base.col12}>
            <Input
              selectionColor={colors.Secondary}
              keyboardType={'numeric'}
              autoCapitalize={false}
              autoCorrect={false}
              maxLength={10}
              onChangeText={(e) => handleStates('phoneNumber', e)}
              errorMessage={error.phoneNumber && !error.phoneNumber.isValid ? error.phoneNumber.message : ''}
              placeholder={t('shopKeeperSignUp.Mobile Number')}
            />
          </View>
          <View style={base.col12}>
            <Input
              selectionColor={colors.Secondary}
              keyboardType={'email-address'}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={(e) => handleStates('email', e)}
              errorMessage={error.email && !error.email.isValid ? error.email.message : ''}
              placeholder={t('shopKeeperSignUp.Email Address')}
            />
          </View>
          <View style={base.col12}>
            <Input
              selectionColor={colors.Secondary}
              keyboardType={'numeric'}
              autoCapitalize={false}
              autoCorrect={false}
              maxLength={14}
              value={values.adhaarNumber}
              onChangeText={(e) => handleStates('adhaarNumber', spaceAfter4Digit(e))}
              errorMessage={error.adhaarNumber && !error.adhaarNumber.isValid ? error.adhaarNumber.message : ''}
              placeholder={t('shopKeeperSignUp.Aadhaar Number')}
            />
          </View>
          <View style={base.col12}>
            <SearchDropDown
              value={values.gender}
              title={null}
              placeholder={t('shopKeeperSignUp.Gender')}
              list={gender}
              onChange={(item) => handleStates('gender', item)}
              defaultValue={values.gender && values.gender.name}
              errorMessage={error.gender && !error.gender.isValid ? error.gender.message : ''}
            />
          </View>
          <View style={base.col12}>
            <Input
              selectionColor={colors.Secondary}
              secureTextEntry={eye ? true : false}
              placeholder={t('shopKeeperSignUp.Password')}
              onChangeText={(e) => handleStates('password', e)}
              errorMessage={error.password && !error.password.isValid ? error.password.message : ''}
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
              secureTextEntry={eye2 ? true : false}
              placeholder={t('shopKeeperSignUp.Confirm Password')}
              onChangeText={(e) => handleStates('confirmPassword', e)}
              errorMessage={error.confirmPassword && !error.confirmPassword.isValid ? error.confirmPassword.message : ''}
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
            <Input
              inputContainerStyle={styles.inputContainer}
              selectionColor={colors.Secondary}
              keyboardType={'default'}
              autoCapitalize={false}
              autoCorrect={false}
              value={values.address}
              onChangeText={(e) => handleStates('address', e)}
              errorMessage={error.address && !error.address.isValid ? error.address.message : ''}
              placeholder={t('shopKeeperSignUp.Address')}
            />
          </View>
          <View style={base.col12}>
            <TouchableOpacity onPress={() => props.navigation.navigate('selectstate', { selectLoc: getAddress, addressDeatil: getAddressDetail })}>
              <Input
                editable={false}
                selectionColor={colors.Secondary}
                keyboardType={'default'}
                value={values.place}
                placeholder={t('shopKeeperSignUp.Place')}
                onChangeText={(e) => handleStates('place', e)}
                errorMessage={error.place && !error.place.isValid ? error.place.message : ''}
              />
            </TouchableOpacity>
          </View>
          <View style={base.col12}>
            <View style={base.row}>
              <View style={base.col6}>
                <TouchableOpacity onPress={() => props.navigation.navigate('selectstate', { selectLoc: getAddress, addressDeatil: getAddressDetail })}>
                  <Input
                    selectionColor={colors.Secondary}
                    editable={false}
                    keyboardType={'default'}
                    autoCapitalize={false}
                    value={values.city}
                    autoCorrect={false}
                    onChangeText={(e) => handleStates('city', e)}
                    errorMessage={error.city && !error.city.isValid ? error.city.message : ''}
                    placeholder={t('shopKeeperSignUp.City')}
                  />
                </TouchableOpacity>
              </View>
              <View style={base.col6}>
                <TouchableOpacity onPress={() => props.navigation.navigate('selectstate', { selectLoc: getAddress, addressDeatil: getAddressDetail })}>
                  <Input
                    selectionColor={colors.Secondary}
                    keyboardType={'default'}
                    editable={false}
                    value={values.district}
                    autoCapitalize={false}
                    autoCorrect={false}
                    onChangeText={(e) => handleStates('district', e)}
                    errorMessage={error.district && !error.district.isValid ? error.district.message : ''}
                    placeholder={t('shopKeeperSignUp.District')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={base.col12}>
            <TouchableOpacity onPress={() => props.navigation.navigate('selectstate', { selectLoc: getAddress, addressDeatil: getAddressDetail })}>
              <Input
                selectionColor={colors.Secondary}
                keyboardType={'default'}
                editable={false}
                value={values.state}
                placeholder={t('shopKeeperSignUp.State')}
                onChangeText={(e) => handleStates('state', e)}
                errorMessage={error.state && !error.state.isValid ? error.state.message : ''}
              />
            </TouchableOpacity>
          </View>
          <View style={base.col12}>
            <Input
              selectionColor={colors.Secondary}
              keyboardType={'default'}
              value={values.referalCode}
              placeholder={t('shopKeeperSignUp.Referral Code (If any)')}
              onChangeText={(e) => handleStates('referalCode', e)}
            />
          </View>
          <View style={styles.buttonMain}>
            <View>
              <Button
                title={t("shopKeeperSignUp.Submit")}
                buttonStyle={styles.button2}
                onPress={() => signUp()}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <ImagePickerModal
        show={imagePicker}
        close={() => setImagePicker(false)}
        type={imageType}
        response={path => {
          if (imageType === 'users') {
            handleStates('image', path)
          }
          else return null
        }}
      />
      <Loader loader={loader}></Loader>
    </View>
  );
};
export default PersonalDetail;
