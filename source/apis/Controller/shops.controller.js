import { Toaster } from "../../app/components/Helper/Toaster";
import store from "../../redux/store";
import shopsServices from "../Services/shops.services";
import actionController from '../Controller/actionController';

const shopsListing = async (data) => {
    let responses = await actionController.getFilters();
    let shopTypeArr = [];
    let user = await store.getState().UserReducer.user
    if (responses && responses.shopType) {
        let shop = responses.shopType;
        shop.map(item => shopTypeArr.push(item.id));
    }
    let params = {
        search: data.search,
        page: data.page,
        category: data.category ? [data.category] : null,
        shop_type: shopTypeArr ? shopTypeArr : [],
        home_delivery: responses ? responses.homeDelivery : null,
        city_id: responses && responses.location ? responses.location :  user && user.address && user.address.city_id ? user.address.city_id : null ,
        shopkeeper_type :  responses && responses.shopkeeperType.length > 0 ?  [responses.shopkeeperType[0].id] : [],
        status : responses && responses.shopStatus ? responses.shopStatus : '',
    }
    let response = await shopsServices.shopsListing(params);
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const shopDetail = async (data) => {
    let post = {
        category: data.category ? data.category : []
    };
    let response = await shopsServices.shopDetail(data.id, post);
    if (response && response.status) {
        return response;
    } else {
        // new Toaster().error(response.message);
        return null;
    }
};

const productDetail = async (id,id2) => {
    let response = await shopsServices.productDetail(id,id2);
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const getShopOpenCloseStatus = async (id) => {
    let response = await shopsServices.getShopOpenCloseStatus(id);
    if (response && response.status) {
        return response;
    } else {
        // new Toaster().error(response.message);
        return null;
    }
};

const shopProductPriceOnOffHandle = async () => {
    let response = await shopsServices.shopProductPriceOnOffHandle();
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const shopsController = {
    shopsListing,
    shopDetail,
    productDetail,
    getShopOpenCloseStatus,
    shopProductPriceOnOffHandle,
}


export default shopsController