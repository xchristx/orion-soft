import { createSlice } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
import uniqBy from 'lodash/uniqBy';
// utils
// import axios from '../../utils/axios';
import { products } from '../../_mock/product';
//

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  products,
  product: {},
  sortBy: null,
  filters: {
    gender: [],
    category: 'All',
    colors: [],
    priceRange: '',
    rating: '',
  },
  checkout: {
    activeStep: 0,
    cart: [],
    subtotal: 0,
    total: 0,
    discount: 0,
    shipping: 0,
    billing: null,
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

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    },

    // GET PRODUCT
    getProductSuccess(state, action) {
      state.isLoading = false;
      state.product = action.payload;
    },

    //  SORT & FILTER PRODUCTS
    sortByProducts(state, action) {
      state.sortBy = action.payload;
    },

    filterProducts(state, action) {
      state.filters.gender = action.payload.gender;
      state.filters.category = action.payload.category;
      state.filters.colors = action.payload.colors;
      state.filters.priceRange = action.payload.priceRange;
      state.filters.rating = action.payload.rating;
    },
    // SET TALLAS
    setTallas(state, action) {
      const data = state.products.map(prod => {
        if (prod.id === action.payload.idProd && action.payload.add) {
          return { ...prod, tallas: action.payload.tallas };
        } else if (prod.id === action.payload.idProd && !action.payload.add) {
          console.log('here');
          return { ...prod, tallas: [...Array(13)].map((el, i) => ({ size: i + 34, value: 0 })), cantidad: 0 };
        }
        return prod;
      });
      state.products = data;
    },
    setTallasProduct(state, action) {
      state.product.tallas = action.payload;
    },
    setCantidadProduct(state, action) {
      state.product.cantidad = action.payload;
    },

    // CHECKOUT
    getCart(state, action) {
      const cart = action.payload;

      const subtotal = sum(cart.map(cartItem => cartItem.price * cartItem.quantity));
      const discount = cart.length === 0 ? 0 : state.checkout.discount;
      const shipping = cart.length === 0 ? 0 : state.checkout.shipping;
      const billing = cart.length === 0 ? null : state.checkout.billing;

      state.checkout.cart = cart;
      state.checkout.discount = discount;
      state.checkout.shipping = shipping;
      state.checkout.billing = billing;
      state.checkout.subtotal = subtotal;
      state.checkout.total = subtotal - discount;
    },

    addCart(state, action) {
      const product = action.payload;
      const isEmptyCart = state.checkout.cart.length === 0;

      if (isEmptyCart) {
        state.checkout.cart = [...state.checkout.cart, product];
      } else {
        state.checkout.cart = state.checkout.cart.map(_product => {
          const isExisted = _product.id === product.id;
          if (isExisted) {
            return {
              ..._product,
              quantity: _product.quantity + 1,
            };
          }
          return _product;
        });
      }
      state.checkout.cart = uniqBy([...state.checkout.cart, product], 'id');
    },

    deleteCart(state, action) {
      const updateCart = state.checkout.cart.filter(item => item.id !== action.payload);

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

    createBilling(state, action) {
      state.checkout.billing = action.payload;
    },

    getProdTest(state, action) {
      const data = state.products.find(prod => clean(prod.codigo) === clean(action.payload));
      state.product = data;
      state.isLoading = false;
    },
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
  sortByProducts,
  filterProducts,
  getProdTest,
  setTallas,
  setTallasProduct,
  setCantidadProduct,
} = slice.actions;

// ----------------------------------------------------------------------

// export const getProducts = () => {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.get('/api/products');
//       dispatch(slice.actions.getProductsSuccess(response.data.products));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// };

// ----------------------------------------------------------------------

// export const getProduct = name => dispatch => {
//   return async () => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.get('/api/products/product', {
//         params: { name },
//       });
//       dispatch(slice.actions.getProductSuccess(response.data.product))
//     } catch (error) {
//       console.error(error);
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// };
export const getProducts = () => dispatch => {
  dispatch(slice.actions.startLoading);
  dispatch(slice.actions.getProductsSuccess(products));
};
export const getProduct = name => dispatch => {
  dispatch(slice.actions.startLoading());

  dispatch(slice.actions.getProdTest(name));
};
const clean = string => string.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>/\s+]/gi, '').toLowerCase();
