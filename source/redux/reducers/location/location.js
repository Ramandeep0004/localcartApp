import ActionType from '../../constants/index';
const initialState = {
  location: {
    lat: '',
    lng: '',
  },
};

const LocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_LOCATION:
      return Object.assign({}, state, {
        location: action.payload,
      });
    default:
      return state;
  }
};

export default LocationReducer;
