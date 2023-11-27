import {combineReducers} from 'redux';
import {cartReducer} from './userReducer';
import {demoReducer} from './demo';

export const reducer = combineReducers({
  cart: cartReducer,
  demo: demoReducer,
});
