import ActionTypes from "../../../constants";

const initialState = {
  filters: ''
};

const shopkeeperOrdersFilters = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_SHOPKEEPER_ORDERS_FILTERS:
      return Object.assign(new String, state, {
        filters: action.payload,
      });
    default:
      return state;
  }
};

export default shopkeeperOrdersFilters;
