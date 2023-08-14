import Constant from "../../constant";
import { mainWrapper } from "../../main";


const shopkeeperProfile = () =>{
    return mainWrapper.get(`${Constant.host}profile-shopkeeper`, )
};

const updateProfile = (params) =>{
    return mainWrapper.put(`${Constant.host}update-profile-shopkeeper`, params )
};

const shopStatus = () =>{
    return mainWrapper.get(`${Constant.host}shop-status`);
};

const updateShopDetail = (params) =>{
    return mainWrapper.put(`${Constant.host}update-shop-detail`, params )
};

const shopkeperProfileServices = {
    shopkeeperProfile,
    updateProfile,
    shopStatus,
    updateShopDetail,
};

export default shopkeperProfileServices;