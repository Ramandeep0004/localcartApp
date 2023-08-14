import ActionType from '../constants/index';

const initialState = {
   userData : []
};

const UserReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_PROFILE': {
                return {
                  userData : [action.payload]
                }
              }
    default:
      return state;
  }
}
export default UserReducers;