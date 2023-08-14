import ActionType from '../constants/index';
const initialState = {
  shopDetails: {},
};

const SaveShopDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_SAVED_ADDRESS:
      return Object.assign({}, state, {
        shopDetails: action.payload,
      });
    default:
      return state;
  }
};

export default SaveShopDetailReducer;
