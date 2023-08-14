import shopkeperProfileServices from "../../Services/shopkeeper/shopkeep.profile.services";
import { Toaster } from '../../../app/components/Helper/Toaster'
import store from "../../../redux/store";
import customerAuthController from "../auth.controller";


const getShopkeeperProfile = async () => {
    let response = await shopkeperProfileServices.shopkeeperProfile()
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const editProfile = async (data) => {
    let location = store.getState().LocationReducer.location;
    let post = {
        first_name: data.firstName ? data.firstName : null,
        last_name: data.lastName ? data.lastName : null,
        email: data.email ? data.email : null,
        phonenumber: data.phoneNumber ? data.phoneNumber : null,
        gender: data.gender ?  data.gender.value : null,
        aadhar_no: data.adhaarNumber ? data.adhaarNumber.substring(0,14) : '',
        image: data.image ? data.image : '',
        address: {
            address: data.address,
            district: data.district.id,
            state: data.state.id,
            city: data.city.id,
            mandal: data.place.id,
            latitude: location.lat,
            longitude: location.lng,
            type: ""
        },
        bank: {
            bank_name: data.bankName ? data.bankName : null,
            account_no: data.accountNumber ? data.accountNumber : null,
            ifsc_code: data.IFSCNumber ? data.IFSCNumber : null
        }
    }
    let response = await shopkeperProfileServices.updateProfile(post);
    if (response && response.status) {
        await customerAuthController.setUpLogin(response.user)
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const shopStatus = async () => {
    let response = await shopkeperProfileServices.shopStatus();
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const updateShopDetail = async (data) => {
    // console.log(data);
    // let indId = [];
    // let ind = data.category;
    // ind.map(item => indId.push(item.id));
    let post = {
        shop_name: data.shopName,
        // category_id: indId,
        shop_open_time: data.openTime,
        shop_close_time: data.closeTime,
        shop_gstin: data.GSTNumber,
        google_map_url: data.googleMapURL,
        image: data.image ? data.image : '',
        shopkepper_type: data.shopkeeperType.id,
        home_delivery: data.homeDelivery,
        shop_type: data.shopType.id,
        allow_other_locations: "0",
        custom_catalouge: "0",
        self_delivery: data.homeDelivery === 1 ? data.self : null,
        third_party_delivery: data.homeDelivery === 1 ? data.thirdparty : null,
        delivery_charge_type: data.homeDelivery === 1 ? data.deliverChargeType ? data.deliverChargeType.value : null : null,
        delivery_charge: data.homeDelivery === 1 ? data.deliverycharges : null,
    }
    let response = await shopkeperProfileServices.updateShopDetail(post);
    if (response && response.status) {
        // await customerAuthController.setUpLogin(response.user)
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};


const shopkeeperProfileController = {
    getShopkeeperProfile,
    editProfile,
    shopStatus,
    updateShopDetail,
}


export default shopkeeperProfileController