import ActionType from '../constants/index';
const initialState = {
  fcmtoken: '',
  deviceType : '',
};

const FcmTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_FCM_TOKEN:
     
      return Object.assign('', state, {
        fcmtoken : action.payload,
      });
    default:
      return state; 
  }
}
export default FcmTokenReducer;
