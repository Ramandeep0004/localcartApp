
import { Toaster } from '../../app/components/Helper/Toaster';
import cmsServices from '../Services/cmsPages.services';



const aboutUs = async () => {
    let response = await cmsServices.aboutUs()
    if (response && response.status) {
        return response;
    } else {
        return null;
    }
};

const termsAndConditions = async () => {
    let response = await cmsServices.termsAndConditions();
    if (response && response.status) {
        return response;
    } else {
        return null;
    }
};

const privacyPolicy = async () => {
    let response = await cmsServices.privacyPolicy();
    if (response && response.status) {
        return response;
    } else {
        return null;
    }
};

const faQ = async (data) => {
    let params ={
        page : data.page
    }
    let response = await cmsServices.faQ(params)
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const contactUs = async () => {
    let response = await cmsServices.contactUs();
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};


const contactUsRequest = async (data) => {
    let post = {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message1
    }
    let response = await cmsServices.contactUsRequest(post);
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};


const cmsController = {
    aboutUs,
    termsAndConditions,
    privacyPolicy,
    faQ,
    contactUs,
    contactUsRequest,
};


export default cmsController
