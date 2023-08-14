import Constant from "../constant";
import { mainWrapper } from "../main";


const aboutUs = () => {
    return mainWrapper.get(`${Constant.host}pages/about-us`)
};


const termsAndConditions = () => {
    return mainWrapper.get(`${Constant.host}pages/terms-condition`)
};


const privacyPolicy = () => {
    return mainWrapper.get(`${Constant.host}pages/privacy-policy`)
};


const faQ = (params) => {
    return mainWrapper.get(`${Constant.host}faq`, params)
};


const contactUs = () => {
    return mainWrapper.get(`${Constant.host}contact-us`, )
};

const contactUsRequest = (post) => {
    return mainWrapper.post(`${Constant.host}contact-us-request`, post )
};


const cmcServices = {
    aboutUs,
    termsAndConditions,
    privacyPolicy,
    faQ,
    contactUs,
    contactUsRequest,
};


export default cmcServices
