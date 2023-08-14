import { Toaster } from "../../app/components/Helper/Toaster";
import store from "../../redux/store";
import authServices from "../Services/customer.auth.services";


const signUp = async (data , address) => {
    let location = store.getState().LocationReducer.location;

    let post = {
        first_name: data.firstName,
        last_name: data.lastName,
        phonenumber: data.phoneNumber ?data.phoneNumber : null,
        email: data.email ? data.email : null,
        password: data.password ? data.password : null,
        gender: data.gender && data.gender.value  ? data.gender.value : null,
        image: data.image ? data.image : null,
        aadhar_no: data.adhaarNumber ? data.adhaarNumber.substring(0,14) : null,
        address: {
            address: data.address,
            district: address.district_id,
            state: address.state_id,
            city: address.city_id,
            mandal: address.village_id,
            latitude: location.lat,
            longitude: location.lng,
            type: ""
        },
        device_id: "1",
        device_type: "web",
        fcm_token: "",
        device_name: "",
        refferal_code: data.referalCode ? data.referalCode : null
    }
    let response = await authServices.signUp(post)
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const getAddress = async (data) => {
    let response = await authServices.getAddress(data)
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const customerAuthController = {
    signUp,
    getAddress,
}


export default customerAuthController