import React, { useRef } from 'react';


import { Button, Image, Text, Input, Icon } from '@rneui/themed';
import {
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { base } from '../../../assets/global_style/base';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import { Dimension } from '../../../assets/global_style/dimension';
import { colors } from '../../../assets/global_style/colors';
import { Images } from '../../../assets/global_style/images';
import { hp, vp } from '../../../assets/global_style/fontsize';
import { homeLabel } from '../../../assets/global_style/values/home';
import { ButtonLabel } from '../../../assets/global_style/values/button';
import { useState } from 'react';
import Validation from '../../Helper/Validations';
import customerAuthController from '../../../../apis/Controller/customer.auth.controller';
import { Toaster } from '../../Helper/Toaster';
import { renderImage, spaceAfter4Digit } from '../../Helper/general';
import ImagePickerModal from '../../Helper/imagePicker';
import SearchDropDown from '../../Helper/dropdown';
import Loader from '../../Helper/loader';
import LocationService from '../../Helper/loaction';
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Animated } from 'react-native';
import { StyleSheet } from 'react-native';
import styles from './style';
import referralController from '../../../../apis/Controller/ReferralController/referral.controller';
import { useTranslation } from 'react-i18next';
const headerHeight = 58 * 1;


const CustomerSignup = (props) => {
  const [eye, setEye] = useState(true);
  const [eye2, setEye2] = useState(true);
  const { t } = useTranslation(); 
  // const detailsOpacity = scrollY.y.interpolate({
  //   inputRange: [0, 250, 350],
  //   outputRange: [0, 0, 1],
  //   extrapolate: 'clamp',
  //  })

  const { diffClamp } = Animated;

  const ref = useRef(null);
  const scrollY = useRef(new Animated.Value(0));
  const scrollYClamped = diffClamp(scrollY.current, 0, headerHeight);

  const translateY = scrollYClamped.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -(headerHeight / 3)],
  });

  const translateYNumber = useRef();

  translateY.addListener(({ value }) => {
    translateYNumber.current = value;
  });

  const handleScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: { y: scrollY.current },
        },
      },
    ],
    {
      useNativeDriver: true,
    },
  );

  const handleSnap = ({ nativeEvent }) => {
    const offsetY = nativeEvent.contentOffset.y;
    if (
      !(
        translateYNumber.current === 0 ||
        translateYNumber.current === -headerHeight / 2
      )
    ) {
      if (ref.current) {
        ref.current.scrollToOffset({
          offset:
            getCloser(translateYNumber.current, -headerHeight / 2, 0) ===
              -headerHeight / 2
              ? offsetY + headerHeight / 2
              : offsetY - headerHeight / 2,
        });
      }
    }
  };

  const STATUSBAR_HEIGHT = StatusBar.currentHeight;
  const [loader, setLoader] = useState(false)
  const [imagePicker, setImagePicker] = useState(false);
  const [imageType, setImageType] = useState('');
  const [addressDeatil, setAddressDetail] = useState()

  const isFocus = useIsFocused();
  useEffect(() => {
    getAddress();
  }, [isFocus]);


  let gender = [
    {
      id: 1,
      name: t('customersignup.Male'),
      value : 'Male'
    },
    {
      id: 2,
      name: t('customersignup.Female'),
      value : 'Female'
    },
  ];

  let defaultValues = {
    image: null,
    firstName: null,
    lastName: null,
    phoneNumber: null,
    email: null,
    adhaarNumber: null,
    gender: null,
    password: null,
    confirmPassword: null,
    address: null,
    place: null,
    city: null,
    district: null,
    state: null,
    referalCode: null
  }
  const [values, setValues] = useState(defaultValues);

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
      rules: ["required", 'numeric', 'min:10', 'max:10'],
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
    address: {
      rules: ["required"],
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
    },
  });

  let Validations = new Validation(error);

  const handleStates = (name, value) => {
    let check = Validations.validateField(name, value);
    setError({ ...error, [name]: check });
    if (value instanceof Date || value instanceof Object || value instanceof Array || typeof value == 'boolean') {
      setValues({
        ...values,
        [name]: value ? value : null,
      });
    } else if (!value || !value.trim()) {
      setValues({
        ...values,
        [name]: value ? '' : null,
      });
    } else {
      setValues({
        ...values,
        [name]: value ? value.trimLeft() : null,
      });
    }
  };


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
            let response = await customerAuthController.signUp(values, addressDeatil)
            if (response && response.status) {
              new Toaster().success(response.message);
              props.navigation.reset({
                index: 1,
                routes: [{ name: 'customerlogin' }, { name: 'customeremailverification', params: { userToken: response.user.token } }]
              })
              setValues(defaultValues)
              setLoader(false)
            }
            else {
              setLoader(false)
            }
            setLoader(false)
          }
          else {
            new Toaster().error(valid.message);
          }
        }
        else {
          setLoader(true)
          let response = await customerAuthController.signUp(values, addressDeatil)
          if (response && response.status) {
            new Toaster().success(response.message);
            props.navigation.reset({
              index: 1,
              routes: [{ name: 'customerlogin' }, { name: 'customeremailverification', params: { userToken: response.user.token } }]
            })
            setValues(defaultValues)
            setLoader(false)
          }
          else {
            setLoader(false)
          }
          setLoader(false)
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
  };


  const getAddressDetail = (item) => {
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

  const offset = useRef(new Animated.Value(0)).current;

  return (
    <View style={[styles.main, { marginTop: STATUSBAR_HEIGHT }]}>


      {/* <ImageHeaderCom 
         animatedValue={offset} 
        
         
          title={homeLabel.signup.CustomerSignup}

      /> */}
      <View style={styles.imgContainer}>
        <Image style={styles.imageMain}
          source={Images.headerimage}
          resizeMode='stretch'
        />
      </View>
      <View>
        <ScrollView contentContainerStyle={{ paddingBottom: hp(90) }}
          keyboardShouldPersistTaps={'handled'}
        >
          <View style={base.container}>
            <View style={base.row}>
              <View style={base.col12}>
                <View style={styles.headingMain}>
                  <Text style={[styles.heading]}>
                    {t('customersignup.Customer Sign up')}
                  </Text>
                </View>
              </View>
              <View style={base.col12}>

              </View>
              <View style={base.col12}>
                <View style={styles.cirContainer}>
                  <View style={styles.circlMain}>
                    <Image style={styles.userimageLogo}
                      source={values.image ? renderImage(values.image) : Images.user}
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
                          size={Dimension.smallicon}
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
                        selectionColor={colors.Secondary}
                        keyboardType={'default'}
                        autoCapitalize={false}
                        autoCorrect={false}
                        value={values.firstName}
                        onChangeText={(e) => handleStates('firstName', e)}
                        errorMessage={error.firstName && !error.firstName.isValid ? error.firstName.message : ''}
                        placeholder={t('customersignup.First Name')}
                      />
                    </View>
                    <View style={base.col6}>
                      <Input
                        selectionColor={colors.Secondary}
                        value={values.lastName}
                        keyboardType={'default'}
                        autoCapitalize={false}
                        autoCorrect={false}
                        onChangeText={(e) => handleStates('lastName', e)}
                        errorMessage={error.lastName && !error.lastName.isValid ? error.lastName.message : ''}
                        placeholder={t('customersignup.Last Name')}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={base.col12}>
                <Input
                  selectionColor={colors.Secondary}
                  value={values.phoneNumber}
                  keyboardType={'numeric'}
                  autoCapitalize={false}
                  maxLength={10}
                  autoCorrect={false}
                  onChangeText={(e) => handleStates('phoneNumber', e)}
                  errorMessage={error.phoneNumber && !error.phoneNumber.isValid ? error.phoneNumber.message : ''}
                  placeholder={t('customersignup.Mobile Number')}
                />
              </View>
              <View style={base.col12}>
                <Input
                  selectionColor={colors.Secondary}
                  value={values.email}
                  keyboardType={'email-address'}
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  onChangeText={(e) => handleStates('email', e)}
                  errorMessage={error.email && !error.email.isValid ? error.email.message : ''}
                  placeholder={t('customersignup.Email Address')}
                />
              </View>
              <View style={base.col12}>
                <Input
                  selectionColor={colors.Secondary}
                  value={values.adhaarNumber}
                  keyboardType={'numeric'}
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  maxLength={14}
                  onChangeText={(e) => handleStates('adhaarNumber', spaceAfter4Digit(e))}
                  errorMessage={error.adhaarNumber && !error.adhaarNumber.isValid ? error.adhaarNumber.message : ''}
                  placeholder={t('customersignup.Aadhar Number')}
                />
              </View>
              <View style={base.col12}>
                <SearchDropDown
                  title={null}
                  placeholder={t('customersignup.Gender')}
                  list={gender}
                  value={values.gender}
                  onChange={item => { handleStates('gender', item) }}
                  defaultValue={values.gender && values.gender.name}
                  errorMessage={error.gender && !error.gender.isValid ? error.gender.message : ''}
                />
              </View>
              <View style={base.col12}>
                <Input
                  selectionColor={colors.Secondary}
                  value={values.password}
                  secureTextEntry={eye ? true : false}
                  placeholder={t('customersignup.Password')}
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
                  value={values.confirmPassword}
                  secureTextEntry={eye2 ? true : false}
                  placeholder={t('customersignup.Confirm Password')}
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
                  selectionColor={colors.Secondary}
                  value={values.address}
                  placeholder={t('customersignup.Address')}
                  onChangeText={(e) => handleStates('address', e)}
                  errorMessage={error.address && !error.address.isValid ? error.address.message : ''}
                />
              </View>
              <View style={base.col12}>
                <TouchableOpacity onPress={() => props.navigation.navigate('selectstate', { selectLoc: getAddress, addressDeatil: getAddressDetail })}>
                  <Input
                    editable={false}
                    selectionColor={colors.Secondary}
                    value={values.place}
                    keyboardType={'default'}
                    onChangeText={(e) => handleStates('place', e)}
                    errorMessage={error.place && !error.place.isValid ? error.place.message : ''}
                    placeholder={ t('customersignup.Village')}
                  />
                </TouchableOpacity>
              </View>
              <View style={base.col12}>
                <View style={base.row}>
                  <View style={base.col6}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('selectstate', { selectLoc: getAddress, addressDeatil: getAddressDetail })}>
                      <Input
                        editable={false}
                        selectionColor={colors.Secondary}
                        value={values.city}
                        keyboardType={'default'}
                        autoCapitalize={false}
                        autoCorrect={false}
                        onChangeText={(e) => handleStates('city', e)}
                        errorMessage={error.city && !error.city.isValid ? error.city.message : ''}
                        placeholder={t('customersignup.City')}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={base.col6}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('selectstate', { selectLoc: getAddress, addressDeatil: getAddressDetail })}>
                      <Input
                        editable={false}
                        selectionColor={colors.Secondary}
                        value={values.district}
                        keyboardType={'default'}
                        autoCapitalize={false}
                        autoCorrect={false}
                        onChangeText={(e) => handleStates('district', e)}
                        errorMessage={error.district && !error.district.isValid ? error.district.message : ''}
                        placeholder={ t('customersignup.District')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={base.col12}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('selectstate', { selectLoc: getAddress, addressDeatil: getAddressDetail })}>
                  <Input
                    editable={false}
                    selectionColor={colors.Secondary}
                    value={values.state}
                    keyboardType={'default'}
                    onChangeText={(e) => handleStates('state', e)}
                    errorMessage={error.state && !error.state.isValid ? error.state.message : ''}
                    placeholder={t('customersignup.State')}
                  />
                </TouchableOpacity>
              </View>
              <View style={base.col12}>
                <Input
                  selectionColor={colors.Secondary}
                  value={values.referalCode}
                  keyboardType={'default'}
                  onChangeText={(e) => handleStates('referalCode', e)}
                  placeholder={t('customersignup.Referral Code (If any)')}
                />
              </View>
              <View style={styles.col12}>
                <View style={styles.btnMain}>
                  <Button
                    title={t('customersignup.Sign Up')}
                    buttonStyle={styles.button}
                    onPress={() => signUp()}
                  />
                </View>
              </View>
              <View style={base.col12}>
                <View style={styles.textContainer}>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('customerlogin')}>
                    <Text style={styles.txt1}>
                      {t('customersignup.Already have an account')}? <Text style={styles.txt2}>
                        {t('customersignup.Login')}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
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

const home = StyleSheet.create({
  subHeader: {
    height: headerHeight / 2,
    width: '100%',
  },
});
export default CustomerSignup;
