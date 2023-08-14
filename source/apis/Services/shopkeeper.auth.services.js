import Constant from "../constant";
import { mainWrapper } from "../main";


const signUp =(post) =>{
    return mainWrapper.post(`${Constant.host}auth/shopkepper-register`, post)
};

const shopDetail =(post) =>{
    return mainWrapper.post(`${Constant.host}shop-detail`, post)
};

const shopCategories = (params) =>{
    return mainWrapper.get(`${Constant.host}categories`,params)
};

const shopCategoryinBrowse = (params) =>{
    return mainWrapper.get(`${Constant.host}categories/${params}`)
};

const shopType =(post) =>{
    return mainWrapper.get(`${Constant.host}shop-type?search=${post.search}`)
};

const shopkeeperType =() =>{
    return mainWrapper.get(`${Constant.host}shopkeeper-type?search`)
};

const bankDetail =(post) =>{
    return mainWrapper.post(`${Constant.host}bank-detail`, post)
};

const shopkeeperAuthServices = {
    signUp,
    shopDetail,
    shopCategories,
    shopType,
    shopkeeperType,
    bankDetail,
    shopCategoryinBrowse,
}

export default shopkeeperAuthServices