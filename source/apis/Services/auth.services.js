import Constant from "../constant";
import { mainWrapper } from "../main";


const login =(post) =>{
    return mainWrapper.post(`${Constant.host}auth/login`, post )
}

const forgetPasword =(post) =>{
    return mainWrapper.post(`${Constant.host}auth/forgot-password`, post)
};

const resendOtp =(token) =>{
    return mainWrapper.post(`${Constant.host}auth/resend-otp/${token}`)
};

const sentOtpOnUpdateNumber =() =>{
    return mainWrapper.put(`${Constant.host}send-otp-phonenumber`);
};

const updateNumber = (params) =>{
    return mainWrapper.put(`${Constant.host}update-phonenumber`, params);
};

const emailVerification =(token, otp, params) =>{
    return mainWrapper.get(`${Constant.host}auth/email-verification/${token}?otp=${otp}`, params)
};

const recoverPassword =(token , post) =>{
    return mainWrapper.post(`${Constant.host}auth/recover-password/${token}`, post)
};

const changePassword  =(post) =>{
    return mainWrapper.put(`${Constant.host}change-password`, post)
};

const logoutProfile  =( ) =>{
    return mainWrapper.post(`${Constant.host}auth/logout`)
};

const authServices = {
    login,
    forgetPasword,
    resendOtp,
    sentOtpOnUpdateNumber,
    updateNumber,
    emailVerification,
    recoverPassword,
    changePassword,
    logoutProfile,
}

export default authServices