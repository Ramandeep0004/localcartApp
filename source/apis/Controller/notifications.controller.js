import { Toaster } from "../../app/components/Helper/Toaster";
import { setNotification } from "../../redux/action/user";
import store from "../../redux/store";
import notificationServices from "../Services/notifications.services";

const notificationsListing = async (params) => {
    let response = await notificationServices.notificationsListing(params);
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const notificationsReacAll = async () => {
    let response = await notificationServices.notificationsReadAll();
    if (response && response.status) {
        store.dispatch(setNotification(0));
        return response;
    } else {
        // new Toaster().error(response.message);
        return null;
    }
};

const notificationsRead = async (params) => {
    let post = {
        notification_id: params
    }

    let response = await notificationServices.notificationsRead(post);
    if (response && response.status) {
        return response;
    } else {
        // new Toaster().error(response.message);
        return null;
    }
};

const notificationsCount = async () => {
    let response = await notificationServices.notificationsCount();
    if (response && response.status) {
        store.dispatch(setNotification(response.count))
        return response;
    } else {
        // new Toaster().error(response.message);
        return null;
    }
};

const notificationsController = {
    notificationsListing,
    notificationsReacAll,
    notificationsRead,
    notificationsCount,
};


export default notificationsController