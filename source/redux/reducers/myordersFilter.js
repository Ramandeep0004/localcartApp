import ActionTypes from "../constants";


const initialState = {
  filters: []
};

const MyOrderfiltersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_MYORDERSLIST_FILTERS:
      return Object.assign(new Array, state, {
        filters: action.payload,
      });
    default:
      return state;
  }
};

export default MyOrderfiltersReducer;