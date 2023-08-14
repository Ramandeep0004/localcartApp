import { useIsFocused } from '@react-navigation/native';
import { CheckBox } from '@rneui/base';
import { Button, Icon, Image, Input, Text, Tooltip } from '@rneui/themed';
import { t } from 'i18next';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Linking } from 'react-native';
import { Modal } from 'react-native';
import {
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux';
import filtersController from '../../../../apis/Controller/actionController';
import AddressController from '../../../../apis/Controller/address.controller';
import OrderController from '../../../../apis/Controller/order.controller';
import shopsController from '../../../../apis/Controller/shops.controller';
import { base } from '../../../assets/global_style/base';
import { colors } from '../../../assets/global_style/colors';
import { Dimension } from '../../../assets/global_style/dimension';
import { Font } from '../../../assets/global_style/fontfamily';
import { fp, hp, vp, wp } from '../../../assets/global_style/fontsize';
import { Icons, IconsType } from '../../../assets/global_style/icon';
import { Images } from '../../../assets/global_style/images';
import AddressModal from '../../../CustomerComponent/Addressmodal';
import ItemModal from '../../../CustomerComponent/ItemModal';
import OrderRequestModal from '../../../CustomerComponent/OrderRequest';
import AddComment from '../../../ShopComponent/AddComment';
import BillItem from '../../../ShopComponent/BillItems';
import UpdateEditList from '../../../ShopComponent/updateItemArrayList';
import { newdateformat, time12hr } from '../../Helper/date.formats';
import { checkCurrentDAte, checkCurrentTimedate, comapareTwoTimes, compareObj, isEmptyObj, renderImage, UrlName } from '../../Helper/general';
import ImagePickerModal from '../../Helper/imagePicker';
import Loader from '../../Helper/loader';
import { finaltotalPrice, finaltotalPricePercentage, finaltotalPriceType, totalPrice, findPercentage, subTotalPrice } from '../../Helper/orderHelpers';
import { Toaster } from '../../Helper/Toaster';
import Validation from '../../Helper/Validations';
import styles from './style';

const CustomerOrderEdit = props => {
  const navparams = props && props.route && props.route.params && props.route.params.item;
  const navparamRepeat = props && props.route && props.route.params && props.route.params.repeat;
  const [verify, setVerify] = useState(false);
  const [addressList, setAddressList] = useState(false);
  const [addressLists, setAddressLists] = useState([]);
  const [serviceChargesPrice, setServiceChargesPrice] = useState(null);
  const [savedAddress, setSavedAddress] = useState({});
  const [addAddress, setAddAddress] = useState(false);
  const [loader, setLoader] = useState(false);
  const [commentt, setComment] = useState(false);
  const [imagePicker, setImagePicker] = useState(false);
  const [pharmacyItem, setPharmacyItem] = useState(false);
  const [notevalue, setNoteValue] = useState(false);
  const value = props && props.products;
  const add = props && props.savedAddress;
  const [cartArray, setCartArray] = useState([]);
  const [shopDetail, setShopDetail] = useState();
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [productDetailId, setProductDetailId] = useState(null);
  const [productDetailPopup, setProductDetailPopup] = useState(false);
  const [storedObject, setStoredObject] = useState(null);
  const [totalValue, setTotalvalue] = useState(0);
  const [subTotal, setSubTotal] = useState(null);
  const [finalTotalValue, setFinalTotalvalue] = useState(null);
  const [extraCharges, setExtraCharges] = useState(null);
  const [finaltotalValueOnExtraCharges, setFinalTotalValueOnExtraCharges] = useState(null);

  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState([
    { name: t('orderSummary.Home Delivery'), value: 1, checked: false },
    { name: t('orderSummary.Pickup'), value: 0, checked: false },
  ]);

  let defaultValues = {
    shopId: null,
    itemsArr: [],
    address: null,
    deliveryDate: null,
    deliveryTime: null,
    orderPrec: null,
    note: null,
    serviceCharges: null,
    deliveryCharges: null,
    amount: null,
    grandTotal: null,
    deliveryType: null,
    paymentMethod: null,
  }
  const [values, setValues] = useState(defaultValues);

  const [isError, setError] = useState({
    shopId: {
      rules: [],
      isValid: true,
      message: "",
    },
    itemsArr: {
      rules: [],
      isValid: true,
      message: "",
    },
    address: {
      rules: [],
      isValid: true,
      message: "",
    },
    deliveryDate: {
      rules: ["required"],
      isValid: true,
      message: "",
    },
    deliveryTime: {
      rules: ["required"],
      isValid: true,
      message: "",
    },
    orderPrec: {
      rules: [],
      isValid: true,
      message: "",
    },
    note: {
      rules: [],
      isValid: true,
      message: "",
    },
    serviceCharges: {
      rules: [],
      isValid: true,
      message: "",
    },
    amount: {
      rules: [],
      isValid: true,
      message: "",
    },
    grandTotal: {
      rules: [],
      isValid: true,
      message: "",
    },
    deliveryType: {
      rules: [],
      isValid: true,
      message: "",
    },
    paymentMethod: {
      rules: [],
      isValid: true,
      message: "",
    },
  })

  let Validations = new Validation(isError)

  const handleChange = (name, value) => {
    let check = Validations.validateField(name, value)
    setError({ ...isError, [name]: check })
    setValues({ ...values, [name]: value })
  };

  const isFocus = useIsFocused();
  useEffect(() => {
    if (isFocus) {
      getOrderDetails();
      getAddressList();
      getAddressFromSyncStorage();
      getServicesCharges();
      isExist();
      setSubTotal(null);
      setOpen(false);
    }
  }, [isFocus]);

  useEffect(() => {
    if (isFocus) {
      handleTotal();
      isExist();
    }
  }, [isFocus, cartArray,]);

  useEffect(() => {
    if (totalValue) {
      handleFinalTotal();
    }
  }, [totalValue, shopDetail, serviceChargesPrice, values.deliveryType]);


  useEffect(() => {
    if (cartArray) {
      handleItemNewArray();
      setCartArray(cartArray);
    }
  }, [cartArray]);


  useEffect(() => {
    if (cartArray) {
      handleItemNewArray();
    }
  }, [cartArray]);


  useEffect(() => {
    if (values && shopDetail) {
      handleSubTotal();
    }
  }, [values, shopDetail]);


  useEffect(() => {
    if (values && parseInt(values.deliveryType) === 1) {
      if ((savedAddress && savedAddress.cityId) && shopDetail) {   //if the user change the address
        if (shopDetail.address && (parseInt(shopDetail.address.city_id) !== parseInt(savedAddress.cityId))) {
          getExtraChargesAmount();
        }
        else if (parseInt(savedAddress.cityId) === parseInt(shopDetail.address.city_id)) {
          setExtraCharges(null);        //if user add the delivery addrres for same as shopkeeper city 
        }
        else return;
      }
      else return;
    }
    else if (values && parseInt(values.deliveryType) === 0) {
      return setExtraCharges(null);
    }
    else return;
  }, [shopDetail, savedAddress && savedAddress.cityId, values.deliveryType, finalTotalValue]);


  useEffect(() => {
    if (extraCharges && finalTotalValue || extraCharges === null && finalTotalValue) {
      handleFinalTotalOnExtraCharges();
    }
  }, [extraCharges, finalTotalValue, savedAddress && savedAddress.cityId]);


  const getAddressList = async () => {
    let response = await AddressController.addressList();
    if (response && response.status) {
      let list = response.listing;
      for (let i in list) {
        let existed_item = add
        if (existed_item.id === list[i].id) {
          list[i]['checked'] = existed_item && existed_item.checked ? existed_item.checked : false;
        } else {
          list[i]['checked'] = false;
        }
      }
      setAddressLists(list);
    } else {
      setAddressLists([]);
    }
  };


  const getData = async (e) => {
    let post = {
      id: e ? e : null,
      category: []
    };

    let response = await new shopsController.shopDetail(post)
    if (response && response.status) {
      setShopDetail(response && response.shop);
    }
    setLoader(false)
  };


  const getOrderDetails = async () => {
    setLoader(true);
    let response = await OrderController.orderDetails(navparams);
    if (response && response.status) {
      let data = response.page;
      getData(data.shop_id);
      let arr = [];
      let ind = data.items;
      setExtraCharges(data.extra_charges !== "" | data.extra_charges !== null ? data.extra_charges : null);
      ind.map(item => arr.push({
        id: item.product_id,
        shop_id: data.shop_id,
        title: item.products_title,
        units: item.products_units,
        image: item.products_image,
        status: item.status,
        price: item.products_price ? parseInt(item.products_price) : '',
        quantity: parseInt(item.quantity),
        comment: item.comment,
        is_prec: item.is_prec,
        request_type: item.request_type ? item.request_type : '',
        item_request_id: item.id ? item.id : ''
      }));
      let orderDetail = {
        ...values,
        shopId: data.shop_id ? data.shop_id : null,
        itemsArr: arr ? arr : [],
        address: data.address ? data.address : null,
        deliveryDate: data.pickup_date ? data.pickup_date : null,
        deliveryTime: data.pickup_time ? data.pickup_time : null,
        orderPrec: data.order_prec ? data.order_prec : null,
        note: data.notes ? data.notes : null,
        serviceCharges: data.service_charge ? data.service_charge : null,
        deliveryCharges: data.delivery_charges ? data.delivery_charges : 0,
        amount: data.amount ? data.amount : null,
        grandTotal: data.total_amount ? data.total_amount : null,
        deliveryType: data.delivery_type ? data.delivery_type : 0,
        paymentMethod: null,
        extraCharges: data.extra_charges !== "" | data.extra_charges !== null ? data.extra_charges : null
      }
      setValues(orderDetail)
      setShopDetail(data);
      setSavedAddress(data.address ? {
        address: data.address,
        cityId : data.address_detail && data.address_detail.city ? data.address_detail.city : null,
        id : data.address_detail && data.address_detail.id ? data.address_detail.id : null
      } : {});
      setCartArray(arr);
      let array = [...sort];
      array.map(e => {
        if (e.value == data.delivery_type) {
          e.checked = true;
        }
        else {
          e.checked = false;
        }
      });
      setSort(array);
      setLoader(false);
      setStoredObject(orderDetail)
    } else {
      setLoader(false);
    }
  };
 


  const getServicesCharges = async () => {
    let response = await filtersController.settings();
    if (response && response.status) {
      setServiceChargesPrice(response.data);
    } else {
      setServiceChargesPrice(null);
    }
  };


  const getAddressFromSyncStorage = async () => {
    let response = await filtersController.getAddress();
    if (response) {
      let obj = {
        address: response.address + ', ' + response.village_name + ', ' + response.cities_name + ', ' + response.district_name + ', ' + response.state_name,
        cityId: response.city ? response.city : null,
        id : response.id ? response.id : null
      }
      setSavedAddress(obj);
      setValues({
        ...values,
        address: obj.address,
      })
      await new filtersController.setSavedAddresss(response);
    } else {
      setSavedAddress(null);
    }
  };


  const handleAddress = () => {
    setAddressList(false)
    setAddAddress(true)
  };


  const saveAdd = async (data) => {
    let item = { ...data, checked: data.checked = true }
    await new filtersController.setSavedAddresss(item);
    let arrray = [...addressLists];
    arrray.map(e => {
      if (e.id == item.id) {
        e.checked = true;
      }
      else {
        e.checked = false;
      }
    });
    setAddressLists(arrray)
    setAddressList(false)
    getAddressFromSyncStorage();
  }

  
  const handleItemNewArray = async () => {
    let item = [...cartArray]
    let arraay = [];
    item.map(e => {
      if (e) {
        arraay.push({
          ...e,
          // item_name: e.title,
          // product_id: e.id,
          // weight: e.units,
          // quantity: e.quantity,
          comment: e.comment ? e.comment : '',
          // price: e.price,
          // request_type: e.request_type ? e.request_type : '',
          // item_request_id: e.item_request_id ? e.item_request_id : ''
        })
      }
    });
    handleChange('itemsArr', arraay);
  }

  const handleTotal = () => {
    let totall = totalPrice(cartArray);
    setTotalvalue(totall);
    handleChange('amount', totall)
  };


  const handleFinalTotal = () => {
    if (parseInt(values.deliveryType) === 1 || values.deliveryType === null) {
      if (shopDetail && shopDetail.delivery_charge_type === 'percentage') {
        let total = finaltotalPricePercentage(totalValue, shopDetail && shopDetail.delivery_charge ? parseInt(shopDetail.delivery_charge) : 0, parseInt(serviceChargesPrice && serviceChargesPrice.service_charge));
        handleChange('grandTotal', total)
        setFinalTotalvalue(total);
      } else {
        let total = finaltotalPrice(totalValue, shopDetail && shopDetail.delivery_charge ? parseInt(shopDetail.delivery_charge) : 0, parseInt(serviceChargesPrice && serviceChargesPrice.service_charge));
        handleChange('grandTotal', total)
        setFinalTotalvalue(total);
      }
    } else {
      let total = finaltotalPriceType(totalValue, parseInt(serviceChargesPrice && serviceChargesPrice.service_charge));
      handleChange('grandTotal', total)
      setFinalTotalvalue(total);
    }
  };

  const handleSubTotal = () => {
    let serviceCharges = values && values.serviceCharges ? parseInt(values && values.serviceCharges) : 0
    let deliveryCharges = values && values.deliveryCharges ? parseInt(values.deliveryCharges) : 0
    if (parseInt(values.deliveryType) === 1 || values.deliveryType === null) {
      if (shopDetail && shopDetail.delivery_charge_type === 'percentage') {
        let total = subTotalPrice(serviceCharges, 0);
        setSubTotal(total);
      } else {
        let total = subTotalPrice(serviceCharges, deliveryCharges);
        setSubTotal(total);
      }
    } else {
      let total = subTotalPrice(serviceCharges, 0)
      setSubTotal(total);
    }
  };


  const getExtraChargesAmount = () => {
      let extraServices = "10%"
      let amount = findPercentage(finalTotalValue, parseInt(extraServices));
      if (amount) {
        setExtraCharges(amount);
      }
      else {
        setExtraCharges(null);
      }
  };


  const handleFinalTotalOnExtraCharges = () => {
    if (extraCharges) {
      let amount = finaltotalPriceType(parseInt(finalTotalValue), parseInt(extraCharges));
      if (amount) {
        setFinalTotalValueOnExtraCharges(amount);
      }
      else {
        setFinalTotalValueOnExtraCharges(null);
      }
    }
    else {
      setFinalTotalValueOnExtraCharges(null);
    }
  };


  const submit = async () => {
    let error = { ...isError };
    if (shopDetail && parseInt(shopDetail.home_delivery) === 1) {
      error = {
        ...error,
        deliveryType: {
          rules: ['required'],
          isValid: true,
          message: '',
        },
      };
    } else {
      error = {
        ...error,
        deliveryType: {
          rules: [],
          isValid: true,
          message: '',
        },
      };
    }
    let validtn = new Validation(error);
    let isValid = await validtn.isFormValid(values)
    let val = { ...values, orderStatus: 0, amount: totalValue }
    let val2 = { ...values, orderStatus: 0, amount: totalValue, deliveryCharges: shopDetail && shopDetail.delivery_charge_type === 'fixed_price' ? shopDetail && shopDetail.delivery_charge : shopDetail && shopDetail.delivery_charge ? shopDetail.delivery_charge : null }
    if (isValid && !isValid.haveError) {
      if (checkCurrentDAte(values.deliveryDate) && checkCurrentTimedate(values.deliveryTime)) {
        new Toaster().error(t('orderSummary.Please select Future Time above 30 mins from current time'));
      } else if (((parseInt(values.deliveryType) === 0 || parseInt(shopDetail.home_delivery) === 0) && comapareTwoTimes(values.deliveryTime, shopDetail.shop_open_time))) {
        new Toaster().error(t("orderSummary.Pickup time should be in between shop's open and close time."));
      } else if (((parseInt(values.deliveryType) === 0 || parseInt(shopDetail.home_delivery) === 0) && !comapareTwoTimes(values.deliveryTime, shopDetail.shop_close_time))) {
        new Toaster().error(t("orderSummary.Pickup time should be in between shop's open and close time."));
      } else {
        if (parseInt(values.deliveryType) === 1 && (values.address === null || values.address === '')) {
          new Toaster().error(t('orderSummary.Please select the delivery address'));
        } else {
          if (navparamRepeat) {
            setLoader(true)
            let response = await OrderController.savedCreateOrder(navparams, parseInt(values.deliveryType) === 1 ? val2 : val,  extraCharges, savedAddress);
            if (response && response.status) {
              new Toaster().success(response.message);
              setLoader(false);
              // props.navigation.reset({
              //   index: 1,
              //   routes: [{ name: 'customerhome' }, { name: 'customermyorder' }]
              // })
              props.navigation.goBack();
              setValues({
                ...values,
                shopId: null,
                itemsArr: [],
                address: null,
                deliveryDate: null,
                deliveryTime: null,
                orderPrec: null,
                note: null,
                serviceCharges: null,
                deliveryCharges: null,
                amount: null,
                grandTotal: null,
                deliveryType: null,
                paymentMethod: null,
              });
            } else {
              setLoader(false);
            }
          } else {
            setLoader(true)
            let response = await OrderController.createOrderRequest(navparams, parseInt(values.deliveryType) === 1 ? val2 : val, extraCharges, savedAddress);
            if (response && response.status) {
              new Toaster().success(response.message);
              setLoader(false);
              props.navigation.goBack();
              setValues({
                ...values,
                shopId: null,
                itemsArr: [],
                address: null,
                deliveryDate: null,
                deliveryTime: null,
                orderPrec: null,
                note: null,
                serviceCharges: null,
                deliveryCharges: null,
                amount: null,
                grandTotal: null,
                deliveryType: null,
                paymentMethod: null,
              });
            } else {
              setLoader(false);
            }

          }
        }
      }
    }
    else {
      setError({ ...isValid.errors })
    }
  };


  const handleCallAcivity = (nmbr) => {
    let phoneNumber = '';
    if (nmbr) {
      if (Platform.OS === 'android') {
        phoneNumber = `tel:${nmbr}`;
      }
      else {
        phoneNumber = `telprompt:${nmbr}`;
      }
      Linking.openURL(phoneNumber);
    }
    else {
      new Toaster().error('No Contact Number Found')
    }
  };

  const tomorroww = moment().add(1, 'day').format('YYYY-MM-DD')

  const isExist = () => {
    let result = false;
    let myArray = [...cartArray]
    for (let i = 0; i < myArray.length; i++) {
      if (parseInt(myArray[i].is_prec) === 1) {
        result = true;
        setPharmacyItem(true);
        break;
      }
      else {
        result = false;
        setPharmacyItem(false);
      }
    }
    return result
  };


  const handleProductDetailPage = (e) => {
    setProductDetailId(e)
    setProductDetailPopup(true)
  };


  const handlesubmitted = () => {
    if (compareObj(storedObject, values)) {
      new Toaster().error('No changes found on this order')
    } else {
      submit();
    }
  };

  return (
    <>
      <View style={styles.main}>
        <ScrollView
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={styles.scrollContainer}>
          <View style={styles.main}>
            <View style={styles.viewdelivery}>
              <Text style={styles.delivery}>{(parseInt(values.deliveryType) === 1 || values.deliveryType === null) ? t('orderSummary.Delivery Address') : t('orderSummary.Pickup Address')}</Text>
              {parseInt(values.deliveryType) === 1 || values.deliveryType === null ? <View style={styles.mainview}>
                <View style={styles.mainone}>
                  {savedAddress && !isEmptyObj(savedAddress) ? <Text style={styles.textline} >{savedAddress.address}</Text> : <Text style={styles.textline}>{t("orderSummary.Select Address")} </Text>}
                </View>
                <View style={styles.maintwo}>
                  <TouchableOpacity onPress={() => {
                    setAddressList(true)
                  }}>
                    <Icon type={IconsType.simpleLineIcon}
                      name={Icons.pencil}
                      color={colors.black}
                      size={Dimension.smallicon}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
              </View> : null}
              <View style={parseInt(values.deliveryType) === 0 ? styles.viewgrey22 : styles.viewgrey}>
                <View style={base.col12}>
                  <View style={[base.row, { justifyContent: 'center', alignItems: 'center' }]}>
                    <View style={styles.MainImage}>
                      <Image
                        style={styles.image}
                        source={shopDetail && shopDetail.image ? renderImage(shopDetail.image, "medium") : Images.dummyShop}
                        resizeMode='cover'
                      />
                    </View>
                    <View style={styles.MainView}>
                      <View style={styles.Vone}>
                        {shopDetail && shopDetail.shop_name ? <Text style={styles.bablu}>{shopDetail.shop_name}</Text> : null}
                        {shopDetail && shopDetail.shopkeeper_type && shopDetail.user ? <Text style={styles.arnav}>{shopDetail.user && shopDetail.user.first_name ? shopDetail.user.first_name : null}{' '}{shopDetail.user && shopDetail.user.last_name ? shopDetail.user.last_name : null}{' '}({shopDetail.shopkeeper_type ? shopDetail.shopkeeper_type.title : null}) </Text> : null}
                        {shopDetail && shopDetail.shop_open_time && shopDetail.shop_close_time ?
                          <Text style={styles.arnav}>Shop Time: {shopDetail && shopDetail.shop_open_time && shopDetail.shop_open_time} - {shopDetail && shopDetail.shop_close_time && shopDetail.shop_close_time} </Text> : null}
                      </View>
                      <View style={styles.Vtwo}>
                        {
                          shopDetail && parseInt(shopDetail.status) === 1 ?
                            <TouchableOpacity onPress={() => handleCallAcivity(shopDetail.user.user_phonenumber ? shopDetail.user.user_phonenumber : '')}>
                              <View style={styles.Viewicon}>
                                <Icon type={IconsType.feather}
                                  name={Icons.phone}
                                  size={Dimension.smallicon}
                                  color={colors.white}
                                />
                              </View>
                            </TouchableOpacity>
                            :
                            <View style={styles.Viewicon2}>
                              <Tooltip
                                visible={open}
                                containerStyle={styles.tooltipMain}
                                onOpen={() => {
                                  setOpen(true);
                                }}
                                onClose={() => {
                                  setOpen(false);
                                }}
                                popover={
                                  <Text style={styles.tooltipText}>
                                    {
                                      t('tooltip.Shop is currently closed.You may contact when the shop is open.')
                                    }
                                  </Text>
                                }
                                height={hp(70)}
                                width={hp(280)}
                                withOverlay={false}
                                backgroundColor={colors.lightprimary}
                              >
                                <Icon
                                  type={IconsType.feather}
                                  name={Icons.phone}
                                  size={Dimension.smallicon}
                                  color={colors.white}
                                />
                              </Tooltip>
                            </View>
                        }
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={base.col12}>
                <View style={styles.viewinfo}>
                  <Text style={styles.delivery}>{cartArray && cartArray.length} {cartArray && cartArray.length > 1 ? t('orderSummary.Items') : t('orderSummary.Item')} </Text>
                </View>
              </View>
              <View style={base.col12}>
                <View style={styles.viewbonn}>
                  <UpdateEditList
                    data={cartArray}
                    shopDetail={shopDetail}
                    action={(e) => handleProductDetailPage(e)}
                    setCartArray={(e) => setCartArray(e)}
                  />
                </View>
              </View>
            </View>
            <View style={base.container}>
              <View style={styles.viewinfo}>
                <Text style={styles.delivery}>{t('orderSummary.Delivery info')}</Text>
              </View>
              {shopDetail && parseInt(shopDetail.home_delivery) === 1 ? <View style={styles.submain}>
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
                        style: { fontFamily: Font.regular, fontSize: fp(16), color: colors.lightgrey, paddingLeft: vp(12) }
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
                        handleChange('deliveryType', item.value);
                      }}
                    />
                  </View>))}
              </View> :
                <View style={styles.nodelivery22}>
                  <Text style={styles.fusce}>{t("orderSummary.Home Delivery is not available for this shop, please pickup your order on time.")}</Text>
                </View>}
              {!isError.deliveryType.isValid ? (
                <Text style={styles.errorStyle}>
                  {isError.deliveryType.message}
                </Text>
              ) : null}
              <View style={[base.subrow, styles.buttonMain]}>
                <View style={base.col6}>
                  <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                    <Input
                      disabled={true}
                      selectionColor={colors.Secondary}
                      keyboardType={'default'}
                      autoCapitalize={false}
                      autoCorrect={false}
                      placeholder={values.deliveryType === 1 || values.deliveryType === null ? t("orderSummary.Delivery Date") : t("orderSummary.Pickup Date")}
                      inputContainerStyle={styles.inputCon}
                      errorStyle={styles.error}
                      rightIcon={
                        <Icon
                          type={IconsType.material}
                          name={Icons.arrowdropdown}
                          color={colors.black}
                          size={Dimension.Large1}
                        />
                      }
                      value={newdateformat(values.deliveryDate)}
                      errorMessage={
                        !isError.deliveryDate.isValid
                          ? isError.deliveryDate.message
                          : null
                      }
                      onChangeText={e => handleTimes('deliveryDate', e)}
                    />


                  </TouchableOpacity>
                </View>
                <View style={base.col6}>
                  <TouchableOpacity onPress={() => {
                    if (values.deliveryDate === null || values.deliveryDate === '') {
                      new Toaster().success(t('orderSummary.Please first select the delivery/pickup date'));
                    } else {
                      setTimePickerVisibility(true)
                    }

                  }}>
                    <Input
                      disabled={true}
                      selectionColor={colors.Secondary}
                      keyboardType={'default'}
                      autoCapitalize={false}
                      autoCorrect={false}
                      placeholder={values.deliveryType === 1 || values.deliveryType === null ? t("orderSummary.Delivery Time") : t("orderSummary.Pickup Time")}
                      inputContainerStyle={styles.inputCon}
                      errorStyle={styles.error}
                      rightIcon={
                        <Icon
                          type={IconsType.material}
                          name={Icons.arrowdropdown}
                          color={colors.black}
                          size={Dimension.Large1}
                        />
                      }
                      value={values.deliveryTime}
                      errorMessage={
                        !isError.deliveryTime.isValid
                          ? isError.deliveryTime.message
                          : null
                      }
                      onChangeText={e => handleChange('deliveryTime', time12hr(e))}
                    />


                  </TouchableOpacity>
                </View>

              </View>
              {shopDetail && parseInt(shopDetail.status) === 0 ? <View style={styles.shopOff}>
                <View style={styles.nodelivery}>
                  <Text style={styles.fusce22}>{t("orderSummary.The shop is closed now, your order will be deliverd in next date's.")}</Text>
                </View>
              </View> : null}
              <View style={styles.line} />
              <View style={styles.mainnote}>
                <View style={styles.noteone}>
                  <Text style={styles.note}>{t("orderSummary.Add Notes (if any)")}</Text>
                </View>
                <View style={styles.notetwo}>
                  <Icon type={IconsType.simpleLineIcon} name={Icons.pencil} color={values.note ? colors.white : colors.black} size={Dimension.smallicon} style={values.note ? styles.icon2 : styles.icon} onPress={() => setNoteValue(!notevalue)} />
                </View>
              </View>
              {notevalue ? <View style={styles.input}>
                <Input
                  placeholder={t('orderSummary.Enter your Note here..')}
                  errorStyle={styles.error}
                  value={values.note}
                  errorMessage={
                    !isError.note.isValid
                      ? isError.note.message
                      : null
                  }
                  onChangeText={e => handleChange('note', e)}
                />
              </View> : null}
              {pharmacyItem && <>
                {values.orderPrec ?
                  <TouchableOpacity onPress={() => setImagePicker(true)}>
                    <DropShadow style={styles.Shadow}>
                      <View style={styles.Con}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                          <View style={{ flex: 8 }}>
                            <View style={{ flexDirection: 'row' }}>
                              <Icon type={IconsType.ionIcon} name={Icons.documenttextoutline} color={colors.black} size={Dimension.docicon} />
                              <Text style={styles.img} numberOfLines={1}>{values.orderPrec ? UrlName(values.orderPrec) : t('Your Bill')}</Text>
                            </View>
                            {/* <Text style={styles.date}>25 april 2020</Text> */}
                          </View>
                          <View style={{ flex: 2, }}>
                            <View style={styles.viewcircle}>
                              <View style={styles.circle}>
                                <Icon type={IconsType.antDesign} name={Icons.close} size={Dimension.smallicon} color={colors.black} onPress={() => setValues({
                                  ...values,
                                  orderPrec: null
                                })} />
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </DropShadow>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity onPress={() => setImagePicker(true)}>
                    <View style={styles.submainImage}>
                      <Icon type={IconsType.antDesign} name={Icons.upload} size={Dimension.docicon} color={colors.black} />
                      <Text style={styles.upload}>{t("orderSummary.Upload Precautions")}</Text>
                    </View>
                  </TouchableOpacity>
                }
              </>}
              {pharmacyItem ?
                <View style={styles.precautionItem}>
                  <View style={styles.nodelivery}>
                    <Text style={styles.fusce22}>{t("orderSummary.We are not responsible for any false delivery.")}</Text>
                  </View>
                </View> : null}
              <View style={styles.viewbill}>
                <BillItem
                  type={values.deliveryType}
                  totalValue={totalValue}
                  finalTotalValue={finalTotalValue}
                  forHandlePriceToggle={finalTotalValue ? "forhandleItemTotalNadBillTotal--AccordingToPriceON-OFF-Toggle" : null}
                  serviceChargesPrice={serviceChargesPrice}
                  delivery_charges={shopDetail && shopDetail.delivery_charge ? shopDetail.delivery_charge : 0}
                  delivery_charge_type={shopDetail && shopDetail.delivery_charge_type}
                  shopDetail={shopDetail}
                  subTotal={subTotal}
                  extraCharges={extraCharges}
                  finaltotalValueOnExtraCharges={finaltotalValueOnExtraCharges}
                />
              </View>
              <View style={styles.mainbutton}>
                <View style={base.col12}>
                  <View style={base.row}>
                    <View style={base.col6}>
                      <Button
                        buttonStyle={styles.buttonContainer1}
                        titleStyle={styles.buttonTitle1}
                        title={t("orderSummary.Cancel")}
                        onPress={() => props.navigation.goBack()}
                      />
                    </View>
                    <View style={base.col6}>
                      <Button
                        buttonStyle={styles.buttonContainer2}
                        title={t("orderSummary.Submit")}
                        onPress={() => handlesubmitted()}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>

          </View>
        </ScrollView>
        {verify ? (
          <OrderRequestModal
            navigation={props.navigation}
            open={verify}
            close={() => setVerify(false)}
          />
        ) : null}
        {addressList ? <AddressModal
          open={addressList}
          addressLists={addressLists}
          close={() => setAddressList(false)}
          handleAddress={() => handleAddress()}
          navigation={props.navigation}
          saveAdd={(e) => saveAdd(e)}
        /> : null}
        {isDatePickerVisible ? <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode='date'
          onConfirm={date => {
            handleChange('deliveryDate', date);
            setDatePickerVisibility(false);
          }}
          onCancel={() => setDatePickerVisibility(false)}
          display='default'
          minimumDate={shopDetail && parseInt(shopDetail.status) === 0 ? new Date(tomorroww) : new Date()}
        /> : null}
        {isTimePickerVisible ? <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={time => {
            handleChange('deliveryTime', time12hr(time));
            setTimePickerVisibility(false);
          }}
          onCancel={() => setTimePickerVisibility(false)}
          display='default'
        /> : null}
        {commentt ? <AddComment
          open={commentt}
          close={() => setComment(false)}
          values={values}
          handleChange={(field, value) =>
            handleChange(field, value)
          }
        /> : null}
        <ImagePickerModal
          show={imagePicker}
          close={() => setImagePicker(false)}
          type={'orders'}
          response={path => {
            handleChange('orderPrec', path);
          }}
        />
        <Loader loader={loader} />
        {productDetailPopup ?
          <ItemModal
            id={productDetailId}
            shopDetail={shopDetail}
            orderDetails={{ total_amount: finalTotalValue }}
            fromOrderSummary={'forConditionHandleOfADD-TO-CART-button'}
            open={productDetailPopup}
            close={() => {
              setProductDetailPopup(false)
              // props.setArray()
            }}
            navigation={props.navigation}
          />
          : null}
      </View>
    </>
  );
};
const mapStateToProps = state => ({
  user: state.UserReducer.user,
  products: state.AddToCartReducer.products,
  savedAddress: state.SavedAddReducer.savedAddress,
});
export default connect(mapStateToProps)(CustomerOrderEdit);
