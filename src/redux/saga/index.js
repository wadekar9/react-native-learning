import {put, takeEvery, call} from 'redux-saga/effects';
import {
  UPDATE_ADDRESS,
  UPDATE_AGE,
  UPDATE_MAIL,
  UPDATE_NAME,
  FETCH_PRODUCTS,
  STORE_PRODUCTS,
  ENABLE_ALL_PRODUCTS_LOADED
} from '../actions/actionTypes';
import axios from 'axios';
import {BASE_URL} from '../../utils/api';

// function apiCallFunction() {
//   new Promise((resolve, reject) => setTimeout(resolve, 5000));
// }

// function* fetchProductSaga() {
//   // const response = yield call(
//   //   fetch,
//   //   'https://jsonplaceholder.typicode.com/posts',
//   // );
//   yield;
// }

// export {fetchProductSaga};

function* updateAdreessFunction() {
  console.log('UPDATING ADRESSSS HERE....!');
  new Promise((resolve, reject) =>
    setTimeout(() => {
      console.log('UPDATING ADRESSSS DONE....!');
      resolve();
    }, 5000),
  );
}

function* updateAgeFunction() {
  console.log('UPDATING AGE HERE....!');
  new Promise((resolve, reject) =>
    setTimeout(() => {
      console.log('UPDATING AGE DONE....!');
      resolve();
    }, 5000),
  );
}

function* updateNameFunction() {
  console.log('UPDATING NAME HERE....!');
  new Promise((resolve, reject) =>
    setTimeout(() => {
      console.log('UPDATING NAME DONE....!');
      resolve();
    }, 5000),
  );
}

function* updateEmailFunction() {
  console.log('UPDATING EMAIL HERE....!');
  new Promise((resolve, reject) =>
    setTimeout(() => {
      console.log('UPDATING EMAIL DONE....!');
      resolve();
    }, 5000),
  );
}

function* fetchProducts(action) {
  try {
    console.log('FETCHING PRODUCTS HERE...', action);
    const response = yield call(() =>
      axios.get(BASE_URL.concat(`products?limit=10&skip=${action.payload}`)),
    );

    console.log('RESPOJNSE', response.data.total);
    if(action.payload === 50){
      yield put({type: ENABLE_ALL_PRODUCTS_LOADED});
    }
    yield put({type: STORE_PRODUCTS, payload: response.data?.products});
  } catch (error) {
    console.error('ERRRRRRRRRRRO HAI BHAI', error?.response?.data);
  }
}

export function* rootInitialSaga() {
  yield takeEvery(UPDATE_ADDRESS, updateAdreessFunction);
  yield takeEvery(UPDATE_AGE, updateAgeFunction);
  yield takeEvery(UPDATE_MAIL, updateEmailFunction);
  yield takeEvery(UPDATE_NAME, updateNameFunction);
  yield takeEvery(FETCH_PRODUCTS, fetchProducts);
}
