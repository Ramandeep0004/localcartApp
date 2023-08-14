import ActionType from '../constants/index';
const initialState = {
  notification: {},
};

const InAppNotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_IN_APP_NOTIFICATION:
      return Object.assign({}, state, {
        notification: action.payload,
      });
    default:
      return state;
  }
};

export default InAppNotificationReducer;
