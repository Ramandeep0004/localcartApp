import ActionType from '../constants/index';
const initialState = {
notify: 0,
};

const NotifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_NOTIFY:
     
      return Object.assign('', state, {
        notify: action.payload,
      });
    default:
      return state;
  }
}
export default NotifyReducer;
