import {
  UPDATE_NAME,
  UPDATE_ADDRESS,
  UPDATE_AGE,
  UPDATE_MAIL,
  FETCH_PRODUCTS,
} from './actionTypes';

export const handleUpdateName = data => {
  return {
    type: UPDATE_NAME,
    payload: data,
  };
};

export const handleUpdateAddress = data => {
  return {
    type: UPDATE_ADDRESS,
    payload: data,
  };
};

export const handleUpdateAge = data => {
  return {
    type: UPDATE_AGE,
    payload: data,
  };
};

export const handleUpdateMail = data => {
  return {
    type: UPDATE_MAIL,
    payload: data,
  };
};

export const handleFetchProductAction = data => {
  return {
    type: FETCH_PRODUCTS,
    payload: data,
  };
};
