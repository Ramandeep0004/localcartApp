import Constant from "../../constant";
import { mainWrapper } from "../../main";


const shopkeeperOrders = (params) =>{
    return mainWrapper.get(`${Constant.host}shopkeeper/dashboard`, params );
};


const shopkeeperOrdersAccepted = (params) =>{
    return mainWrapper.post(`${Constant.host}order-accept`, params );
};

const requiredToPackOrder = (params) =>{
    return mainWrapper.post(`${Constant.host}order-packing`, params );
};

const shopkeeperOrdersRefused = (params) =>{
    return mainWrapper.post(`${Constant.host}order-refuse`, params );
};

const shopkeeperOrdersPacked = (id, params) =>{
    return mainWrapper.post(`${Constant.host}order-packed/${id}`, params );
};

const shopkeeperOrdersDelivered = (params) =>{
    return mainWrapper.post(`${Constant.host}order-delivered`, params );
};

const shopkeperOrdersServices = {
    shopkeeperOrders,
    shopkeeperOrdersAccepted,
    requiredToPackOrder,
    shopkeeperOrdersRefused,
    shopkeeperOrdersPacked,
    shopkeeperOrdersDelivered,
};

export default shopkeperOrdersServices;