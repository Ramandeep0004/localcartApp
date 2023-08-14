import { useIsFocused } from '@react-navigation/native';
import { Button, Icon, Image, Input } from '@rneui/themed';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import customerProfileController from '../../../../apis/Controller/customer/customer.profile.controller';
import { base } from '../../../assets/global_style/base';
import { colors } from '../../../assets/global_style/colors';
import { Dimension } from '../../../assets/global_style/dimension';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import { Images } from '../../../assets/global_style/images';
import UpdatePhoneNumber from '../../auth/updatephonenumberModal';
import SearchDropDown from '../../Helper/dropdown';
import { renderImage, spaceAfter4Digit } from '../../Helper/general';
import ImagePickerModal from '../../Helper/imagePicker';
import LocationService from '../../Helper/loaction';
import Loader from '../../Helper/loader';
import { Toaster } from '../../Helper/Toaster';
import Validation from '../../Helper/Validations';
import { styles } from './style';
import authController from '../../../../apis/Controller/auth.controller'

const CustomerEditProfile = props => {
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [imagePicker, setImagePicker] = useState(false);
  const [imageType, setImageType] = useState('');
  const [image, setImage] = useState(null);
  const [phoneNumberPopUp, setPhoneNumberPopUp] = useState(false);

  let defaultValues = {
    image: null,
    firstName: null,
    lastName: null,
    phoneNumber: null,
    email: null,
    adhaarNumber: null,
    gender: null,
    address: null,
    place: null,
    city: null,
    district: null,
    state: null,
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
    email: {
      rules: ["required", 'email'],
      isValid: true,
      message: "",
    },
    adhaarNumber: {
      rules: [''],
      isValid: true,
      message: "",
    },
    gender: {
      rules: ["required"],
      isValid: true,
      message: "",
    },
    address: {
      rules: ["required"],
      isValid: true,
      message: "",
    },
    place: {
      rules: ["required"],
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
    city: {
      rules: ['required'],
      isValid: true,
      message: "",
    },
  })

  let Validations = new Validation(error)

  let isFocus = useIsFocused();
  useEffect(() => {
    // if (isFocus) {
      getAddress();
      getProfile();
    // }
  }, []);

  useEffect(() => {
    if (props.user) {
      getProfile();
    }
  }, [props && props.user]);

  const handleStates = (name, value) => {
    let check = Validations.validateField(name, value)
    setError({ ...error, [name]: check })
    setValues({ ...values, [name]: value })
  };

  const updateProfile = async () => {
    let validtn = new Validation(error)
    let isValid = await validtn.isFormValid(values)

    if (isValid && !isValid.haveError) {
      setLoader(true);
      let response = await customerProfileController.editProfile(values);
      if (response) {
        new Toaster().success(response.message);
        authController.setUpLogin(response.user);
        props.navigation.goBack();
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


  const getProfile = async () => {
    setLoader(true);
    let response = await customerProfileController.customerProfile()
    if (response.user) {
      let data = response.user;
      setValues({
        ...values,
        image: '',
        firstName: data ? data.first_name : null,
        lastName: data ? data.last_name : null,
        phoneNumber: data ? data.phonenumber : null,
        email: data ? data.email : null,
        adhaarNumber: data ? data.aadhar_no : null,
        gender: data ? { name: data.gender, id: 1, value: data.gender } : null,
        address: data.address ? data.address.address : null,
        place: data.address ? { name: data.address.mandal_name, id: data.address.mandal } : null,
        district: data.address ? { name: data.address.district_name, id: data.address.district_id } : null,
        state: data.address ? { name: data.address.state_name, id: data.address.state_id } : null,
        city: data.address ? { name: data.address.city_name, id: data.address.city_id } : null,
      })
      setImage(data.image)
      setLoader(false);
    }
    else {
      setLoader(false);
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
    if (item) {
      setValues({
        ...values,
        place: { id: item.village_id, name: item.village_name },
        city: { id: item.city_id, name: item.city_name },
        district: { id: item.district_id, name: item.district_name },
        state: { id: item.state_id, name: item.state_name },
      })
    }
  };

  let gender = [
    {
      id: 1,
      name: t('customersignup.Male'),
      value: 'Male',
    },
    {
      id: 2,
      name: t('customersignup.Female'),
      value: 'Female',
    },
  ];

  return (

    <View style={styles.main}>
      <ScrollView contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps={'handled'}>
        <View style={base.container}>
          <View style={base.row}>
            <View style={base.col12}>
              <View style={styles.ImageContainer}>
                <View style={styles.imgContainer}>
                  <View style={styles.imgMain}>
                    <Image
                      style={styles.image}
                      source={image ? renderImage(image) : Images.user}
                      resizeMode="cover"
                    />
                  </View>
                </View>
                <View style={styles.cirContainer2}>
                  <View style={styles.circleMain2}>
                    <Icon
                      name={Icons.camera}
                      type={IconsType.simpleLineIcon}
                      color={colors.white}
                      size={Dimension.semilarge}
                      onPress={() => (
                        setImagePicker(true),
                        setImageType('users')
                      )}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.inputMain}>
              <View style={base.col12}>
                <View style={base.row}>
                  <View style={base.col6}>
                    <Input
                      selectionColor={colors.Secondary}
                      placeholder={t("customersignup.First Name")}
                      value={values.firstName}
                      onChangeText={(e) => handleStates('firstName', e)}
                      errorMessage={error.firstName && !error.firstName.isValid ? error.firstName.message : ''}
                    />
                  </View>
                  <View style={base.col6}>
                    <Input
                      selectionColor={colors.Secondary}
                      placeholder={t("customersignup.Last Name")}
                      value={values.lastName}
                      onChangeText={(e) => handleStates('lastName', e)}
                      errorMessage={error.lastName && !error.lastName.isValid ? error.lastName.message : ''}
                    />
                  </View>
                </View>
              </View>
              <View style={base.col12}>
                <TouchableOpacity onPress={() => setPhoneNumberPopUp(true)}>
                  <Input
                    editable={false}
                    selectionColor={colors.Secondary}
                    placeholder={t("customersignup.Mobile Number")}
                    value={values.phoneNumber}
                    keyboardType={'numeric'}
                    maxLength={10}
                    // rightIcon={
                    //   <TouchableOpacity onPress={() => setPhoneNumberPopUp(true)}>
                    //     <Text style={styles.changeNumber}>Change</Text>
                    //   </TouchableOpacity>
                    // }
                    onChangeText={(e) => handleStates('phoneNumber', e)}
                    errorMessage={error.phoneNumber && !error.phoneNumber.isValid ? error.phoneNumber.message : ''}
                  />
                </TouchableOpacity>
              </View>
              <View style={base.col12}>
                <Input
                  selectionColor={colors.Secondary}
                  placeholder={t("customersignup.Email Address")}
                  value={values.email}
                  onChangeText={(e) => handleStates('email', e)}
                  errorMessage={error.email && !error.email.isValid ? error.email.message : ''}
                />
              </View>
              <View style={base.col12}>
                <Input
                  selectionColor={colors.Secondary}
                  placeholder={t("customersignup.Aadhaar Number")}
                  value={values.adhaarNumber}
                  keyboardType={'number-pad'}
                  autoCapitalize={false}
                  autoCorrect={false}
                  maxLength={14}
                  onChangeText={(e) => handleStates('adhaarNumber', spaceAfter4Digit(e))}
                  errorMessage={error.adhaarNumber && !error.adhaarNumber.isValid ? error.adhaarNumber.message : ''}
                />
              </View>
              <View style={base.col12}>
                <SearchDropDown
                  selectionColor={colors.Secondary}
                  title={null}
                  placeholder={t("customersignup.Gender")}
                  list={gender}
                  value={values.gender}
                  onChange={item => { handleStates('gender', item) }}
                  defaultValue={values.gender && values.gender.name}
                  errorMessage={error.gender && !error.gender.isValid ? error.gender.message : ''}
                  container={styles.container}
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
                    value={values.place && values.place.name}
                    keyboardType={'default'}
                    onChangeText={(e) => handleStates('place', e)}
                    errorMessage={error.place && !error.place.isValid ? error.place.message : ''}
                    placeholder={t('customersignup.Place')}
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
                        value={values.city && values.city.name}
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
                        value={values.district && values.district.name}
                        keyboardType={'default'}
                        autoCapitalize={false}
                        autoCorrect={false}
                        onChangeText={(e) => handleStates('district', e)}
                        errorMessage={error.district && !error.district.isValid ? error.district.message : ''}
                        placeholder={t('customersignup.District')}
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
                    value={values.state && values.state.name}
                    keyboardType={'default'}
                    onChangeText={(e) => handleStates('state', e)}
                    errorMessage={error.state && !error.state.isValid ? error.state.message : ''}
                    placeholder={t('customersignup.State')}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.buttonMain}>
              <View style={base.col12}>
                <Button title={t("customersignup.Save changes")}
                  buttonStyle={styles.button}
                  onPress={updateProfile}
                />
              </View>
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
            handleStates('image', path);
            setImage(path)
          }
          else return null
        }}
      />
      {
        phoneNumberPopUp ?
          <UpdatePhoneNumber
            show={phoneNumberPopUp}
            close={() => setPhoneNumberPopUp(false)}
            navigation={props.navigation}
            userType={"customer"}
          />
          : null
      }
      <Loader loader={loader}></Loader>
    </View>

  );
};
const mapStateToProps = state => ({
  user: state.UserReducer.user,
});
export default connect(mapStateToProps)(CustomerEditProfile);
