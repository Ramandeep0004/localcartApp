import ActionType from '../constants/index';
const initialState = {
  shopDetails: {},
};

const ShopDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_SHOP_DETAILS:
      return Object.assign({}, state, {
        shopDetails: action.payload,
      });
    default:
      return state;
  }
}

export default ShopDetailReducer;