import { useIsFocused } from '@react-navigation/native';
import { Button, CheckBox, Icon, Image, Input, Text, Tooltip } from '@rneui/themed';
import { t } from 'i18next';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-native';
import { Linking, Platform, ScrollView, TouchableOpacity, View } from 'react-native';
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
import AddAddressModal from '../../../CustomerComponent/AddaddressModal';
import AddressModal from '../../../CustomerComponent/Addressmodal';
import ItemModal from '../../../CustomerComponent/ItemModal';
import AddComment from '../../../ShopComponent/AddComment';
import BillItem from '../../../ShopComponent/BillItems';
import CartBonnList from '../../../ShopComponent/CartBonnList';
import OrderLater from '../../../ShopComponent/OrderLater';
import { newdateformat, time12hr } from '../../Helper/date.formats';
import { checkCurrentDAte, checkCurrentTimedate, comapareTwoTimes, isEmpty, isEmptyObj, renderImage, UrlName } from '../../Helper/general';
import ImagePickerModal from '../../Helper/imagePicker';
import Loader from '../../Helper/loader';
import { finaltotalPrice, finaltotalPricePercentage, finaltotalPriceType, findPercentage, subTotalPrice, totalPrice } from '../../Helper/orderHelpers';
import { Toaster } from '../../Helper/Toaster';
import Validation from '../../Helper/Validations';
import { styles } from './style';

const MyCart = (props) => {
    const navparams = props && props.route && props.route.params && props.route.params.item;
    const [addressList, setAddressList] = useState(false);
    const [addressLists, setAddressLists] = useState([]);
    const [serviceChargesPrice, setServiceChargesPrice] = useState(null);
    const [savedAddress, setSavedAddress] = useState(null);
    const [addAddress, setAddAddress] = useState(false);
    const [totalValue, setTotalvalue] = useState(0);
    const [shopDetail, setShopDetail] = useState(null);
    const [finalTotalValue, setFinalTotalvalue] = useState();
    const [subTotal, setSubTotal] = useState(null);
    const [image, setImage] = useState(null);
    const [loader, setLoader] = useState(false);
    const [loader2, setLoader2] = useState(false);
    const [commentt, setComment] = useState(false);
    const [imagePicker, setImagePicker] = useState(false);
    const [pharmacyItem, setPharmacyItem] = useState(false);
    const [notevalue, setNoteValue] = useState(false);
    const value = props && props.products;
    const add = props && props.savedAddress;
    const [cartArray, setCartArray] = useState(value);
    const [order, setOrder] = useState(false);
    const [address, setAddress] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [sortValue, setSortValue] = useState(null)
    const [productDetailId, setProductDetailId] = useState(null);
    const [productDetailPopup, setProductDetailPopup] = useState(false);
    const [extraCharges, setExtraCharges] = useState(null);
    const [finaltotalValueOnExtraCharges, setFinalTotalValueOnExtraCharges] = useState(null);
    const [open, setOpen] = useState(false);
    const [sort, setSort] = useState([
        { name: t('orderSummary.Home Delivery'), value: 1, checked: false },
        { name: t('orderSummary.Pickup'), value: 0, checked: false },
    ]);

    let defaultValues = {
        shopId: value && value.length > 0 ? value[0].shop_id : null,
        itemsArr: [],
        address: savedAddress && savedAddress.address ? savedAddress.address : null,
        deliveryDate: null,
        deliveryTime: null,
        orderPrec: null,
        note: null,
        serviceCharges: serviceChargesPrice && serviceChargesPrice.service_charge ? serviceChargesPrice.service_charge : null,
        deliveryCharges: shopDetail && shopDetail.delivery_charge ? shopDetail.delivery_charge : null,
        amount: null,
        grandTotal: null,
        deliveryType: null,
        paymentMethod: null,
    }
    const [values, setValues] = useState(defaultValues)

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
            getAddressList();
            getData();
            getAddressFromSyncStorage();
            getServicesCharges();
            isExist();
            setSubTotal(null);
            setExtraCharges(null);
            setFinalTotalValueOnExtraCharges(null);
            setOpen(false);
        }
    }, [isFocus]);

    useEffect(() => {
        setValues({
            ...values,
            address: savedAddress && savedAddress.address ? savedAddress.address : null,
            shopId: value && value.length > 0 ? value[0].shop_id : null,
            serviceCharges: serviceChargesPrice && serviceChargesPrice.service_charge ? serviceChargesPrice.service_charge : null,
            deliveryCharges: shopDetail && shopDetail.delivery_charge ? shopDetail.delivery_charge : null,
        });
    }, [isFocus, serviceChargesPrice, props && props.savedAddress, shopDetail, savedAddress]);

    useEffect(() => {
        if (isFocus) {
            handleTotal();
        }
    }, [isFocus, props && props.products]);

    useEffect(() => {
        if (value.length === 0) {
            props.navigation.goBack();
        }
    }, [value]);

    useEffect(() => {
        if (totalValue) {
            handleFinalTotal();
        }
    }, [totalValue, shopDetail, serviceChargesPrice, values.deliveryType]);

    useEffect(() => {
        if (value && shopDetail && serviceChargesPrice) {
            handleSubTotal();
        }
    }, [values, shopDetail]);


    useEffect(() => {
        if (value && shopDetail) {
            handleItemNewArray();
            setCartArray(value);
        }
        isExist();
    }, [value, shopDetail]);


    useEffect(() => {
        if (cartArray && shopDetail) {
            handleItemNewArray();
        }
    }, [cartArray, shopDetail]);



    useEffect(() => {
        if (values && parseInt(values.deliveryType) === 1) {
            if (shopDetail && (Object.keys(savedAddress).length > 0) && finalTotalValue) {
                if (parseInt(savedAddress.cityId) !== parseInt(shopDetail.address.city_id)) {
                    getExtraChargesAmount();
                }
                else if (parseInt(savedAddress.cityId) === parseInt(shopDetail.address.city_id)) {
                    setExtraCharges(null);        //if user add the delivery addrres for same as shopkeeper city 
                }
                else return;
            }
            else {
                setExtraCharges(null);
            }
        }
        else if (values && parseInt(values.deliveryType) === 0) {
            return setExtraCharges(null);
        }
        else return;
    }, [values.deliveryType, shopDetail, savedAddress, finalTotalValue]);



    useEffect(() => {
        if (extraCharges || extraCharges === null) {
            handleFinalTotalOnExtraCharges();
        }
    }, [extraCharges, finalTotalValue, values.deliveryType]);


    const getData = async () => {
        let post = {
            id: value && value.length > 0 ? value[0].shop_id : null,
            category: []
        };
        setLoader2(true)
        let response = await new shopsController.shopDetail(post)
        if (response && response.status) {
            setShopDetail(response && response.shop);

        }
        setLoader2(false)
    };

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
        if (!isEmptyObj(response)) {
            let obj = {
                address: response.address + ', ' + response.village_name + ', ' + response.cities_name + ', ' + response.district_name + ', ' + response.state_name,
                cityId: response.city ? response.city : null,
                id : response.id ? response.id : null
            }
            setSavedAddress(obj);
            await new filtersController.setSavedAddresss(response);
        } else {
            setSavedAddress({});
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
                    item_name: e.title,
                    product_id: e.id,
                    weight: e.units,
                    quantity: e.quantity,
                    comment: e.comment ? e.comment : null,
                    price: shopDetail && parseInt(shopDetail.is_price) === 1 ? e.price : '',
                    is_prec: e.is_prec ? e.is_prec : 0
                })
            }
        });
        handleChange('itemsArr', arraay);
    };

    const handleTotal = () => {
        let totall = totalPrice(value);
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
        let serviceCharges = serviceChargesPrice && serviceChargesPrice.service_charge ? parseInt(serviceChargesPrice.service_charge) : 0
        let deliveryCharges = shopDetail && shopDetail.delivery_charge ? parseInt(shopDetail.delivery_charge) : 0

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
        let val = {
            ...values,
            amount: totalValue,
            address: savedAddress && savedAddress.address ? savedAddress.address : null,
            serviceCharges: serviceChargesPrice && serviceChargesPrice.service_charge ? serviceChargesPrice.service_charge : null,
            deliveryCharges: shopDetail && shopDetail.delivery_charge ? shopDetail.delivery_charge : null,
            orderStatus: 0
        }
        let isValid = await validtn.isFormValid(val)
        if (isValid && !isValid.haveError) {
            if (checkCurrentDAte(values.deliveryDate) && checkCurrentTimedate(values.deliveryTime)) {
                new Toaster().error(t('toasterMessge.Please select Future Time above 30 mins from current time'));
            } else if (((parseInt(values.deliveryType) === 0 || parseInt(shopDetail.home_delivery) === 0) && comapareTwoTimes(values.deliveryTime, shopDetail.shop_open_time))) {
                new Toaster().error(t("toasterMessge.Pickup time should be in between shop's open and close time."));
            } else if (((parseInt(values.deliveryType) === 0 || parseInt(shopDetail.home_delivery) === 0) && !comapareTwoTimes(values.deliveryTime, shopDetail.shop_close_time))) {
                new Toaster().error(t("toasterMessge.Pickup time should be in between shop's open and close time."));
            } else {
                if (parseInt(values.deliveryType) === 1 && (sortValue === 'Home Delivery' && values.address === null)) {
                    new Toaster().error(t('toasterMessge.Please select the delivery address'));
                } else {
                    setLoader(true)
                    let response = await OrderController.createOrder(val, shopDetail, extraCharges, savedAddress, finalTotalValue);
                    if (response && response.status) {
                        new Toaster().success(response.message);
                        await new filtersController.setEmptyCarts();
                        setLoader(false);
                        props.navigation.reset({
                            index: 1,
                            routes: [{ name: 'shophomescreen' }, { name: 'myordershop' }]
                        })
                        setValues({
                            ...values,
                            shopId: null,
                            itemsArr: [],
                            address: savedAddress && savedAddress.address ? savedAddress.address : null,
                            deliveryDate: null,
                            deliveryTime: null,
                            orderPrec: null,
                            note: null,
                            serviceCharges: serviceChargesPrice && serviceChargesPrice.service_charge ? serviceChargesPrice.service_charge : null,
                            deliveryCharges: shopDetail && shopDetail.delivery_charge ? shopDetail.delivery_charge : null,
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
        else {
            setError({ ...isValid.errors })
        }
    };

    const tomorroww = moment().add(1, 'day').format('YYYY-MM-DD')

    const isExist = () => {
        let result = false;
        let myArray = value
        for (let i = 0; i < myArray.length; i++) {
            if (myArray[i].is_prec === 1) {
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
            new Toaster().error('No contact number Found')
        }
    };


    const handleProductDetailPage = (e) => {
        setProductDetailId(e)
        setProductDetailPopup(true)
    };


    return (
        <>
            {!loader2 && <View style={styles.main}>
                <ScrollView nestedScrollEnabled={true}
                    contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.main}>
                        <View style={styles.viewdelivery}>
                            <Text style={styles.delivery}>{shopDetail && parseInt(shopDetail.home_delivery) === 1 && (parseInt(values.deliveryType) === 1 || values.deliveryType === null) ? t('orderSummary.Delivery Address') : t('orderSummary.Pickup Address')}</Text>
                            {shopDetail && parseInt(shopDetail.home_delivery) === 1 && (parseInt(values.deliveryType) === 1 || values.deliveryType === null) ? <View style={styles.mainview}>
                                <View style={styles.mainone}>
                                    {savedAddress && !isEmptyObj(savedAddress) ? <Text style={styles.textline} >{savedAddress.address}</Text> : <Text style={styles.textline}>{t("orderSummary.Select Address")}</Text>}
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
                            <View style={shopDetail && parseInt(shopDetail.home_delivery) === 0 || parseInt(values.deliveryType) === 0 ? styles.viewgrey22 : styles.viewgrey}>
                                <View style={base.col12}>
                                    <View style={[base.row, { justifyContent: 'center', alignItems: 'center' }]}>
                                        <View style={styles.MainImage}>
                                            <Image style={styles.image}
                                                source={shopDetail && shopDetail.image ? renderImage(shopDetail.image, "large") : Images.dummyShop}
                                            />
                                        </View>
                                        <View style={styles.MainView}>
                                            <View style={styles.Vone}>
                                                {shopDetail && shopDetail.shop_name ? <Text style={styles.bablu}>{shopDetail.shop_name}</Text> : null}
                                                {shopDetail && shopDetail.shopkeeper_type && shopDetail.user ? <Text style={styles.arnav}>{shopDetail.user && shopDetail.user.first_name ? shopDetail.user.first_name : null}{' '}{shopDetail.user && shopDetail.user.last_name ? shopDetail.user.last_name : null}{' '}({shopDetail.shopkeeper_type ? shopDetail.shopkeeper_type.title : null}) </Text> : null}
                                                {shopDetail && shopDetail.shop_open_time && shopDetail.shop_close_time ?
                                                    <Text style={styles.arnav}>{t("orderSummary.Shop Time")} : {shopDetail && shopDetail.shop_open_time && shopDetail.shop_open_time} - {shopDetail && shopDetail.shop_close_time && shopDetail.shop_close_time} </Text> : null}
                                            </View>
                                            <View style={styles.Vtwo}>
                                                {
                                                    shopDetail && parseInt(shopDetail.status) === 1 ?
                                                        <TouchableOpacity onPress={() => handleCallAcivity(shopDetail && shopDetail.user && shopDetail.user.user_phonenumber ? shopDetail.user.user_phonenumber : '')}>
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
                                                                <Icon type={IconsType.feather}
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
                                    <CartBonnList
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
                                <Text style={styles.delivery}>{t("orderSummary.Delivery info")}</Text>
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
                                                setSortValue(item.name)
                                                handleChange('deliveryType', item.value);
                                            }}
                                        />
                                    </View>))}
                            </View>
                                :
                                <View style={styles.nodelivery}>
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
                                            editable={false}
                                            selectionColor={colors.Secondary}
                                            keyboardType={'default'}
                                            autoCapitalize={false}
                                            autoCorrect={false}
                                            placeholder={shopDetail && parseInt(shopDetail.home_delivery) === 0 ? t("orderSummary.Pickup Date") : (values.deliveryType === 1 || values.deliveryType === null ? t("orderSummary.Delivery Date") : t("orderSummary.Pickup Date"))}
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
                                            onChangeText={e => handleChange('deliveryDate', e)}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={base.col6}>
                                    <TouchableOpacity onPress={() => {
                                        if (isEmpty(values.deliveryDate)) {
                                            if (sortValue === 'Pickup') {
                                                new Toaster().success(t('orderSummary.Please first select the pickup date'));
                                            }
                                            else {
                                                new Toaster().success(t('orderSummary.Please first select the home delivery date'));
                                            }
                                        } else {
                                            setTimePickerVisibility(true);
                                        }

                                    }}>
                                        <Input
                                            editable={false}
                                            selectionColor={colors.Secondary}
                                            keyboardType={'default'}
                                            autoCapitalize={false}
                                            autoCorrect={false}
                                            placeholder={shopDetail && parseInt(shopDetail.home_delivery) === 0 ? t("orderSummary.Pickup Time") : (values.deliveryType === 1 || values.deliveryType === null ? t("orderSummary.Delivery Time") : t("orderSummary.Pickup Time"))}
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
                                    <Icon type={IconsType.simpleLineIcon}
                                        name={Icons.pencil}
                                        color={values.note ? colors.white : colors.black}
                                        size={Dimension.smallicon}
                                        style={values.note ? styles.icon2 : styles.icon}
                                        onPress={() => setNoteValue(!notevalue)}
                                    />
                                </View>
                            </View>
                            {notevalue ? <View style={styles.input}>
                                <Input
                                    placeholder={t('orderSummary.Enter your note here..')}
                                    errorStyle={styles.error}
                                    value={values.note}
                                    multiline
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
                                                            <Icon type={IconsType.ionIcon}
                                                                name={Icons.documenttextoutline}
                                                                color={colors.black}
                                                                size={Dimension.docicon}
                                                            />
                                                            <Text style={styles.img} numberOfLines={1}>{values.orderPrec ? UrlName(values.orderPrec) : t('orderSummary.Your Bill')}</Text>
                                                        </View>
                                                        {/* <Text style={styles.date}>25 april 2020</Text> */}
                                                    </View>
                                                    <View style={{ flex: 2, }}>
                                                        <View style={styles.viewcircle}>
                                                            <View style={styles.circle}>
                                                                <Icon
                                                                    type={IconsType.antDesign}
                                                                    name={Icons.close}
                                                                    size={Dimension.smallicon}
                                                                    color={colors.black}
                                                                    onPress={() => setValues({
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
                                            <Icon type={IconsType.antDesign}
                                                name={Icons.upload}
                                                size={Dimension.docicon}
                                                color={colors.black}
                                            />
                                            <Text style={styles.upload}>{t("orderSummary.Upload Precautions")}</Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                            </>}
                            {pharmacyItem ?
                                <View >
                                    <View style={styles.nodelivery}>
                                        <Text style={styles.fusce22}>{t("orderSummary.We are not responsible for any false delivery.")}</Text>
                                    </View>
                                </View> : null}
                            <View style={styles.viewbill}>
                                <BillItem
                                    type={values.deliveryType}
                                    totalValue={totalValue}
                                    finalTotalValue={finalTotalValue}
                                    forHandlePriceToggle={shopDetail && parseInt(shopDetail.is_price) === 1 ? "show" : null}
                                    serviceChargesPrice={serviceChargesPrice}
                                    delivery_charges={shopDetail && shopDetail.delivery_charge}
                                    delivery_charge_type={shopDetail && shopDetail.delivery_charge_type}
                                    shopDetail={shopDetail}
                                    subTotal={subTotal}
                                    extraCharges={extraCharges}
                                    finaltotalValueOnExtraCharges={finaltotalValueOnExtraCharges}
                                />
                            </View>
                            <View style={styles.mainbutton}>
                                <View style={styles.btnone}>
                                    <Button title={t('orderSummary.Save Order')}
                                        buttonStyle={styles.btnonestyle}
                                        titleStyle={styles.titlebtn}
                                        onPress={() => setOrder(true)}
                                    />
                                </View>
                                <View style={styles.btntwo}>
                                    <Button title={t('orderSummary.Place order')}
                                        buttonStyle={styles.btntwostyle}
                                        onPress={() => submit()}
                                    />
                                </View>
                            </View>
                        </View>
                        {
                            address ?
                                <AddAddressModal
                                    open={address}
                                    close={() => setAddress(false)}
                                />
                                :
                                null
                        }
                        {order ?
                            <OrderLater
                                open={order}
                                close={() => setOrder(false)}
                                shopDetail={shopDetail}
                                navigation={props.navigation}
                                value={{ ...values, amount: totalValue, address: savedAddress && savedAddress.address ? savedAddress.address : null, serviceCharges: serviceChargesPrice && serviceChargesPrice.service_charge ? serviceChargesPrice.service_charge : null, orderStatus: 7 }}
                                toScreen={() => props.navigation.reset({
                                    index: 1,
                                    routes: [{ name: 'shophomescreen' }, { name: 'savedorder' }]
                                })}
                                extraCharges={extraCharges}
                                savedAddress={savedAddress}
                                finalTotalValue={finalTotalValue}
                            /> : null}
                    </View>
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
                    {
                        imagePicker ?
                            <ImagePickerModal
                                show={imagePicker}
                                close={() => setImagePicker(false)}
                                type={'orders'}
                                response={path => {
                                    handleChange('orderPrec', path);
                                }}
                            />
                            :
                            null

                    }
                </ScrollView>
            </View>}
            {loader ? <Loader loader={loader} /> : null}
            {loader2 ? <Loader loader={loader2} /> : null}
            {productDetailPopup ?
                <ItemModal
                    id={productDetailId}
                    shopDetail={shopDetail}
                    orderDetails={shopDetail && parseInt(shopDetail.is_price) === 1 ? { total_amount: finalTotalValue } : null} //for manually handle the price on off toggle
                    open={productDetailPopup}
                    close={() => {
                        setProductDetailPopup(false)
                        // props.setArray()
                    }}
                    navigation={props.navigation}
                />
                : null}
        </>
    )
};
const mapStateToProps = state => ({
    user: state.UserReducer.user,
    products: state.AddToCartReducer.products,
    savedAddress: state.SavedAddReducer.savedAddress,
});
export default connect(mapStateToProps)(MyCart);