import ActionType from '../../constants/index';
const initialState = {
  net: true,
};

const InternetReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_INTERNET:
      return Object.assign(new Boolean(), state, {
        net: action.payload,
      });
    default:
      return state;
  }
};
export default InternetReducer;
