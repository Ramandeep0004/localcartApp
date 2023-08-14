import Constant from "../../constant";
import { mainWrapper } from "../../main";


const AddWallet = () =>{
    return mainWrapper.post(`${Constant.host}add-wallet-amount` )
};

const customerTransactions = () =>{
    return mainWrapper.get(`${Constant.host}customer/transactions` )
};

const shopkeeperTranactions = () =>{
    return mainWrapper.get(`${Constant.host}shopkeeper/transactions` )
};

const walletLogs = (post) =>{
    return mainWrapper.get(`${Constant.host}wallet-logs`, post );
};

const payout = (params) =>{
    return mainWrapper.post(`${Constant.host}shopkeeper/transfer-money`, params );
};

const transferIs = () =>{
    return mainWrapper.get(`${Constant.host}shopkeeper/is-transfer`,  );
};

const paymentServices = {
    AddWallet,
    customerTransactions,
    shopkeeperTranactions,
    walletLogs,
    payout,
    transferIs
};

export default paymentServices;