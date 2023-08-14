import ActionType from '../constants/index';
const initialState = {
  user: {},
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_USER_DATA:
      return Object.assign({}, state, {
        user: action.payload,
      });
    default:
      return state;
  }
}

export default UserReducer;