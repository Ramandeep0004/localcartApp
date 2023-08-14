import { Toaster } from "../../app/components/Helper/Toaster";
import OrderServices from "../Services/order.services";

const myShopOrderList = async (data) => {
    let response = await OrderServices.myOrderList(data);
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const getShopOrderList = async () => {
    let response = await OrderServices.myShopOrderList();
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const saveOrderList = async (data) => {
    let response = await OrderServices.saveOrderList(data);
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const createOrder = async (data, shopDetail, extraCharges, savedAddress, finalTotalValue) => {
    let post = {
        order_title: data.order_title ? data.order_title : null,
        shop_id: data.shopId,
        items: data.itemsArr,
        address: parseInt(data.deliveryType) === 1 ? data.address : null,
        pickup_date: data.deliveryDate,
        pickup_time: data.deliveryTime,
        order_prec: data.orderPrec ? data.orderPrec : null,
        notes: data.note,
        service_charge: data.serviceCharges,
        amount: shopDetail && parseInt(shopDetail.is_price) === 1 ? data.amount : '',
        total_amount: shopDetail && parseInt(shopDetail.is_price) === 1 ? finalTotalValue : '',
        delivery_type: data.deliveryType ? data.deliveryType : 0,
        payment_method: null,
        delivery_charges: parseInt(data.deliveryType) === 1 ? data.deliveryCharges ? data.deliveryCharges : null : null,
        // delivery_charges: data.deliveryCharges,
        order_status: data.orderStatus,
        extra_charges : extraCharges ? extraCharges : null,
        address_id : savedAddress && savedAddress.id ? savedAddress.id : null
    }
    let response = await OrderServices.createOrder(post)
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return response;
    }
};

const savedCreateOrder = async (id,data, extraCharges, savedAddress) => {
    let item = [...data.itemsArr]
    let arraay = [];
    item.map(e => {
        if (e) {
            arraay.push({
                ...e,
                item_name: e.title,
                product_id: e.id,
                weight: e.units,
                quantity: e.quantity,
                comment: e.comment ? e.comment : '',
                price: e.price,
                request_type: e.request_type ? e.request_type : '',
                item_request_id: e.item_request_id ? e.item_request_id : ''
            })
        }
    });
    let post = {
        order_title: data.order_title ? data.order_title : null,
        order_id: id,
        shop_id: data.shopId,
        items: arraay,
        address: parseInt(data.deliveryType) === 1 ? data.address : null,
        pickup_date: data.deliveryDate,
        pickup_time: data.deliveryTime,
        order_prec: data.orderPrec ? data.orderPrec : null,
        notes: data.note,
        service_charge: data.serviceCharges,
        delivery_charges: parseInt(data.deliveryType) === 1 ? data.deliveryCharges : null,
        amount: data.amount,
        total_amount: data.grandTotal ? data.grandTotal : null,
        delivery_type: data.deliveryType ? data.deliveryType : 0,
        payment_method: null,
        order_status: data.orderStatus,
        extra_charges : extraCharges ? extraCharges : null,
        address_id : savedAddress && savedAddress.id ? savedAddress.id : null
    }
    let response = await OrderServices.updateOrder(id,post)
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const orderDetails = async (data) => {
    let response = await OrderServices.orderDetails(data);
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const addOrderSlips = async (data) => {
    let post = {
        order_id: data.orderId,
        printed_bill_slip: data.orderBill,
        transaction_slip: data.transactionSlip,
    }
    let response = await OrderServices.addOrderSlips(post)
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};


const refuseOrder = async (data) => {
    let post = {
        order_id: data.orderId ? data.orderId : []
    }
    let response = await OrderServices.refuseOrder(post)
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const acceptOrder = async (data) => {
    let post = {
        "order_id": [193, 192, 191, 181]
    }
    let response = await OrderServices.acceptOrder(post)
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const packedOrder = async (data) => {
    let post = {
        "order_id": [193, 192, 191, 181]
    }
    let response = await OrderServices.packedOrder(post)
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const deliveredOrder = async (data) => {
    let post = {
        "order_id": [193, 192, 191, 181]
    }
    let response = await OrderServices.deliveredOrder(post)
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const orderPayment = async (data) => {
    let post = {
        order_id: data.orderId,
        payment_method: data.paymentMethod,
    }
    let response = await OrderServices.orderPayment(post)
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const deleteSavedOrder = async (data) => {
    let response = await OrderServices.deleteSavedOrder(data)
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const createOrderRequest = async (id, data, extraCharges, savedAddress) => {
    console.log(savedAddress, '...................................savedAddress at constroller');
    let item = [...data.itemsArr]
    let arraay = [];
    item.map(e => {
        if (e) {
            arraay.push({
                ...e,
                item_name: e.title,
                product_id: e.id,
                weight: e.units,
                quantity: e.quantity,
                comment: e.comment ? e.comment : '',
                price: e.price,
                request_type: e.request_type ? e.request_type : '',
                item_request_id: e.item_request_id ? e.item_request_id : ''
            })
        }
    });
    let post = {
        order_title: data.order_title ? data.order_title : null,
        order_id: id,
        shop_id: data.shopId,
        items: arraay,
        address: parseInt(data.deliveryType) === 1 ? data.address : null,
        pickup_date: data.deliveryDate,
        pickup_time: data.deliveryTime,
        order_prec: data.orderPrec ? data.orderPrec : null,
        notes: data.note,
        service_charge: data.serviceCharges,
        delivery_charges: parseInt(data.deliveryType) === 1 ? data.deliveryCharges : null,
        amount: data.amount,
        total_amount: data.grandTotal,
        delivery_type: data.deliveryType ? data.deliveryType : 0,
        payment_method: null,
        order_status: data.orderStatus,
        extra_charges : extraCharges ? extraCharges : null,
        address_id : savedAddress && savedAddress.id ? savedAddress.id : null
    }
    let response = await OrderServices.createOrderRequest(post)
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const orderRequestAction = async (data) => {
    let post = {
        order_request_id: data.order_request_id,
        order_id: data.order_id,
        status: data.status
    }
    let response = await OrderServices.orderRequestAction(post)
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const orderRequestDetails = async (data) => {
    let response = await OrderServices.orderRequestDetails(data);
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const OrderController = {
    myShopOrderList,
    getShopOrderList,
    createOrder,
    savedCreateOrder,
    addOrderSlips,
    refuseOrder,
    orderDetails,
    acceptOrder,
    packedOrder,
    deliveredOrder,
    saveOrderList,
    orderPayment,
    deleteSavedOrder,
    createOrderRequest,
    orderRequestAction,
    orderRequestDetails
}


export default OrderController