import { createSlice } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
import { addProducto } from '../actions/productActions';
//

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  data: [],
  filteredData: [],
  filter: { name: '', value: '' },
  checkout: {
    activeStep: 0,
    cart: [],
    subtotal: 0,
    total: 0,
    discount: 0,
    shipping: 0,
    billing: null,
    iva: 0,
  },
};

const slice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload.message;
    },
    setData(state, action) {
      state.isLoading = false;
      state.error = null;
      state.data = action.payload;
      state.filteredData = action.payload;
      state.filter = { name: '', value: '' };
    },

    resetFilteredData(state) {
      state.filteredData = state.data;
      state.filter = { name: '', value: '' };
    },
    setFilteredData(state, action) {
      state.filteredData = action.payload.filtered;
      state.filter = { name: action.payload.param, value: action.payload.paramValue };
    },
  },
  // CHECKOUT
  getCart(state, action) {
    const cart = action.payload;

    const subtotal = sum(cart.map(cartItem => cartItem.precio * cartItem.cantidad));
    const discount = cart.length === 0 ? 0 : state.checkout.discount;
    const shipping = cart.length === 0 ? 0 : state.checkout.shipping;
    const billing = cart.length === 0 ? null : state.checkout.billing;
    const iva = cart.reduce((ac, curr) => {
      if (curr.iva) return ac + curr.precio * curr.cantidad;
      return ac;
    }, 0);

    state.checkout.cart = cart;
    state.checkout.discount = discount;
    state.checkout.shipping = shipping;
    state.checkout.billing = billing;
    state.checkout.subtotal = subtotal;
    state.checkout.total = subtotal - discount;
    state.checkout.iva = iva;
  },

  addCart(state, action) {
    const product = action.payload;

    state.checkout.cart = [...state.checkout.cart, product];
  },

  deleteCart(state, action) {
    const updateCart = state.checkout.cart.filter(item => item.uid !== action.payload);

    state.checkout.cart = updateCart;
  },

  resetCart(state) {
    state.checkout.activeStep = 0;
    state.checkout.cart = [];
    state.checkout.total = 0;
    state.checkout.subtotal = 0;
    state.checkout.discount = 0;
    state.checkout.shipping = 0;
    state.checkout.billing = null;
  },

  increaseQuantity(state, action) {
    const productId = action.payload;
    const updateCart = state.checkout.cart.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          quantity: product.quantity + 1,
        };
      }
      return product;
    });

    state.checkout.cart = updateCart;
  },

  decreaseQuantity(state, action) {
    const productId = action.payload;
    const updateCart = state.checkout.cart.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          quantity: product.quantity - 1,
        };
      }
      return product;
    });

    state.checkout.cart = updateCart;
  },
  extraReducers: builder => {
    builder.addCase(addProducto.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(addProducto.fulfilled, (state, actions) => {
      state.isLoading = false;
    });
    builder.addCase(addProducto.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  getCart,
  addCart,
  resetCart,
  deleteCart,
  createBilling,
  increaseQuantity,
  decreaseQuantity,
  startLoading,
  hasError,
  stopLoading,
  resetFilteredData,
  setFilteredData,
  setData,
} = slice.actions;

// ----------------------------------------------------------------------
