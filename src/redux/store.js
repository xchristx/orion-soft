import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// redux-pers
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import { combineReducers } from 'redux';
import authSlice from './slices/auth';
import product from './slices/product';

const rootConfig = {
  key: 'root',
  storage,
  whitelist: [],
};
const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};
export const rootReducer = combineReducers({
  authSlice: persistReducer(rootConfig, authSlice),
  product: persistReducer(productPersistConfig, product),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

const persistor = persistStore(store);
const { dispatch } = store;

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();

export { store, persistor, dispatch, useSelector, useDispatch };
