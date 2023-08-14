import ActionTypes from "../../constants";

const initialState = {
    search: {
        inputValue: [],
        shops: [],
    },
};

const SearchFilter = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_SEARCH_FILTER:
            return Object.assign({}, state, {
                ...state,
                search: action.payload,
            });
        default:
            return state;
    }
};

export default SearchFilter;
