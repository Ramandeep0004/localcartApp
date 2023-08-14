import Constant from "../../constant";
import { mainWrapper } from "../../main";


const shopCategories =(params, shopId) => {
    return mainWrapper.get(`${Constant.host}categories/${shopId}/`, params);
};

const categoriesWiseProductListing = (params) =>{
    return mainWrapper.get(`${Constant.host}shop-products`, params);
};

const shopCustomCatalogue = (params) =>{
    return mainWrapper.post(`${Constant.host}custom-catalouge`, params);
};

const disableProduct = (params) =>{
    return mainWrapper.post(`${Constant.host}disable-product`, params);
};

const disableAllProduct = () =>{
    return mainWrapper.get(`${Constant.host}disable-all-product`);
};

const enableAllProduct = () =>{
    return mainWrapper.get(`${Constant.host}enable-all-product` );
};

const additem = (params) =>{
    return mainWrapper.post(`${Constant.host}item-request/add`, params)
};

const editItem = (id,params) =>{
    return mainWrapper.put(`${Constant.host}item-request/${id}/edit`, params )
};

const deleteItem = (id) =>{
    return mainWrapper._delete(`${Constant.host}item-request/${id}/delete`);
};

const itemListing = (params) =>{
    return mainWrapper.get(Constant.host+ "item-request", params )
};

const itemDetails = (id) =>{
    return mainWrapper.get(`${Constant.host}item-request-detail/${id}/detail`);
};


const shopkeeperItemServices = {
    shopCategories,
    categoriesWiseProductListing,
    shopCustomCatalogue,
    disableProduct,
    disableAllProduct,
    enableAllProduct,
    additem,
    editItem,
    deleteItem,
    itemListing,
    itemDetails,
};

export default shopkeeperItemServices;