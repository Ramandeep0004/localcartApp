import { Toaster } from '../../../app/components/Helper/Toaster'
import store from '../../../redux/store';
import customerProfileServices from '../../Services/customer/customer.profile.services';
import authController from '../auth.controller'

const customerProfile = async () => {
    let response = await customerProfileServices.customerProfile()
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const editProfile = async (data) => {
    let location = store.getState().LocationReducer.location;
    let post = {
        first_name: data.firstName,
        last_name: data.lastName,
        phonenumber: data.phoneNumber ? data.phoneNumber : '',
        email: data.email ? data.email : '',
        gender: data.gender ?  data.gender.value : '',
        image: data.image ? data.image : '',
        aadhar_no: data.adhaarNumber ? data.adhaarNumber.substring(0,14) : '',
        address: {
            address: data.address,
            district: data.district.id,
            state: data.state.id,
            city: data.city.id,
            mandal: data.place.id,
            latitude: location.lat,
            longitude: location.lng,
            type: ""
        },
        device_id: "1",
        device_type: "web",
        fcm_token: "",
        device_name: ""
    }
    let response = await customerProfileServices.updateProfile(post);
    if (response && response.status) {
        await authController.setUpLogin(response.user);
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const customerProfileController = {
    customerProfile,
    editProfile,
}


export default customerProfileController