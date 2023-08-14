import Constant from "../constant";
import { mainWrapper } from "../main";


const paymentQRUpload = (params) => {
    return mainWrapper.post(`${Constant.host}payment-qr-code/upload`, params)
};

const getQRCode = () => {
    return mainWrapper.get(`${Constant.host}qr-code`)
};



const QRCodeServices = {
    paymentQRUpload,
    getQRCode,
};

export default QRCodeServices;