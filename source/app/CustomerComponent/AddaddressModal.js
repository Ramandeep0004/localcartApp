import { Button, Icon, Input, Text } from '@rneui/themed';
import { t } from 'i18next';
import React, { useState } from 'react';
import {
  StyleSheet, TouchableOpacity, View
} from 'react-native';
import Modal from 'react-native-modal';
import { base } from '../assets/global_style/base';
import { colors } from '../assets/global_style/colors';
import { Dimension } from '../assets/global_style/dimension';
import { Font } from '../assets/global_style/fontfamily';
import { fp, hp, hzp, vp, wp } from '../assets/global_style/fontsize';
import { Icons, IconsType } from '../assets/global_style/icon';
import LocationService from '../components/Helper/loaction';
import { Toaster } from '../components/Helper/Toaster';
import Validation from '../components/Helper/Validations';

const AddAddressModal = props => {
  const [loader, setLoader] = useState(false);
  let defaultValues = {
    firstName: null,
    lastName: null,
    phoneNumber: null,
    address: null,
    village: null,
    city: null,
    district: null,
    state: null,
  };
  const [values, setValues] = useState(defaultValues);
  const [locationss, setLocationss] = useState(null);
  const [isError, setError] = useState({
    phoneNumber: {
      rules: ['min:10', 'max:10', 'numeric'],
      isValid: true,
      message: '',
    },
    address: {
      rules: ['required'],
      isValid: true,
      message: '',
    },
    village: {
      rules: ['required', 'numeric'],
      isValid: true,
      message: '',
    },
    city: {
      rules: ['required'],
      isValid: true,
      message: '',
    },
    district: {
      rules: ['required'],
      isValid: true,
      message: '',
    },
    state: {
      rules: ['required'],
      isValid: true,
      message: '',
    },
  });

  // const isFocus = useIsFocused();
  // useEffect(() => {
  //   LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  //   if (isFocus) {
  //     if (props.cpc) {
  //       let detail = props.cpc;
  //       setValues({
  //         ...values,
  //         commidityName: detail.commodity_name,
  //         quintal: detail.quantity_procurement_quintal,
  //         valueOfProcuremnet: detail.value_procurement,
  //         coverdArea: detail.acreage_covered_acres,
  //         numberOffarmers: detail.number_of_farmers_dealing,
  //       });
  //     }
  //   }
  // }, [props.cpc]);

  let validation = new Validation(isError);
  const handleChange = (field, value) => {
    let node = validation.validateField(field, value);
    setError({ ...isError, [field]: node });
    setValues({
      ...values,
      [field]: value ? value : null,
    });
  };

  const addCpc = async () => {
    let validation = new Validation(isError);
    let isValid = await validation.isFormValid(values);
    if (isValid && !isValid.haveError) {
      setLoader(true);
      let res = null;
      if (props.cpc) {
        // let post = { ...values };
        // post = { ...post, id: props.season };
        res = await new CpcController().editCpc(values, props.cpc.id);
      } else {
        let post = { ...values };
        post = { ...post, id: props.season };
        res = await new CpcController().addCpc(props.token, post);
      }

      if (res && res.status) {
        new Toaster().success(res.message);
        setValues(defaultValues);
        props.close();
        props.cpc ? props.editCpc(res.data) : props.getCpc(res.data);
      }
      setLoader(false);
    } else {
      setError({ ...isValid.errors });
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


  const getAddressDetail = (item) => {
    setLocationss(item);
    if (item) {
      setValues({
        ...values,
        village: { id: item.village_id, name: item.village_name },
        city: { id: item.city_id, name: item.city_name },
        district: { id: item.district_id, name: item.district_name },
        state: { id: item.state_id, name: item.state_name },
      })
    }
  };


  return (
    <>
      <Modal
        isVisible={props.open}
        style={styles.modal}
        backdropColor={colors.gray}
        backdropOpacity={0.85}>
        <View style={styles.listView}>
          <View style={styles.containerMain}>
            <View style={base.col12}>
              <View style={base.row}>
                <View style={base.col8}>
                  <View style={styles.titleMain}>
                    <Text style={styles.addComment}>{t("addressModal.Add address")}</Text>
                  </View>
                </View>
                <View style={base.col4}>
                  <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => props.close()}>
                      <View style={styles.viewicon}>
                        <Icon
                          type={IconsType.antDesign}
                          name={Icons.close}
                          size={Dimension.smallicon}
                          color={colors.white}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.inputMain}>
              <View style={base.col12}>
                <Input
                  selectionColor={colors.Secondary}
                  placeholder={t("addressModal.Address/nearby")}
                  value={values.address}
                  errorMessage={
                    !isError.address.isValid
                      ? isError.address.message
                      : null
                  }
                  onChangeText={e => handleChange('address', e)}
                />
              </View>
              <View style={base.col12}>
                <TouchableOpacity onPress={() => props.navigation.navigate('selectstate', { selectLoc: getAddress, addressDeatil: getAddressDetail, from: "shophomescreen" })}>
                  <Input
                    selectionColor={colors.Secondary}
                    placeholder={t("addressModal.Village")}
                    value={values.village && values.village.name}
                    editable={false}
                    errorMessage={
                      !isError.village.isValid
                        ? isError.village.message
                        : null
                    }
                    onChangeText={e => handleChange('village', e)}
                  />
                </TouchableOpacity>
              </View>
              <View style={base.col12}>
                <View style={base.row}>
                  <View style={base.col6}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('selectstate', { selectLoc: getAddress, addressDeatil: getAddressDetail, from: "shophomescreen" })}>
                      <Input
                        selectionColor={colors.Secondary}
                        placeholder={t("addressModal.City")}
                        value={values.city && values.city.name}
                        editable={false}
                        errorMessage={
                          !isError.city.isValid
                            ? isError.city.message
                            : null
                        }
                        onChangeText={e => handleChange('city', e)}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={base.col6}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('selectstate', { selectLoc: getAddress, addressDeatil: getAddressDetail, from: "shophomescreen" })}>
                      <Input
                        selectionColor={colors.Secondary}
                        placeholder={t("addressModal.District")}
                        value={values.district && values.district.name}
                        editable={false}
                        errorMessage={
                          !isError.district.isValid
                            ? isError.district.message
                            : null
                        }
                        onChangeText={e => handleChange('district', e)}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={base.col12}>
                <TouchableOpacity onPress={() => props.navigation.navigate('selectstate', { selectLoc: getAddress, addressDeatil: getAddressDetail, from: "shophomescreen" })}>
                  <Input
                    selectionColor={colors.Secondary}
                    placeholder={t("addressModal.State")}
                    value={values.state && values.state.name}
                    editable={false}
                    errorMessage={
                      !isError.state.isValid
                        ? isError.state.message
                        : null
                    }
                    onChangeText={e => handleChange('state', e)}
                  />
                </TouchableOpacity>
              </View>
              <View style={base.col12}>
                <Input
                  selectionColor={colors.Secondary}
                  placeholder={t("addressModal.Phone number (Optional)")}
                  value={values.phoneNumber}
                  maxLength={10}
                  errorMessage={
                    !isError.phoneNumber.isValid
                      ? isError.phoneNumber.message
                      : null
                  }
                  onChangeText={e => handleChange('phoneNumber', e)}
                />
              </View>

            </View>
            <View style={styles.buttomMain}>
              <View style={base.col12}>
                <Button buttonStyle={styles.buttonContainer}
                  title={t("addressModal.Save")}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttomMain: {
    marginTop: hp(15),
  },
  inputMain: {
    marginTop: hp(40),
  },
  buttonContainer: {
    backgroundColor: colors.primary,
  },
  iconContainer: {
    alignItems: 'flex-end',
  },
  containerMain: {
    marginBottom: hp(24),
    marginTop: hp(22),
    paddingHorizontal: hzp(20),
  },
  addComment: {
    fontSize: fp(24),
    fontFamily: Font.semiBold,
    color: colors.darkblack,
  },
  listMain: {
    paddingTop: hp(8),
    paddingBottom: hp(10),
  },

  cancle: {
    paddingLeft: wp(8),
    fontSize: fp(18),
    fontFamily: Font.regular,
    color: colors.white,
  },
  listView: {
    width: '98%',
    borderRadius: hp(15),
    backgroundColor: colors.GreyL,
  },

  viewicon: {
    height: hp(40),
    width: hp(40),
    borderRadius: hp(20),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  mainicon: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: vp(10),
    marginBottom: vp(100),
  },
  titleMain: {
    marginTop: vp(5),
  },
});

export default AddAddressModal;
