import { Toaster } from "../../app/components/Helper/Toaster";
import spinAndWheelServices from "../Services/spinandwheel.services";

const spinnerList = async () => {
    let response = await spinAndWheelServices.spinnerList();
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const saveSpinnerPoints = async (data) => {
    let post = {
        points: data.winnerValue ? data.winnerValue : 0,
        token: data.token
    }
    let response = await spinAndWheelServices.saveSpinnerPoints(post);
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const getSpinnerStatus = async () => {
    let response = await spinAndWheelServices.spinnerStatus();
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const spinAndWheelController = {
    spinnerList,
    saveSpinnerPoints,
    getSpinnerStatus,
};


export default spinAndWheelController