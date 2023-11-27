import {
  UPDATE_ADDRESS,
  UPDATE_AGE,
  UPDATE_MAIL,
  UPDATE_NAME,
  FETCH_PRODUCTS,
  STORE_PRODUCTS,
  ENABLE_ALL_PRODUCTS_LOADED,
} from '../actions/actionTypes';

const intialState = {
  name: '',
  age: '',
  address: '',
  mail: '',
  loading: false,
  moreLoading: true,
  products: [],
};

export const demoReducer = (state = intialState, action) => {
  switch (action.type) {
    case UPDATE_NAME:
      return {...state, name: action.payload};
    case UPDATE_AGE:
      return {...state, age: action.payload};
    case UPDATE_ADDRESS:
      return {...state, address: action.payload};
    case UPDATE_MAIL:
      return {...state, mail: action.payload};
    case FETCH_PRODUCTS:
      return {...state, loading: true};
    case STORE_PRODUCTS:
      return {...state, products: [...state.products, ...action.payload]};
    case ENABLE_ALL_PRODUCTS_LOADED:
      return {...state, moreLoading: false};
    default:
      return state;
  }
};
