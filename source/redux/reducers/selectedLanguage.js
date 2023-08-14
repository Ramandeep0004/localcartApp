import ActionType from '../constants/index';

const initialState = {
  language: [],
};

const selectedLanguage = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SELECTED_LANGUAGE:
      return Object.assign([], state, {
        language: action.payload,
      });
    default:
      return state;
  }
};

export default selectedLanguage;