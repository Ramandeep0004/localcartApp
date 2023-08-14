import { Toaster } from '../../../app/components/Helper/Toaster';
import referralServices from '../../Services/refferral&Rewards/referral.services';

const getRefferal = async () => {
    let response = await referralServices.getRefferal()
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const checkReferral = async (data) => {
    let post = {
        refferal_code: data
    }
    let response = await referralServices.checkReferral(post);
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const getRewardsListing = async (post) => {
    let response = await referralServices.getRewardsListing(post);
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const getRewardsCards = async () => {
    let response = await referralServices.getRewardsCards();
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const pointsToWallet = async (data) => {
    let post = {
        points: data
    }
    let response = await referralServices.pointsToWallet(post);
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const referralController = {
    getRefferal,
    checkReferral,
    getRewardsListing,
    getRewardsCards,
    pointsToWallet
};


export default referralController