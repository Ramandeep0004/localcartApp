import Constant from "../../constant";
import { mainWrapper } from "../../main";


const getRefferal = () => {
    return mainWrapper.get(`${Constant.host}rewards-referral`)
};

const checkReferral = (params) => {
    return mainWrapper.post(`${Constant.host}refferal-code-status`, params)
};

const getRewardsListing = (params) => {
    return mainWrapper.get(`${Constant.host}points-logs`, params);
};

const getRewardsCards = () => {
    return mainWrapper.get(`${Constant.host}reward-cards`);
};

const pointsToWallet = (params) => {
    return mainWrapper.post(`${Constant.host}add-points-to-wallet`, params)
};

const referralServices = {
    getRefferal,
    checkReferral,
    getRewardsListing,
    getRewardsCards,
    pointsToWallet,
};

export default referralServices;