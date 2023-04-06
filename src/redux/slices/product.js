import { createSlice } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
// import { historialCompras } from '../../_mock/historialCompras';
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
    iva: 0,
  },
  historial: { historial: [], order: 'asc', orderBy: 'fecha' },
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

    createBilling(state, action) {
      state.checkout.billing = action.payload;
    },

    getProdTest(state, action) {
      const data = state.products.find(prod => clean(prod.codigo) === clean(action.payload));
      state.product = data;
      state.isLoading = false;
    },
    // Historial
    handleRequestSortHistorial(state, action) {
      const isAsc = state.historial.orderBy === action.payload && state.historial.order === 'asc';
      state.historial.order = isAsc ? 'desc' : 'asc';
      state.historial.property = action.payload;
      state.historial.orderBy = action.payload;
    },
    setNewHistorialData(state, action) {
      state.historial.historial = [...state.historial.historial, action.payload];
    },
    handleChangeStatus(state, action) {
      state.historial.historial = [...state.historial.historial].map(el => {
        if (el.uid === action.payload.uid) {
          return { ...el, estado: { estado: action.payload.estado, responsable: action.payload.responsable } };
        }
        return el;
      });
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
  handleRequestSortHistorial,
  setNewHistorialData,
  handleChangeStatus,
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
