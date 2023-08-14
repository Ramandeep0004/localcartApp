import ActionType from '../constants/index';
const initialState = {
  type: '',
};

const UserTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_USER_TYPE:
      return Object.assign('', state, {
        type: action.payload,
      });
    default:
      return state;
  }
};

export default UserTypeReducer;
