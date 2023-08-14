import { Toaster } from "../../../app/components/Helper/Toaster";
import shopkeperOrdersServices from "../../Services/shopkeeper/shopkeeper.orders.services";

const shopkeeperOrders = async (post) => {
    let response = await shopkeperOrdersServices.shopkeeperOrders(post);
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const shopkeeperOrdersAccepted = async (post) => {
    let response = await shopkeperOrdersServices.shopkeeperOrdersAccepted(post);
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};


const requiredToPackOrder = async (post) => {
    let response = await shopkeperOrdersServices.requiredToPackOrder(post);
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const shopkeeperOrdersRefused = async (post) => {
    let response = await shopkeperOrdersServices.shopkeeperOrdersRefused(post);
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const shopkeeperOrdersPacked = async (data, itemlist) => {
    let itemArray = []
    let productId =  itemlist && itemlist.length > 0 ? itemlist[0].order_id : ''
    if(itemlist){
        itemlist.map((item) => {
            itemArray.push({
                item_name : item.item_name ? item.item_name : '',
                product_id : item.product_id ? item.product_id : '',
                weight : item.weight ? item.weight : '',
                quantity : item.quantity ? item.quantity : '',
                comment : item.comment ? item.comment : '',
                price : item.products_price ? item.products_price : ''
            })
        })
    }
    let post = {
        order_title: data.order_title ? data.order_title : '',
        shop_id: data.shop_id ? data.shop_id : '',
        items: itemArray ? itemArray : [],
        address: data.address ? data.address : '',
        pickup_date: data.pickup_date ? data.pickup_date : '',
        pickup_time: data.pickup_time ? data.pickup_time : '',
        order_prec: data.order_prec ? data.order_prec : '',
        notes: data.notes ? data.notes : '',
        service_charge: data.service_charge ? data.service_charge : '',
        delivery_charges: data.delivery_charges ? data.delivery_charges : '',
        amount: data.amount ? data.amount : '',
        total_amount: data.total_amount ? data.total_amount : '',
        delivery_type: data.delivery_type ? data.delivery_type : '',
        payment_method: data.payment_method ? data.payment_method : '',
        order_status: data.order_status ? data.order_status : ''
    }
    let response = await shopkeperOrdersServices.shopkeeperOrdersPacked(productId, post);
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const shopkeeperOrdersDelivered = async (post) => {
    let response = await shopkeperOrdersServices.shopkeeperOrdersDelivered(post);
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const shopkeeperOrdersController = {
    shopkeeperOrders,
    shopkeeperOrdersAccepted,
    requiredToPackOrder,
    shopkeeperOrdersRefused,
    shopkeeperOrdersPacked,
    shopkeeperOrdersDelivered,
};


export default shopkeeperOrdersController