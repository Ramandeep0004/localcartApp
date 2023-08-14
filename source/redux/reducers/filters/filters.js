import ActionType from '../../constants/index';
const initialState = {
  filters: {
    category : [],
    shopType : [],
    shopkeeperType : [],
    shopStatus : '',
    location : '',
    homeDelivery : '',
  },
};

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_FILTERS:
      return Object.assign({}, state, {
        filters: action.payload,
      });
    default:
      return state;
  }
};

export default filtersReducer;
