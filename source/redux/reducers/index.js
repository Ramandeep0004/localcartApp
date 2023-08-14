import { combineReducers } from 'redux';
import UserReducer from './user';
import APITokenReducer from './apiToken';
import FcmTokenReducer from './fcm';
import NotifyReducer from './notify';
import LocationReducer from './location/location';
import LocationStatusReducer from './location/locationStatus';
import InternetReducer from './internet/internet';
import SuccessReducer from './popups/success';
import UserTypeReducer from './userType';
import InAppNotificationReducer from './localNotifications';
import selectedLanguage from './selectedLanguage';
import filtersReducer from '../reducers/filters/filters'
import AddToCartReducer from './addtocart';
import SavedAddReducer from './savedAdd';
import SaveShopDetailReducer from './saveShop';
import MyOrderfiltersReducer from './myordersFilter';
import RequestedItemsFilters from './filters/shopkeeper/requestedItemsFilters';
import shopkeeperOrdersFilters from './filters/shopkeeper/shopkeeperOrdersFilters';
import SearchFilter from './filters/searchFilter'
import ShopDetailReducer from './shopDetailsReducers';

const appReducer = combineReducers({
  UserReducer,
  APITokenReducer,
  FcmTokenReducer,
  NotifyReducer,
  LocationReducer,
  LocationStatusReducer,
  InternetReducer,
  SuccessReducer,
  UserTypeReducer,
  InAppNotificationReducer,
  selectedLanguage,
  filtersReducer,
  AddToCartReducer,
  SavedAddReducer,
  SaveShopDetailReducer,
  MyOrderfiltersReducer,
  RequestedItemsFilters,
  shopkeeperOrdersFilters,
  SearchFilter,
  ShopDetailReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};
export default rootReducer;
