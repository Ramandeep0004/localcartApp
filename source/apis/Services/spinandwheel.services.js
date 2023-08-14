import Constant from "../constant";
import { mainWrapper } from "../main";


const spinnerList = () => {
    return mainWrapper.get(`${Constant.host}spiner`);
};

const saveSpinnerPoints = (params) => {
    return mainWrapper.put(`${Constant.host}save-spiner-points`, params);
};

const spinnerStatus = () => {
    return mainWrapper.get(`${Constant.host}spiner-status`, );
};

const spinAndWheelServices = {
    spinnerList,
    saveSpinnerPoints,
    spinnerStatus,
};

export default spinAndWheelServices;