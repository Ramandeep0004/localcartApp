import Constant from "../constant";
import { mainWrapper } from "../main";


const shopsListing = (params) => {
    return mainWrapper.get(`${Constant.host}shop-list`, params);
};

const shopDetail = (id, params) => {
    return mainWrapper.get(`${Constant.host}shop/${id}/detail`, params);
};

const productDetail = (id,id2) => {
    return mainWrapper.get(`${Constant.host}product/${id}/${id2}/detail`);
};

const getShopOpenCloseStatus = (id) => {
    return mainWrapper.get(`${Constant.host}get-shop/status/${id}`);
};

const shopProductPriceOnOffHandle = () => {
    return mainWrapper.get(`${Constant.host}shop-price`);
};

const shopsServices = {
    shopsListing,
    shopDetail,
    productDetail,
    getShopOpenCloseStatus,
    shopProductPriceOnOffHandle,
};

export default shopsServices