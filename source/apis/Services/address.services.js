import Constant from "../constant";
import { mainWrapper } from "../main";


const addAddress = (params) => {
    return mainWrapper.post(`${Constant.host}user-address/add`, params)
};


const editAddress = (id, params) => {
    return mainWrapper.put(`${Constant.host}user-address/${id}/edit`, params)
};


const deleteAddress = (id) => {
    return mainWrapper._delete(`${Constant.host}user-address/${id}/delete`)
};


const addressList = (params) => {
    return mainWrapper.get(`${Constant.host}user-address`, params)
};


const addressDetails = (id) => {
    return mainWrapper.get(`${Constant.host}user-address/${id}/detail`)
};



const AddressServices = {
    addAddress,
    editAddress,
    deleteAddress,
    addressList,
    addressDetails,
};


export default AddressServices
