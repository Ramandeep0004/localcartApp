
import { Toaster } from '../../app/components/Helper/Toaster';
import QRCodeServices from '../Services/qrCodes.services';

const paymentQRUpload = async (data) => {
    let post = {
        shop_id: data.shopId,
        payment_qr_code: data.image
    }

    let response = await QRCodeServices.paymentQRUpload(post)
    if (response && response.status) {
        return response;
    } else {
        return null;
    }
};

const getQRCode = async () => {
    let response = await QRCodeServices.getQRCode();
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};





const QRCodeController = {
    paymentQRUpload,
    getQRCode,
};


export default QRCodeController
