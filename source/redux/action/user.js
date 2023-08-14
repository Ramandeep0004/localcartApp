import ActionType from '../constants/index';

export const setUserData = param => {
  return {
    type: ActionType.SET_USER_DATA,
    payload: param,
  };
};

export const setAPIToken = param => {
  return {
    type: ActionType.SET_API_TOKEN,
    payload: param,
  };
};

export const setFCMToken = param => {
  return {
    type: ActionType.SET_FCM_TOKEN,
    payload: param,
  };
};

export const setNotification = param => {
  return {
    type: ActionType.SET_NOTIFY,
    payload: param,
  };
};

export const setLocation = param => {
  return {
    type: ActionType.SET_LOCATION,
    payload: param,
  };
};

export const setLocationStatus = param => {
  return {
    type: ActionType.SET_LOCATION_STATUS,
    payload: param,
  };
};

export const setInternet = param => {
  return {
    type: ActionType.SET_INTERNET,
    payload: param,
  };
};

export const setSuccess = param => {
  return {
    type: ActionType.SET_SUCCESS,
    payload: param,
  };
};

export const setUserType = param => {
  return {
    type: ActionType.SET_USER_TYPE,
    payload: param,
  };
};

export const setPlanActive = param => {
  return {
    type: ActionType.SET_PLAN_ACTIVE,
    payload: param,
  };
};

export const setCardLink = param => {
  return {
    type: ActionType.SET_CARD_LINK,
    payload: param,
  };
};

export const setInAppNotification = param => {
  return {
    type: ActionType.SET_IN_APP_NOTIFICATION,
    payload: param,
  };
};

export const selectedLanguage = param => {
  return {
    type: ActionType.SELECTED_LANGUAGE,
    payload: param,
  };
};

export const setFilters = param => {
  return {
    type: ActionType.SET_FILTERS,
    payload: param,
  };
};

export const setAddToCart = param => {
  return {
    type: ActionType.SET_ADDTO_CART,
    payload: param,
  };
};

export const restoreCart = param => {
  return {
    type: ActionType.RESTORE_MY_CART,
    payload: param,
  };
};

export const setRemoveFromCart = param => {
  return {
    type: ActionType.SET_REMOVEFROM_CART,
    payload: param,
  };
};

export const setEmptyCart = param => {
  return {
    type: ActionType.SET_EMPTY_CART,
    payload: param,
  };
};

export const setUpdateCart = param => {
  return {
    type: ActionType.SET_UPDATE_CART,
    payload: param,
  };
};

export const setSavedAddress = param => {
  return {
    type: ActionType.SET_SAVED_ADDRESS,
    payload: param,
  };
};

export const setSavedShopDetail = param => {
  return {
    type: ActionType.SET_SAVED_SHOPDETAIL,
    payload: param,
  };
};

export const setMyOrderListFilters = param => {
  return {
    type: ActionType.SET_MYORDERSLIST_FILTERS,
    payload: param,
  };
};

export const setItemRequestFilters = param => {
  return {
    type: ActionType.SET_REQUESTED_ITEMS_FILTERS,
    payload: param,
  };
};

export const setShopkeeperOrdersFilters = param => {
  return {
    type: ActionType.SET_SHOPKEEPER_ORDERS_FILTERS,
    payload: param,
  };
};

export const setSearchFilter = param => {
  return {
    type: ActionType.SET_SEARCH_FILTER,
    payload: param,
  };
};

export const setShopDetail = param => {
  return {
    type: ActionType.SET_SHOP_DETAILS,
    payload: param,
  };
};