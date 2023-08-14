import { useIsFocused } from '@react-navigation/native';
import { Button, CheckBox, Icon, Image, Input, Text } from '@rneui/themed';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shopkeeperAuthController from '../../../../apis/Controller/shopkeeper.auth.controller';
import shopkeeperProfileController from '../../../../apis/Controller/shopkeeper/shopkeeper.profile.controller';
import { base } from '../../../assets/global_style/base';
import { colors } from '../../../assets/global_style/colors';
import { Dimension } from '../../../assets/global_style/dimension';
import { Font } from '../../../assets/global_style/fontfamily';
import { fp, hp, vp, wp } from '../../../assets/global_style/fontsize';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import { Images } from '../../../assets/global_style/images';
import { homeLabel } from '../../../assets/global_style/values/home';
import SearchDropDown from '../../Helper/dropdown';
import { renderImage, timeFormatDisplay } from '../../Helper/general';
import ImagePickerModal from '../../Helper/imagePicker';
import { Toaster } from '../../Helper/Toaster';
import Validation from '../../Helper/Validations';
import authController from '../../../../apis/Controller/auth.controller';


const ShopInfo = (props) => {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [shopCategories, setShopCategories] = useState([]);
  // const [loader, setLoader] = useState(false);
  const [shopType, setShopType] = useState([]);
  const [shopkeeperType, setShopkeeperType] = useState([]);
  const [imagePicker, setImagePicker] = useState(false);
  const [imageType, setImageType] = useState(null);
  const [timeType, setTimeType] = useState(null);
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selff, setSelf] = useState(false);
  const [thirdPartyy, setThirdparty] = useState(false);
  const [checkValue, setCheckValue] = useState(false);
  const [checkvalue2, setCheckValue2] = useState(false);
  const [customError, setCustomError] = useState(false);
  let defaultValues = {
    image: null,
    shopName: null,
    // category: null,
    googleMapURL: null,
    shopkeeperType: null,
    shopType: null,
    openTime: null,
    closeTime: null,
    GSTNumber: null,
    homeDelivery: null,
    self: null,
    thirdparty: null,
    deliverChargeType: null,
    deliverycharges: null
  };
  const [values, setValues] = useState(defaultValues);

  const [error, setError] = useState({
    image: {
      rules: [""],
      isValid: true,
      message: "",
    },
    shopName: {
      rules: ["required"],
      isValid: true,
      message: "",
    },
    // category: {
    //   rules: ["required"],
    //   isValid: true,
    //   message: "",
    // },
    googleMapURL: {
      rules: ["required", 'url'],
      isValid: true,
      message: "",
    },
    shopkeeperType: {
      rules: ["required"],
      isValid: true,
      message: "",
    },
    shopType: {
      rules: ["required"],
      isValid: true,
      message: "",
    },
    openTime: {
      rules: ["required"],
      isValid: true,
      message: "",
    },
    closeTime: {
      rules: [""],
      isValid: true,
      message: "",
    },
    GSTNumber: {
      rules: ["gst"],
      isValid: true,
      message: "required",
    },
    homeDelivery: {
      rules: ["required"],
      isValid: true,
      message: "",
    },
    self: {
      rules: [],
      isValid: true,
      message: "",
    },
    thirdparty: {
      rules: [],
      isValid: true,
      message: "",
    },
    deliverChargeType: {
      rules: [],
      isValid: true,
      message: "",
    },
    deliverycharges: {
      rules: ["numeric"],
      isValid: true,
      message: "",
    },
  });

  let Validations = new Validation(error);

  const isFocus = useIsFocused();
  useEffect(() => {
    getProfile()
  }, [isFocus]);

  useEffect(() => {
    getShopCategory();
    getShopType();
    getShopkeeperType();
  }, [isFocus]);

  const handleStates = (name, value) => {
    let check = Validations.validateField(name, value)
    setError({ ...error, [name]: check })
    setValues({ ...values, [name]: value })
  };


  // const submit = async () => {
  //   let err = { ...error };
  //   if (values.homeDelivery === 1) {
  //     err = {
  //       ...error,
  //       deliverChargeType: {
  //         rules: ['required'],
  //         isValid: true,
  //         message: '',
  //       },
  //       deliverycharges: {
  //         rules: ['required'],
  //         isValid: true,
  //         message: '',
  //       },
  //     };
  //   } else {
  //     err = {
  //       ...error,
  //       deliverChargeType: {
  //         rules: ['required'],
  //         isValid: false,
  //         message: '',
  //       },
  //       deliverycharges: {
  //         rules: ['required'],
  //         isValid: false,
  //         message: '',
  //       },
  //     };
  //   }
  //   let validtn = new Validation(err)
  //   let isValid = await validtn.isFormValid(values)

  //   if (isValid && !isValid.haveError) {
  //     if (values.homeDelivery === 1 && (values.self === null && values.thirdparty === null)) {
  //       setCustomError(true);
  //     } else {
  //       props.setLoader(true);
  //       setCustomError(false);
  //       let response = await shopkeeperProfileController.updateShopDetail(values);
  //       if (response) {
  //         new Toaster().success(response.message);
  //         props.navigation.navigate('myprofileshop');
  //         props.setLoader(false);
  //       }
  //       else {
  //         props.setLoader(false);
  //       }
  //     }
  //   }
  //   else {
  //     setError({ ...isValid.errors })
  //   }
  // };

  const submit = async () => {
    let err = { ...error };
    if (values.homeDelivery === 1 && ((values.self === null || values.self === 0) && (values.thirdparty === null || values.thirdparty === 0))) {
      setCustomError(true);
    } else if (values.homeDelivery === 1 && (values.self !== null || values.thirdparty !== null)) {
      err = {
        ...error,
        deliverChargeType: {
          rules: ['required'],
          isValid: true,
          message: '',
        },
        deliverycharges: {
          rules: ['required', "numeric"],
          isValid: true,
          message: '',
        },
      };
    } else {
      err = {
        ...error,
        deliverChargeType: {
          rules: [],
          isValid: true,
          message: '',
        },
        deliverycharges: {
          rules: [],
          isValid: true,
          message: '',
        },
      };
    }
    let validtn = new Validation(err)
    let isValid = await validtn.isFormValid(values)
    if (isValid && !isValid.haveError) {
      if (values.homeDelivery === 1 && ((values.self === null || values.self === 0) && (values.thirdparty === null || values.thirdparty === 0))) {
        setCustomError(true);
      } else {
        props.setLoader(true);
        setCustomError(false);
        let response = await shopkeeperProfileController.updateShopDetail(values);
        if (response) {
          new Toaster().success(response.message);
          authController.setUpLogin(response.shop);
          props.navigation.navigate('myprofileshop');
          props.setLoader(false);
        }
        else {
          props.setLoader(false);
        }
      }
    }
    else {
      setError({ ...isValid.errors })
    }
  };

  const [sort, setSort] = useState([
    { name: t('shopKeeperSignUp.Available'), value: 1, checked: false },
    { name: t('shopKeeperSignUp.Not Available'), value: 0, checked: false },
  ]);

  const price = [
    {
      id: 1,
      name: t('shopKeeperSignUp.Fixed price'),
      value: 'fixed_price'
    },
    {
      id: 2,
      name: t('shopKeeperSignUp.Percentage'),
      value: 'percentage'
    },
  ];

  const getProfile = async () => {
    props.setLoader(true);
    let response = await shopkeeperProfileController.getShopkeeperProfile();
    if (response.user) {
      let data = response && response.user && response.user.shop

      // let categories = response.user.categories
      // let categoriesArr = categories.map(({ id: id, category_name: name }) => ({ id, name }));
      let obj = data.delivery_charge_type ? price.find((item) => item.value === data.delivery_charge_type) : null
      setValues({
        ...values,
        image: '',
        shopName: data ? data.shop_name : null,
        // category: categoriesArr ? categoriesArr : null,
        googleMapURL: data ? data.google_map_url : null,
        shopkeeperType: data ? { name: data.shopkeeper_type_name, id: data.shopkepeer_type } : null,
        shopType: data ? { name: data.shop_type_name, id: data.shop_type } : null,
        openTime: data ? data.shop_open_time : null,
        closeTime: data ? data.shop_close_time : null,
        GSTNumber: data ? data.shop_gstin : null,
        homeDelivery: data ? data.home_delivery : null,
        deliverChargeType: obj,
        deliverycharges: data ? data.delivery_charge : null,
        self: data.self_delivery ? data.self_delivery : null,
        thirdparty: data.third_party_delivery ? data.third_party_delivery : null,
      });
      let array = [...sort];
      array.map(e => {
        if (e.value == data.home_delivery) {
          e.checked = true;
        }
        else {
          e.checked = false;
        }
      });
      if (data.self_delivery && data.self_delivery !== null) {
        setCheckValue(true)
      }
      else if (data.third_party_delivery && data.third_party_delivery !== null) {
        setCheckValue2(true)
      }
      setSelf(parseInt(data.self_delivery) === 1 ? true : false)
      setThirdparty(parseInt(data.third_party_delivery) === 1 ? true : false)
      setSort(array);
      setImage(data.image);
      props.setLoader(false);
    }
    else return;
  };

  const setCategory = (categories) => {
    let data = categories.map(({ id: id, category_name: name }) => ({ id, name }));
    setCategories(data)
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setTimePickerVisibility(false);
  };

  const getShopCategory = async () => {
    let post = ''
    let response = await shopkeeperAuthController.shopCategories(post);
    if (response && response.status) {
      let lang = response.listing;
      let data = lang.map(({ id: id, name: name }) => ({ id, name }));
      setShopCategories(data);
    }
  };

  const getShopType = async () => {
    let post = {
      search: ''
    }
    let response = await shopkeeperAuthController.shopType(post);
    if (response && response.status) {
      let lang = response.listing;
      let data = lang.map(({ id: id, title: name }) => ({ id, name }));
      setShopType(data);
    }
  };

  const getShopkeeperType = async () => {
    let response = await shopkeeperAuthController.shopkeeperType();
    if (response && response.status) {
      let lang = response.listing;
      let data = lang.map(({ id: id, title: name }) => ({ id, name }));
      setShopkeeperType(data);
    }
  };

  const removeItem = (data) => {
    let updatedSelectedValue = categories.filter((previous) => {
      return data !== previous
    })
    setCategories(updatedSelectedValue);
  };


  const isExist = (id) => {
    let array = [...categories];
    let index = array.findIndex((item) => item.id === id)
    return index === -1 ? false : index;
  };

  const handleCategories = async (item) => {
    let array = [...categories];
    let status = await isExist(item.id);
    if (status === false) {
      array.push(item);
    }
    else {
      return;
    }
    setCategories(array);
  };

  const onRemoveItem = (item, index) => {
    const items = values.category.filter(sitem => sitem.id !== item.id);
    handleStates('category', items);
  };


  return (
    <View style={styles.main}>
      <View style={styles.viewimage}>
        <View style={styles.imgContainer}>
          <View style={styles.mainimage}>
            <Image style={styles.image}
              source={image ? renderImage(image, 'original') : Images.dummyShop}
              resizeMode='cover'
            />
          </View>
        </View>
        <View style={styles.viewicon}>
          <Icon type={IconsType.simpleLineIcon}
            name={Icons.camera}
            size={Dimension.semilarge}
            color={colors.white}
            onPress={() => (setImagePicker(true),
              setImageType('shop-detail'))}
          />
        </View>
      </View>
      <View style={styles.viewinput}>
        <Input
          keyboardType='ascii-capable'
          onChangeText={(e) => handleStates('shopName', e)}
          value={values.shopName}
          errorMessage={error.shopName && !error.shopName.isValid ? error.shopName.message : ''}
          placeholder={t("shopKeeperSignUp.Shop Name")}
        />
      </View>
      {/* <SearchDropDown
        title={null}
        value={values && values.category ? values.category.name : ''}
        placeholder={'Select Categories'}
        list={shopCategories}
        onChange={item => {
          const items = values.category
            ? values.category
            : [];
          let exist =
            values.category &&
            values.category.some(sitem => sitem.id === item.id);
          if (!exist) {
            items.push(item);
            handleStates('category', items);
          }
        }}
        errorMessage={error.category && !error.category.isValid ? error.category.message : ''}
        defaultValue={values.category && values.category.name}
        container={styles.container}
      /> */}
      {/* <View style={{ marginBottom: hp(20), marginTop: hp(-20) }}>
        {values.category &&
          values.category.map((item, index) => (

            <Chip
              key={index}
              type="outline"
              containerStyle={{
                marginBottom: hp(10),
                // marginTop: hp(-20),
                marginHorizontal: hp(6)
              }}
              buttonStyle={{
                flex: 1,
                backgroundColor: colors.greyy,
                paddingVertical: hp(8),
                paddingHorizontal: hp(20),
                borderColor: colors.grey,
                justifyContent: 'space-between',
              }}
              titleStyle={{
                color: colors.black,
                fontFamily: Font.regular,
                textAlign: 'left',
                paddingHorizontal: hp(5),
              }}
              title={item.name}
              icon={{
                name: Icons.cross,
                type: IconsType.entypo,
                size: Dimension.large,
                color: colors.black,
                style: {
                  marginLeft: hp(10),
                },
                onPress: () => onRemoveItem(item, index),
              }}
              iconRight
            />
          ))}
      </View> */}

      <Input
        keyboardType='ascii-capable'
        value={values.googleMapURL}
        onChangeText={(e) => handleStates('googleMapURL', e)}
        errorMessage={error.googleMapURL && !error.googleMapURL.isValid ? error.googleMapURL.message : ''}
        placeholder={t("shopKeeperSignUp.Google Map URL")}
      />
      <View style={{ marginBottom: hp(-8) }}>
        <SearchDropDown
          placeholder={t("shopKeeperSignUp.Shopkeeper Type")}
          list={shopkeeperType}
          value={values && values.shopkeeperType ? values.shopkeeperType : ''}
          onChange={(item) => handleStates('shopkeeperType', item)}
          errorMessage={error.shopkeeperType && !error.shopkeeperType.isValid ? error.shopkeeperType.message : ''}
          defaultValue={values.shopkeeperType && values.shopkeeperType.name}
        // container={styles.container22}
        />
      </View>
      <View style={{ marginBottom: hp(-8) }}>
        <SearchDropDown
          placeholder={t("shopKeeperSignUp.Shop Type")}
          list={shopType}
          value={values.shopType}
          onChange={(e) => handleStates('shopType', e)}
          errorMessage={error.shopType && !error.shopType.isValid ? error.shopType.message : ''}
          defaultValue={values.shopType && values.shopType.name}
        // container={styles.container22}
        />
      </View>
      <View style={styles.mainview}>
        <View style={styles.viewone}>
          <TouchableOpacity onPress={() => (showTimePicker(), setTimeType('openTime'))}>
            <Input
              editable={false}
              selectionColor={colors.Secondary}
              keyboardType={'default'}
              autoCapitalize={false}
              autoCorrect={false}
              value={values.openTime}
              errorMessage={error.openTime && !error.openTime.isValid ? error.openTime.message : ''}
              placeholder={t("shopKeeperSignUp.Open time")}
              rightIcon={
                <Icon
                  containerStyle={{ position: 'relative', right: wp(-10) }}
                  type={IconsType.material}
                  name={Icons.arrowdropdown}
                  color={colors.black}
                  size={Dimension.Large1}
                  onPress={() => (showTimePicker(),
                    setTimeType('openTime'))}
                />
              }
            />
          </TouchableOpacity>
        </View>
        <View style={styles.viewtwo}>
          <TouchableOpacity onPress={() => (showTimePicker(), setTimeType('closeTime'))}>
            <Input
              editable={false}
              selectionColor={colors.Secondary}
              keyboardType={'default'}
              autoCapitalize={false}
              autoCorrect={false}
              value={values.closeTime}
              errorMessage={error.closeTime && !error.closeTime.isValid ? error.closeTime.message : ''}
              placeholder={t("shopKeeperSignUp.Close time")}
              rightIcon={
                <Icon
                  containerStyle={{ position: 'relative', right: wp(-10) }}
                  type={IconsType.material}
                  name={Icons.arrowdropdown}
                  color={colors.black}
                  size={Dimension.Large1}
                  onPress={() => (showTimePicker(),
                    setTimeType('closeTime'))
                  }
                />
              }
            />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={(e) => {
              if (timeType === 'openTime') {
                handleStates('openTime', timeFormatDisplay(e))
              }
              else {
                handleStates('closeTime', timeFormatDisplay(e))
              }
              hideDatePicker();
            }}
            onCancel={hideDatePicker}
          />
        </View>
      </View>
      <Input
        keyboardType={'default'}
        placeholder={t("shopKeeperSignUp.GST Number")}
        value={values.GSTNumber}
        onChangeText={(e) => handleStates('GSTNumber', e)}
        errorMessage={error.GSTNumber && !error.GSTNumber.isValid ? error.GSTNumber.message : ''}
      />
      <Text style={styles.home}>{t("shopKeeperSignUp.Home delivery")}</Text>
      <View style={styles.submain}>
        {sort.map((item, index) => (<CheckBox
          key={index}
          title={item.name}
          titleProps={{
            style: item.checked === false ? { fontSize: fp(16), fontFamily: Font.regular, color: colors.black, paddingLeft: vp(10) } : { fontSize: fp(16), fontFamily: Font.semiBold, color: colors.black, paddingLeft: vp(10) }
          }}
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          containerStyle={styles.checkcon}
          checked={item.checked}
          onPress={() => {
            let array = [...sort];
            array.map(e => {
              if (e.value == item.value) {
                e.checked = true;
              }
              else {
                e.checked = false;
              }
            });
            setSort(array);
            handleStates('homeDelivery', item.value);
          }}
          checkedColor={colors.primary}
        />))}
        {!error.homeDelivery.isValid ? (
          <Text style={styles.errorStyle}>
            {error.homeDelivery.message}
          </Text>
        ) : null}
      </View>
      <View style={styles.checkboxMain2}>
        {values.homeDelivery === 1 ? (
          <View style={base.col12}>
            <View style={base.row}>
              <View style={base.col6}>
                <CheckBox
                  containerStyle={{
                    alignItems: 'flex-start',
                    backgroundColor: 'transparent',
                    marginLeft: wp(0),
                  }}
                  title={t("shopKeeperSignUp.Self")}
                  titleProps={{
                    style: checkValue === true ? {
                      fontFamily: Font.semiBold,
                      fontSize: fp(16),
                      color: colors.lightgrey,
                      paddingLeft: vp(12),
                    }
                      :
                      {
                        fontFamily: Font.regular,
                        fontSize: fp(16),
                        color: colors.lightgrey,
                        paddingLeft: vp(12),
                      }
                  }}
                  checked={selff}
                  // onPress={() => setSelf(!self)}
                  onPress={() => (handleStates('self', selff === true ? 0 : 1),
                    setSelf(!selff),
                    setCustomError(false),
                    setCheckValue(!checkValue)
                  )}
                  checkedColor={colors.primary}
                />
              </View>
              <View style={styles.col6}>
                <CheckBox
                  containerStyle={{
                    backgroundColor: 'transparent',
                    marginLeft: wp(0),
                  }}
                  title={t("shopKeeperSignUp.Third Party")}
                  titleProps={{
                    style: checkvalue2 === true ?
                      {
                        fontFamily: Font.semiBold,
                        fontSize: fp(16),
                        color: colors.lightgrey,
                        paddingLeft: vp(12),
                      } :
                      {
                        fontFamily: Font.regular,
                        fontSize: fp(16),
                        color: colors.lightgrey,
                        paddingLeft: vp(12),
                      }
                  }}
                  checked={thirdPartyy}
                  // onPress={() => setThirdparty(!thirdParty)}
                  onPress={() => (setThirdparty(!thirdPartyy),
                    handleStates('thirdparty', thirdPartyy === true ? 0 : 1),
                    setCustomError(false),
                    setCheckValue2(!checkvalue2)
                  )}
                  checkedColor={colors.primary}
                />
              </View>
            </View>
            {customError === true ? <Text style={styles.errorStyle}>
              {t("shopKeeperSignUp.This field is required.")}
            </Text> : null}
          </View>
        ) : null}
      </View>
      {values.homeDelivery === 1 && (thirdPartyy || selff) ? <>
        <View style={styles.inputMain2}>
          <View style={base.col12}>
            <SearchDropDown
              value={values.deliverChargeType}
              title={null}
              placeholder={t("shopKeeperSignUp.Service Charge Type")}
              list={price}
              onChange={(item) => handleStates('deliverChargeType', item)}
              error={error.deliverChargeType.isValid}
              errorMessage={error.deliverChargeType && !error.deliverChargeType.isValid ? error.deliverChargeType.message : ''}
              defaultValue={values.deliverChargeType && values.deliverChargeType.name}
            />
          </View>
        </View>
        <View style={base.col12}>
          <Input
            selectionColor={colors.Secondary}
            keyboardType={'numeric'}
            autoCapitalize={false}
            autoCorrect={false}
            placeholder={t("shopKeeperSignUp.Enter delivery charges")}
            value={values.deliverycharges}
            onChangeText={(e) => handleStates('deliverycharges', e)}
            errorMessage={error.deliverycharges && !error.deliverycharges.isValid ? error.deliverycharges.message : ''}
          />
        </View>
      </> : null}
      <View style={styles.viewbutton}>
        <Button title={t('shopKeeperSignUp.Save changes')}
          buttonStyle={styles.buttonstyle}
          onPress={() => submit()}
        />
      </View>
      {imagePicker ?
        <ImagePickerModal
          show={imagePicker}
          close={() => setImagePicker(false)}
          type={imageType}
          response={path => {
            if (imageType === 'shop-detail') {
              handleStates('image', path);
              setImage(path);
            }
            else return null
          }}
        /> : null}
      {/* <Loader loader={loader}></Loader> */}
    </View>

  );
};

const styles = StyleSheet.create({
  main: {
    height: '100%',
    backgroundColor: colors.GreyL,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  checkboxMain: {
    marginTop: hp(20),
  },

  mainimage: {
    height: hp(120),
    width: hp(120),
    borderRadius: hp(60),
    overflow: 'hidden',
  },
  viewimage: {
    alignItems: 'center',
    marginTop: vp(60),
  },
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(128),
    width: hp(128),
    borderRadius: hp(64),
    backgroundColor: colors.lightred,
  },
  viewicon: {
    height: hp(40),
    width: hp(40),
    borderRadius: hp(20),
    overflow: 'hidden',
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginRight: vp(138),
  },
  viewinput: {
    marginTop: vp(40),
  },
  container: {
    backgroundColor: colors.GreyL,
    height: hp(60),
    borderColor: colors.inputbordercol,
    borderRadius: hp(40),
    color: colors.black,
    borderWidth: hp(1),
    zIndex: 99,
    fontFamily: Font.regular,
    fontWeight: '200',
    fontStyle: 'normal',
    fontSize: fp(17),
    paddingLeft: wp(29),
    paddingRight: wp(15),
    // marginBottom: hp(8),
  },
  container22: {
    backgroundColor: colors.GreyL,
    // height: hp(60),
    borderColor: colors.inputbordercol,
    borderRadius: hp(40),
    color: colors.black,
    borderWidth: hp(1),
    zIndex: 99,
    fontFamily: Font.regular,
    // fontWeight: '200',
    fontStyle: 'normal',
    // fontSize: fp(17),
    paddingLeft: wp(29),
    paddingRight: wp(15),
    // marginBottom: hp(8),
  },
  viewone: {
    flex: 0.5,
    marginRight: vp(8),
  },
  viewtwo: {
    flex: 0.5,
    marginLeft: vp(8),
  },
  mainview: {
    flexDirection: 'row',
  },
  home: {
    fontSize: fp(18),
    color: colors.black,
    fontFamily: Font.regular,
  },
  submain: {
    // flex: 1,
    flexDirection: 'row',
    marginTop: vp(20),
    marginBottom: vp(20),
    // backgroundColor: 'red'
  },
  checkcon: {
    margin: 0,
    padding: 0,
    backgroundColor: colors.GreyL,
  },
  buttonstyle: {
    backgroundColor: colors.primary,
  },
  viewbutton: {
    marginTop: vp(20),
  },
  checkboxMain2: {
    marginTop: hp(25),
  },
  inputMain2: {
    marginTop: hp(35),
  },
  errorStyle: {
    color: colors.Secondary,
    // marginHorizontal: fp(4),
    marginTop: hp(10),
    fontFamily: Font.regular,
    fontSize: fp(14),
    // backgroundColor: 'red'
  },
});
export default ShopInfo;
