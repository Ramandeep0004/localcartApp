import ActionType from '../../constants/index';
const initialState = {
  on: false,
};

const LocationStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_LOCATION_STATUS:
      return Object.assign(new Boolean(), state, {
        on: action.payload,
      });
    default:
      return state;
  }
};
export default LocationStatusReducer;
