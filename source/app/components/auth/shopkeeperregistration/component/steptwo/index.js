import React from 'react';
import styles from '../steptwo/style';
import { Button, Image, Text, Input, Icon, CheckBox, Chip } from '@rneui/themed';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { base } from '../../../../../assets/global_style/base';
import { Icons, IconsType } from '../../../../../assets/global_style/icon';
import { Dimension } from '../../../../../assets/global_style/dimension';
import { colors } from '../../../../../assets/global_style/colors';
import { homeLabel } from '../../../../../assets/global_style/values/home';
import { fp, hp, vp, wp } from '../../../../../assets/global_style/fontsize';
import { useState } from 'react';
import { Images } from '../../../../../assets/global_style/images';
import SearchDropDown from '../../../../Helper/dropdown';
import { Font } from '../../../../../assets/global_style/fontfamily';
import { ButtonLabel } from '../../../../../assets/global_style/values/button';
import Validation from '../../../../Helper/Validations';
import shopkeeperAuthController from '../../../../../../apis/Controller/shopkeeper.auth.controller';
import { Toaster } from '../../../../Helper/Toaster';
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import { renderImage, timeFormatDisplay } from '../../../../Helper/general';
import Loader from '../../../../Helper/loader';
import ImagePickerModal from '../../../../Helper/imagePicker';
import { t } from 'i18next';

const ShopDetail = (props) => {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [shopCategories, setShopCategories] = useState([]);
  const [loader, setLoader] = useState(false);
  const [shopType, setShopType] = useState([]);
  const [shopkeeperType, setShopkeeperType] = useState([]);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [imagePicker, setImagePicker] = useState(false);
  const [imageType, setImageType] = useState(null);
  const [timeType, setTimeType] = useState(null);
  const [checkValue, setCheckValue] = useState(false);
  const [checkvalue2, setCheckValue2] = useState(false);

  useEffect(() => {
    getShopCategory();
    getShopType();
    getShopkeeperType();
  }, []);

  const [shouldShow, setShouldShow] = useState(false);
  const [shouldShow1, setShouldShow1] = useState(false);
  const [check1, setCheck1] = useState();
  const [check4, setCheck4] = useState();
  const [self, setSelf] = useState(false);
  const [thirdParty, setThirdparty] = useState(false);

  // const showTimePicker = () => {
  //   setTimePickerVisibility(true);
  // };

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

  let price = [
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

  const onRemoveItem = (item, index) => {
    const items = props.values.category.filter(sitem => sitem.id !== item.id);
    props.handleStates('category', items);
  };

  const [sort, setSort] = useState([
    { name: t('shopKeeperSignUp.Available'), value: 1, checked: false },
    { name: t('shopKeeperSignUp.Not Available'), value: 0, checked: false },
  ]);


  return (
    <View style={styles.main}>
      <View style={base.col12}>
        <View style={styles.cirContainer}>
          <View style={styles.circlMain}>
            <Image style={styles.userimageLogo}
              source={props.values.image ? renderImage(props.values.image) : Images.home}
              resizeMode="cover"
            />
          </View>
          <View style={styles.cirContainer2}>
            <TouchableOpacity onPress={() => (
              setImagePicker(true),
              setImageType('shop-detail')
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
          <Input
            selectionColor={colors.Secondary}
            keyboardType={'default'}
            autoCapitalize={false}
            value={props.values.shopName}
            autoCorrect={false}
            onChangeText={(e) => props.handleStates('shopName', e)}
            errorMessage={props.error.shopName && !props.error.shopName.isValid ? props.error.shopName.message : ''}
            placeholder={t('shopKeeperSignUp.Shop name')}
          />
        </View>
      </View>
      <View style={base.col12}>
        <SearchDropDown
          style={styles.dropdown2}
          value={props.values.category}
          title={null}
          placeholder={t('shopKeeperSignUp.Category')}
          list={shopCategories}
          // onChange={(e) => props.handleStates('category', e)}
          onChange={item => {
            const items = props.values.category
              ? props.values.category
              : [];
            let exist =
              props.values.category &&
              props.values.category.some(sitem => sitem.id === item.id);
            if (!exist) {
              items.push(item);
              props.handleStates('category', items);
            }
          }}
          errorMessage={props.error.category && !props.error.category.isValid ? props.error.category.message : ''}
          defaultValue={props.values.category && props.values.category.name}
        />
      </View>
      <View style={{ marginBottom: hp(20) }}>
        {props.values.category &&
          props.values.category.map((item, index) => (

            <Chip
              key={index}
              type="outline"
              containerStyle={{
                marginBottom: hp(10),
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
      </View>
      <View style={base.col12}>
        <Input
          selectionColor={colors.Secondary}
          keyboardType={'default'}
          autoCapitalize='none'
          autoCorrect={false}
          value={props.values.googleMapURL}
          onChangeText={(e) => props.handleStates('googleMapURL', e)}
          errorMessage={props.error.googleMapURL && !props.error.googleMapURL.isValid ? props.error.googleMapURL.message : ''}
          placeholder={t('shopKeeperSignUp.Google Map URL')}
        />

        {/* <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleConfirm1}
          onCancel={hideDatePicker}
        /> */}
      </View>
      <View style={base.col12}>
        <View style={base.row}>
          <View style={base.col12}>
            <SearchDropDown
              value={props.values.shopkeeperType}
              title={null}
              placeholder={t('shopKeeperSignUp.Shopkeeper Type')}
              list={shopkeeperType}
              onChange={(item) => props.handleStates('shopkeeperType', item)}
              errorMessage={props.error.shopkeeperType && !props.error.shopkeeperType.isValid ? props.error.shopkeeperType.message : ''}
              defaultValue={props.values.shopkeeperType && props.values.shopkeeperType.name}
            />
          </View>
          <View style={base.col12}>
            <SearchDropDown
              value={props.values.shopType}
              title={null}
              placeholder={t('shopKeeperSignUp.Shop Type')}
              list={shopType}
              onChange={(e) => props.handleStates('shopType', e)}
              errorMessage={props.error.shopType && !props.error.shopType.isValid ? props.error.shopType.message : ''}
              defaultValue={props.values.shopType && props.values.shopType.name}
            />
          </View>
        </View>
        <View style={base.col12}>
          <View style={base.row}>
            <View style={base.col6}>
              <TouchableOpacity   onPress={() => (showTimePicker(),
                      setTimeType('openTime'))}>
              <Input
                editable={false}
                selectionColor={colors.Secondary}
                keyboardType={'default'}
                autoCapitalize={false}
                autoCorrect={false}
                value={props.values.openTime}
                errorMessage={props.error.openTime && !props.error.openTime.isValid ? props.error.openTime.message : ''}
                placeholder={t('shopKeeperSignUp.Open time')}
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
            <View style={base.col6}>
            <TouchableOpacity   onPress={() => (showTimePicker(),
                      setTimeType('closeTime'))
                    }>
              <Input
                editable={false}
                selectionColor={colors.Secondary}
                keyboardType={'default'}
                autoCapitalize={false}
                autoCorrect={false}
                value={props.values.closeTime}
                errorMessage={props.error.closeTime && !props.error.closeTime.isValid ? props.error.closeTime.message : ''}
                placeholder={ t('shopKeeperSignUp.Close time')}
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
                    props.handleStates('openTime', timeFormatDisplay(e))
                  }
                  else {
                    props.handleStates('closeTime', timeFormatDisplay(e))
                  }
                  hideDatePicker();
                }}
                onCancel={hideDatePicker}
              />
            </View>
          </View>
        </View>
        <View style={base.col12}>
          <Input
            selectionColor={colors.Secondary}
            keyboardType={'default'}
            placeholder={t('shopKeeperSignUp.GST Number')}
            value={props.values.GSTNumber}
            onChangeText={(e) => props.handleStates('GSTNumber', e)}
            errorMessage={props.error.GSTNumber && !props.error.GSTNumber.isValid ? props.error.GSTNumber.message : ''}
          />
        </View>
        <View style={base.col12}>
          <Text style={styles.homeDeli}>{t('shopKeeperSignUp.Home delivery')}</Text>
        </View>
        <View style={styles.checkboxMain}>
          <View style={base.col12}>
            <View style={base.row}>
              {sort.map((item, index) => (
                <View key={index} style={base.col6}>
                  <CheckBox
                    containerStyle={{
                      alignItems: 'flex-start',
                      backgroundColor: 'transparent',
                      marginLeft: wp(0),
                    }}
                    title={item.name}
                    titleProps={{
                      style: item.checked === false ? { fontFamily: Font.regular, fontSize: fp(16), color: colors.lightgrey, paddingLeft: vp(12) } : { fontFamily: Font.semiBold, fontSize: fp(16), color: colors.lightgrey, paddingLeft: vp(12) }
                    }}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={item.checked}
                    checkedColor={colors.primary}
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
                      props.handleStates('homeDelivery', item.value);
                    }}
                  />
                </View>))}
            </View>
          </View>
        </View>
        {!props.error.homeDelivery.isValid ? (
          <Text style={styles.errorStyle}>
            {props.error.homeDelivery.message}
          </Text>
        ) : null}
        <View style={styles.checkboxMain2}>
          {props.values.homeDelivery === 1 ? (
            <View style={base.col12}>
              <View style={base.row}>
                <View style={base.col5}>
                  <CheckBox
                    containerStyle={{
                      alignItems: 'flex-start',
                      backgroundColor: 'transparent',
                      marginLeft: wp(0),
                    }}
                    title={t("shopKeeperSignUp.Self")}
                    titleProps={{
                      style: checkValue === true ?
                        {
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
                    checked={self}
                    // onPress={() => setSelf(!self)}
                    onPress={() => (props.handleStates('self', self === true ? 0 : 1),
                      setSelf(!self),
                      props.setCustomError(false),
                      setCheckValue(!checkValue)
                    )}
                    checkedColor={colors.primary}
                  />
                </View>
                <View style={styles.col7}>
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
                        }
                        :
                        {
                          fontFamily: Font.regular,
                          fontSize: fp(16),
                          color: colors.lightgrey,
                          paddingLeft: vp(12),
                        }
                    }}
                    checked={thirdParty}
                    // onPress={() => setThirdparty(!thirdParty)}
                    onPress={() => (props.handleStates('thirdparty', thirdParty === true ? 0 : 1),
                      setThirdparty(!thirdParty),
                      props.setCustomError(false),
                      setCheckValue2(!checkvalue2)
                    )}
                    checkedColor={colors.primary}
                  />
                </View>
              </View>
              {props.customError === true ?
                <Text style={styles.errorStyle2}>
                  This field is required.
                </Text> : null}
            </View>
          ) : null}
        </View>
        {props.values.homeDelivery === 1 && (thirdParty || self) ? <>
          <View style={styles.inputMain2}>
            <View style={base.col12}>
              <SearchDropDown
                value={props.values.deliverChargeType}
                title={null}
                placeholder={t("shopKeeperSignUp.Service Charge Type")}
                list={price}
                onChange={(item) => props.handleStates('deliverChargeType', item)}
                errorMessage={props.error.deliverChargeType && !props.error.deliverChargeType.isValid ? props.error.deliverChargeType.message : ''}
                defaultValue={props.values.deliverChargeType && props.values.deliverChargeType.name}
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
              value={props.values.deliverycharges}
              onChangeText={(e) => props.handleStates('deliverycharges', e)}
              errorMessage={props.error.deliverycharges && !props.error.deliverycharges.isValid ? props.error.deliverycharges.message : ''}
            />
          </View>
        </> : null}
        <View style={styles.buttonMain}>
          <View style={base.col12}>
            <Button
              title={t('shopKeeperSignUp.Submit')}
              buttonStyle={styles.button2}
              onPress={() => props.onSubmit()}
            />
          </View>
        </View>
        {imagePicker ?
          <ImagePickerModal
            show={imagePicker}
            close={() => setImagePicker(false)}
            type={imageType}
            response={path => {
              if (imageType === 'shop-detail') {
                props.handleStates('image', path)
              }
              else return null
            }}
          /> : null}
        <Loader loader={loader}></Loader>
      </View>
    </View>
  );
};
export default ShopDetail;
