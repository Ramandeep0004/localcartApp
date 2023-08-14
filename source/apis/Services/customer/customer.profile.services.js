import Constant from "../../constant";
import { mainWrapper } from "../../main";


const customerProfile = () =>{
    return mainWrapper.get(`${Constant.host}profile` )
};

const updateProfile = (params) =>{
    return mainWrapper.put(`${Constant.host}update-profile`, params )
};

const customerProfileServices = {
    customerProfile,
    updateProfile,
};

export default customerProfileServices;