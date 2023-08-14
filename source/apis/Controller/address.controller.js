import { Toaster } from '../../app/components/Helper/Toaster';
import AddressServices from '../Services/address.services';

const addAddress = async (data) => {
    let params = {
        address: data.address,
        state: data.state ? data.state.id : null,
        district: data.district ? data.district.id : null,
        city: data.city ? data.city.id : null,
        mandal: data.village ? data.village.id : null,
    }
    let response = await AddressServices.addAddress(params)
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const editAddress = async (id, data) => {
    let params = {
        address: data.address,
        state: data.state ? data.state.id : null,
        district: data.district ? data.district.id : null,
        city: data.city ? data.city.id : null,
        mandal: data.village ? data.village.id : null,
    }
    let response = await AddressServices.editAddress(id, params)
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const deleteAddress = async (id) => {
    let response = await AddressServices.deleteAddress(id);
    if (response && response.status) {
        return response;
    } else {
        return null;
    }
};



const addressList = async (data) => {
    let response = await AddressServices.addressList(data);
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};


const addressDetails = async (id) => {
    let response = await AddressServices.addressDetails(id);
    if (response && response.status) {
        return response;
    } else {
        return null;
    }
};


const AddressController = {
    addAddress,
    editAddress,
    deleteAddress,
    addressList,
    addressDetails,
};


export default AddressController
