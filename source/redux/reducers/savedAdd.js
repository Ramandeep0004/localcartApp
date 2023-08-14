import ActionType from '../constants/index';
const initialState = {
  savedAddress: {},
};

const SavedAddReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_SAVED_ADDRESS:
      return Object.assign({}, state, {
        savedAddress: action.payload,
      });
    default:
      return state;
  }
};

export default SavedAddReducer;
