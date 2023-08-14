import ActionTypes from "../../../constants";

const initialState = {
  filters: []
};

const RequestedItemsFilters = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_REQUESTED_ITEMS_FILTERS:
      return Object.assign(new Array, state, {
        filters: action.payload,
      });
    default:
      return state;
  }
};

export default RequestedItemsFilters;
