import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toaster } from "../../app/components/Helper/Toaster";
import { setUserData } from "../../redux/action/user";
import store from "../../redux/store";
import shopkeeperAuthServices from "../Services/shopkeeper.auth.services";

const signUp = async (data, address) => {
    let location = store.getState().LocationReducer.location;
    let post = {
        first_name: data.firstName ? data.firstName : '',
        last_name: data.lastName ? data.lastName : '',
        phonenumber: data.phoneNumber ? data.phoneNumber : '',
        email: data.email ? data.email : '',
        password: data.password ? data.password : '',
        gender: data.gender ? data.gender.value : '',
        image: data.image ? data.image : null,
        aadhar_no: data.adhaarNumber ? data.adhaarNumber.substring(0, 14) : '',
        address: {
            address: data.address ? data.address : null,
            district: address.district_id ? address.district_id : null,
            state: address.state_id ? address.state_id : null,
            city: address.city_id ? address.city_id : null,
            mandal: address.village_id ? address.village_id : null,
            latitude: location.lat ? location.lat : null,
            longitude: location.lng ? location.lng : null,
            type: ""
        },
        device_id: "1",
        device_type: "web",
        fcm_token: "",
        device_name: "",
        refferal_code: data.referalCode ? data.referalCode : null
    }
    let response = await shopkeeperAuthServices.signUp(post)
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }

};

const shopDetail = async (data) => {
    let indId = [];
    let ind = data.category;
    ind.map(item => indId.push(item.id));
    let post = {
        shop_name: data.shopName ? data.shopName : '',
        category_id: indId,
        shop_open_time: data.openTime,
        shop_close_time: data.closeTime,
        shop_gstin: data.GSTNumber ? data.GSTNumber : '',
        google_map_url: data.googleMapURL ? data.googleMapURL : '',
        shopkepper_type: data.shopkeeperType ? data.shopkeeperType.id : '',
        image: data.image ? data.image : null,
        home_delivery: data.homeDelivery ? data.homeDelivery : 0,
        shop_type: data.shopType ? data.shopType.id : '',
        allow_other_locations: "0",
        custom_catalouge: "0",
        self_delivery: data.homeDelivery === 1 ? data.self : null,
        third_party_delivery: data.homeDelivery === 1 ? data.thirdparty : null,
        delivery_charge_type: data.homeDelivery === 1 ? data.deliverChargeType ? data.deliverChargeType.value : null : null,
        delivery_charge: data.homeDelivery === 1 ? data.deliverycharges : null,
    }
    let response = await shopkeeperAuthServices.shopDetail(post)
    if (response && response.status) {
        await setUpLogin(response.user);
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const shopCategories = async (post) => {
    let response = await shopkeeperAuthServices.shopCategories(post)
    if (response && response.status) {
        return response;
    } else {
        // new Toaster().error(response.message);
        return null;
    }
};

const shopCategoryinBrowse = async (post) => {
    let response = await shopkeeperAuthServices.shopCategoryinBrowse(post)
    if (response && response.status) {
        return response;
    } else {
        // new Toaster().error(response.message);
        return null;
    }
};

const shopType = async (post) => {
    let response = await shopkeeperAuthServices.shopType(post);
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const shopkeeperType = async () => {
    let response = await shopkeeperAuthServices.shopkeeperType();
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const bankDetail = async (data) => {
    let post = {
        bank_name: data.bankName,
        account_no: data.accountNumber,
        ifsc_code: data.IFSCNumber,
        phoneno: data.phoneNumber
    }
    let response = await shopkeeperAuthServices.bankDetail(post)
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const newbankDetail = async (data) => {
    let post = {
        bank_name: data.bankName,
        account_no: data.accountNumber,
        ifsc_code: data.IFSCNumber,
        phoneno: data.phoneNumber
    }
    let response = await shopkeeperAuthServices.bankDetail(post)
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const setUpLogin = async (user) => {
    await AsyncStorage.setItem('SET_USER_DATA', JSON.stringify(user));
    await store.dispatch(setUserData(user));
};

const shopkeeperAuthController = {
    signUp,
    shopDetail,
    shopCategories,
    shopType,
    shopkeeperType,
    bankDetail,
    shopCategoryinBrowse,
    newbankDetail
};


export default shopkeeperAuthController