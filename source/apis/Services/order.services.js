import Constant from "../constant";
import { mainWrapper } from "../main";


const myOrderList = (params) => {
    return mainWrapper.get(`${Constant.host}order-list`, params)
};

const myShopOrderList = (params) => {
    return mainWrapper.get(`${Constant.host}shop-order-list`, params)
};

const saveOrderList = (params) => {
    return mainWrapper.get(`${Constant.host}save-order-list`, params)
};

const orderDetails = (id) => {
    return mainWrapper.get(`${Constant.host}orders/${id}/detail`)
};

const createOrder = (params) => {
    return mainWrapper.post(`${Constant.host}create-order`, params)
};

const updateOrder = (id, params) => {
    return mainWrapper.post(`${Constant.host}create-order/${id}`, params)
};

const addOrderSlips = (params) => {
    return mainWrapper.post(`${Constant.host}upload-slip`, params)
};

const refuseOrder = (params) => {
    return mainWrapper.post(`${Constant.host}order-refuse`, params)
};

const acceptOrder = (params) => {
    return mainWrapper.post(`${Constant.host}order-accept`, params)
};

const packedOrder = (params) => {
    return mainWrapper.post(`${Constant.host}order-packed`, params)
};

const deliveredOrder = (params) => {
    return mainWrapper.post(`${Constant.host}order-delivered`, params)
};

const orderPayment = (params) => {
    return mainWrapper.post(`${Constant.host}order-payment-method`, params)
};

const deleteSavedOrder = (id) => {
    return mainWrapper._delete(`${Constant.host}order/${id}/delete`)
};

const createOrderRequest = (params) => {
    return mainWrapper.post(`${Constant.host}create-order-request`, params)
};

const orderRequestAction = (params) => {
    return mainWrapper.post(`${Constant.host}order-request-action`, params)
};

const orderRequestDetails = (id) => {
    return mainWrapper.get(`${Constant.host}orders-request/${id}/detail`)
};



const OrderServices = {
    myOrderList,
    myShopOrderList,
    saveOrderList,
    createOrder,
    updateOrder,
    addOrderSlips,
    refuseOrder,
    orderDetails,
    acceptOrder,
    packedOrder,
    deliveredOrder,
    orderPayment,
    deleteSavedOrder,
    createOrderRequest,
    orderRequestAction,
    orderRequestDetails
};

export default OrderServices