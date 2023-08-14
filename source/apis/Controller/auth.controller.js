import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toaster } from "../../app/components/Helper/Toaster";
import store from "../../redux/store";
import authServices from "../Services/auth.services";
import { setAddToCart, setEmptyCart, setFilters, setSavedAddress, setSavedShopDetail, setSearchFilter, setShopkeeperOrdersFilters, setUserData } from '../../redux/action/user'
import { navigate } from "../../../App";
import { Platform } from "react-native";


const login = async (data) => {

    let post = {
        phonenumber: data.phoneNumber,
        password: data.password,
        device_id: await store.getState().FcmTokenReducer.fcmtoken,
        device_type: Platform.OS,
        device_name: Platform.OS,
        fcm_token: await store.getState().FcmTokenReducer.fcmtoken,
    }
    let response = await authServices.login(post)
    if (response && response.status) {
        await setUpLogin(response.user);
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }

};

const resendOtp = async (token) => {
    let response = await authServices.resendOtp(token)
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const sentOtpOnUpdateNumber = async () => {
    let response = await authServices.sentOtpOnUpdateNumber();
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const updateNumber = async (data) => {
    let post ={
        phonenumber : data.number ? data.number : null,
        otp : data.otp ? data.otp : null
    }
    let response = await authServices.updateNumber(post);
    if (response && response.status) {
        await setUpLogin(response.user);
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const forgetPasword = async (data) => {
    let post = {
        phonenumber : data.phoneNumber ?  data.phoneNumber : ''
    }
    let response = await authServices.forgetPasword(post);
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const emailVerification = async (token, otp) => {
    let post  = {
        device_id: await store.getState().FcmTokenReducer.fcmtoken,
        device_type: Platform.OS,
        device_name: Platform.OS,
        fcm_token: await store.getState().FcmTokenReducer.fcmtoken,
    }
    let response = await authServices.emailVerification(token, otp, post)
    if (response && response.status) {
        await setUpLogin(response.user);
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const recoverPassword = async (token, data) => {
    let post = {
        new_password: data.newPassword,
        confirm_password: data.confirmPassword
    }
    let response = await authServices.recoverPassword(token, post)
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const changePassword = async (data) => {
    let post = {
        old_password: data.oldPassword,
        new_password: data.newPassword,
    }
    let response = await authServices.changePassword(post)
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const logoutProfile = async () => {
    let response = await authServices.logoutProfile()
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

const getLoginUser = async () => {
    let user = await AsyncStorage.getItem('SET_USER_DATA');
    if (user) {
        user = user ? JSON.parse(user) : {};
        store.dispatch(setUserData(user));
        return user && user !== null && user.id ? user : null;
    } else {
        return null;
    }
};



const logout = async () => {
    removeFilters();
    store.dispatch(setUserData(null));
    await AsyncStorage.removeItem('SET_USER_DATA');
    store.dispatch(setSavedAddress({ savedAddress: {} }));
    await store.dispatch(setEmptyCart());
    await AsyncStorage.removeItem('SET_SAVED_ADDRESS');
    store.dispatch(setSavedShopDetail({ shopDetails: {} }));
    await AsyncStorage.removeItem('SET_SAVED_SHOPDETAIL');
    await authServices.logoutProfile()
    await AsyncStorage.removeItem('SET_SEARCH_FILTER');
    store.dispatch(setSearchFilter({
        inputValue: [],
        shops: [],
    },
    store.dispatch(setShopkeeperOrdersFilters(''))
    ));
    navigate('customerlogin', null, 1);
};

const removeFilters = async () => {
    await AsyncStorage.removeItem('SET_FILTERS');
    store.dispatch(
        setFilters({
            category: [],
            shopType: [],
            shopkeeperType : [],
            shopStatus : '',
            location: '',
            homeDelivery: '',
        }),
    );

}

const customerAuthController = {
    login,
    resendOtp,
    sentOtpOnUpdateNumber,
    updateNumber,
    forgetPasword,
    emailVerification,
    recoverPassword,
    changePassword,
    setUpLogin,
    getLoginUser,
    logout,
    logoutProfile,
    removeFilters,
}


export default customerAuthController