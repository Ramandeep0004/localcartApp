import AsyncStorage from '@react-native-async-storage/async-storage';
import { parseInt } from 'lodash';
import ActionTypes from '../constants';
const initialState = {
  products: [],
};

const AddToCartReducer = (state = initialState, action) => {

  switch (action.type) {
    case ActionTypes.SET_ADDTO_CART:
      let existed_item = state.products.find(item => action.payload.id === item.id)
      if (existed_item) {
        state = {
          ...state,
          products: state.products.map(item => {
            if (item.id === action.payload.id) {

              return {
                ...item,
                quantity: item.quantity + 1,
              }
            } else {
              return item
            }
          })
        }
        AsyncStorage.setItem('SET_CART_DATA', JSON.stringify(state));
        return state;
      }
      else {
        let newItem = {
          ...action.payload,
          quantity: action.payload.quantity + 1,
        }
        AsyncStorage.setItem('SET_CART_DATA', JSON.stringify({
          ...state,
          products: [...state.products, newItem],
        }));
        return {
          ...state,
          products: [...state.products, newItem],
        }
      }
    case ActionTypes.SET_REMOVEFROM_CART:
      let existed_item1 = state.products.find(item => action.payload.id === item.id)
      if (existed_item1.quantity > 1) {
        state ={
          ...state,
          products: state.products.map(item => {
            if (item.id === action.payload.id) {
              return {
                ...item,
                quantity: item.quantity - 1,
              }
            } else {
              return item
            }
          })
        }
        AsyncStorage.setItem('SET_CART_DATA', JSON.stringify(state));
        return state;
      }
      else if (existed_item1.quantity == 1) {
        state = {
          ...state,
          products: state.products.filter(item => item.id !== action.payload.id)
        }
        AsyncStorage.setItem('SET_CART_DATA', JSON.stringify(state));
        return state;
      }
    case ActionTypes.SET_UPDATE_CART:
      let existed_item2 = state.products.find(item => action.payload.id === item.id)
      console.log(existed_item2);
      if (existed_item2) {
        state ={
          ...state,
          products: state.products.map(item => {
            if (item.id === action.payload.id) {
              return action.payload;
            } else {
              return item;
            }
          })
        }
        AsyncStorage.setItem('SET_CART_DATA', JSON.stringify(state));
        return state;
      }
    // else {
    //   let newItem = {
    //     ...action.payload,
    //     quantity: action.payload.quantity + 1,
    //   }
    //   return {
    //     ...state,
    //     products: [...state.products, newItem],
    //   }
    // }
    case ActionTypes.RESTORE_MY_CART:
      return {
        ...state,
        products: action.payload,
      }
    case ActionTypes.SET_EMPTY_CART:
      AsyncStorage.setItem('SET_CART_DATA', JSON.stringify({
        ...state,
        products: [],
      }));
      return {
        ...state,
        products: [],
      }
    default:
      return state;
  }
};

export default AddToCartReducer;
