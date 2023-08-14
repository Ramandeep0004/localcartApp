import ActionType from '../../constants/index';
const initialState = {
  success: {
    show: false,
    message: 'Your account has been verified.',
  },
};

const SuccessReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_SUCCESS:
      return Object.assign({}, state, {
        success: action.payload,
      });
    default:
      return state;
  }
};

export default SuccessReducer;
