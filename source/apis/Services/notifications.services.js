import Constant from "../constant";
import { mainWrapper } from "../main";


const notificationsListing = (params) => {
    return mainWrapper.get(`${Constant.host}notifications`, params)
};

const notificationsReadAll = (params) => {
    return mainWrapper.post(`${Constant.host}all-notifications-read`, params)
};

const notificationsRead = (params) => {
    return mainWrapper.post(`${Constant.host}notifications-read`, params)
};

const notificationsCount = (params) => {
    return mainWrapper.get(`${Constant.host}notifications-count`, params)
};

const notificationServices = {
    notificationsListing,
    notificationsReadAll,
    notificationsRead,
    notificationsCount,
};

export default notificationServices