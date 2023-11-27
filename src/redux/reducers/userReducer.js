const initialState = {
  cart: [],
  loading: false,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CART_DATA':
      return {loading: true, ...state};
    case 'STORE_CART_DATA':
      return {...state, cart: []};
    case 'REMOVE_FROM_CART':
      return {loading: false, ...state};
    case 'EMPTY_CART':
      return {cart: []};
    default:
      return state;
  }
};
