import { Toaster } from '../../../app/components/Helper/Toaster';
import paymentServices from '../../Services/payment/paymentServices';


const AddWallet = async (data) => {
    let post = {
        "payment_id": "Pay125",
        "amount": "500"
    }
    let response = await paymentServices.AddWallet(post);
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }


};

const customerTransactions = async () => {
    let response = await paymentServices.customerTransactions()
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};


const shopkeeperTranactions = async () => {
    let response = await paymentServices.shopkeeperTranactions()
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const walletLogs = async (post) => {
    let response = await paymentServices.walletLogs(post);
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const payout = async (data) => {
    let post = {
        amount: data
    }
    let response = await paymentServices.payout(post);
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const transferIs = async () => {
    let response = await paymentServices.transferIs();
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const paymentController = {
    AddWallet,
    customerTransactions,
    shopkeeperTranactions,
    walletLogs,
    transferIs,
    payout,
}


export default paymentController