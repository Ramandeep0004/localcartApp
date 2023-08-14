const { default: AsyncStorage } = require("@react-native-async-storage/async-storage");
import store from '../../redux/store/index'
import { restoreCart, setAddToCart, setEmptyCart, setFilters, setItemRequestFilters, setMyOrderListFilters, setRemoveFromCart, setSavedAddress, setSavedShopDetail, setSearchFilter, setShopDetail, setShopkeeperOrdersFilters, setUpdateCart } from '../../redux/action/user'
import ActionServices from '../Services/action.services';
import { Toaster } from '../../app/components/Helper/Toaster';
import { restElement } from '@babel/types';


const setFilter = async (data) => {
    await AsyncStorage.setItem('SET_FILTERS', JSON.stringify(data));
    await store.dispatch(setFilters(data));
};

const getFilters = async () => {
    let data = await AsyncStorage.getItem('SET_FILTERS');
    if (data) {
        data = data ? JSON.parse(data)
            :
            {
                category: [],
                shopType: [],
                shopkeeperType: [],
                shopStatus: "",
                location: "",
                homeDelivery: "",
            };
        store.dispatch(setFilters(data));
        return data && data !== null ? data : null;
    } else {
        return null;
    }
};

const setAddToCarts = async (data) => {
    await store.dispatch(setAddToCart(data));
}

const getCartDetail = async () =>{
    let cart = await AsyncStorage.getItem('SET_CART_DATA');
    if (cart) {
    cart = cart ? JSON.parse(cart) : null;
    if(cart && cart.products.length > 0){
        store.dispatch(restoreCart(cart.products))
    }
    }
}

const setRemoveFromCarts = async (data) => {
    await store.dispatch(setRemoveFromCart(data));
}

const setEmptyCarts = async () => {
    await store.dispatch(setEmptyCart());
}

const setUpdateCarts = async (data) => {
    await store.dispatch(setUpdateCart(data));
}

const getCart = async () => {
    let products = await AsyncStorage.getItem('SET_ADDTO_CART');
    if (products) {
        products = products
            ? JSON.parse(products)
            : {
                products: [],
            };
        store.dispatch(setAddToCart(products));
        return products;
    } else {
        return null;
    }
}

const getCartReduxArr = async () => {
    let products = await AsyncStorage.getItem('SET_CART_REDUX');
    if (products) {
        products = products
            ? JSON.parse(products)
            : {
                products: [],
            };
        return products;
    } else {
        return null;
    }
}

const setSavedAddresss = async (data) => {
    await AsyncStorage.setItem('SET_SAVED_ADDRESS', JSON.stringify(data));
    await store.dispatch(setSavedAddress(data));
}

const getAddress = async () => {
    let savedAddress = await AsyncStorage.getItem('SET_SAVED_ADDRESS');
    if (savedAddress) {
        savedAddress = savedAddress
            ? JSON.parse(savedAddress)
            : {
                savedAddress: {},
            };
        store.dispatch(setSavedAddress(savedAddress));
        return savedAddress;
    } else {
        return {};
    }
}

const settings = async () => {
    let response = await ActionServices.settings();
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const setSavedShopDetails = async (data) => {
    await AsyncStorage.setItem('SET_SAVED_SHOPDETAIL', JSON.stringify(data));
    await store.dispatch(setSavedShopDetail(data));
};

const setMyOrderListFilter = async (data) => {
    await store.dispatch(setMyOrderListFilters(data));
};

const removeMyOrdersFilters = async () => {
    await store.dispatch(setMyOrderListFilters([]));
};

const requestedItemsFilters = async (data) => {
    await store.dispatch(setItemRequestFilters(data));
};

const shopkeeperOrdersFilters = async (data) => {
    await store.dispatch(setShopkeeperOrdersFilters(data));
};

const setResentVisitShopsFilter = async (data) => {
    await AsyncStorage.setItem('SET_SEARCH_FILTER', JSON.stringify(data));
    await store.dispatch(setSearchFilter(data));
};

const getSearchFilters = async () => {
    let search = await AsyncStorage.getItem('SET_SEARCH_FILTER');
    if (search) {
        search = search
            ? JSON.parse(search)
            : {
                search: {},
            };
        store.dispatch(setSearchFilter(search));
        return search;
    } else {
        return null;
    }
};

const brands = async (post) => {
    let response = await ActionServices.brands(post);
    if (response && response.status) {
        return response;
    } else {
        // new Toaster().error(response.message);
        return null;
    }
};

const unitMeasurements = async (data) => {
    let response = await ActionServices.unitMeasurements(data);
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const distributedMeasurements = async () => {
    let response = await ActionServices.distributedMeasurements();
    if (response && response.status) {
        return response;
    } else {
        new Toaster().error(response.message);
        return null;
    }
};

const setShopDetails = async (user) => {
    await AsyncStorage.setItem('SET_SHOP_DETAILS', JSON.stringify(user));
    await store.dispatch(setShopDetail(user));
};

const filtersController = {
    setFilter,
    getFilters,
    setAddToCarts,
    setRemoveFromCarts,
    getCart,
    setSavedAddresss,
    getAddress,
    settings,
    setEmptyCarts,
    setUpdateCarts,
    setSavedShopDetails,
    setMyOrderListFilter,
    removeMyOrdersFilters,
    requestedItemsFilters,
    shopkeeperOrdersFilters,
    setResentVisitShopsFilter,
    getSearchFilters,
    brands,
    unitMeasurements,
    getCartReduxArr,
    distributedMeasurements,
    getCartDetail,
    setShopDetails
};

export default filtersController;