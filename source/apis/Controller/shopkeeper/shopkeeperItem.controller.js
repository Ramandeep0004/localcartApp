import { newdateformat } from '../../../app/components/Helper/date.formats';
import { Toaster } from '../../../app/components/Helper/Toaster';
import shopkeeperItemServices from "../../Services/shopkeeper/shopItem.servives";



const shopCategories = async (params, shopId) => {
    let response = await shopkeeperItemServices.shopCategories(params, shopId);
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const categoriesWiseProductListing = async (params) => {
    let response = await shopkeeperItemServices.categoriesWiseProductListing(params);
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const shopCustomCatalogue = async () => {
    let response = await shopkeeperItemServices.shopCustomCatalogue();
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const disableProduct = async (params) => {
    let response = await shopkeeperItemServices.disableProduct(params);
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const disableAllProduct = async () => {
    let response = await shopkeeperItemServices.disableAllProduct();
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const enableAllProduct = async () => {
    let response = await shopkeeperItemServices.enableAllProduct();
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const additem = async (data) => {
    // let indId = [];
    // let ind = data.categoryId;
    // ind.map(item => indId.push(item.id));
    let post = {
        title: data.name,
        brand_id: data.brandId ? data.brandId.id : null,
        price: data.price ? data.price : null,
        units: data.units ? data.units : null,
        units_measurement: data.unitsType ? data.unitsType.name : null,
        expiry_date:data.expiryDate ? newdateformat(data.expiryDate) : null,
        key_features: data.keyFeatures,
        dealer_type: data.dealerType ? data.dealerType : null,
        image: data.images ? data.images : null,
        description: data.description ?data.description : null,
        product_type_id: data.productType ? data.productType.id : '',
        category_id: data.categoryId ? data.categoryId.id : '',
        other_details: data.otherDetails ? data.otherDetails : null,
    }
    let response = await shopkeeperItemServices.additem(post);
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const editItem = async (id, data) => {
    let post = {
        title: data.name,
        brand_id: data.brandId ? data.brandId.id : null,
        price: data.price ? data.price : null,
        units: data.units ? data.units : null,
        units_measurement: data.unitsType ? data.unitsType.name : null,
        expiry_date: data.expiryDate ?  newdateformat(data.expiryDate) : null,
        key_features: data.keyFeatures,
        dealer_type: data.dealerType ? data.dealerType : null,
        image: data.images ? data.images : null,
        description: data.description ? data.description : null,
        product_type_id: data.productType ? data.productType.id : null,
        category_id: data && data.categoryId ? data.categoryId.id : null,
        other_details: data.otherDetails ? data.otherDetails : null,
    }
    let response = await shopkeeperItemServices.editItem(id, post);
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const deleteItem = async (data) => {
    let response = await shopkeeperItemServices.deleteItem(data);
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const itemListing = async (data) => {
    let response = await shopkeeperItemServices.itemListing(data);
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const itemDetails = async (data) => {
    let response = await shopkeeperItemServices.itemDetails(data);
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};


const shopkeeperItemController = {
    shopCategories,
    categoriesWiseProductListing,
    shopCustomCatalogue,
    disableProduct,
    disableAllProduct,
    enableAllProduct,
    additem,
    editItem,
    deleteItem,
    itemListing,
    itemDetails,
}


export default shopkeeperItemController