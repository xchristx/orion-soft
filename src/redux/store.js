import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// redux-pers
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import { combineReducers } from 'redux';
import authSlice from './slices/auth';
import product from './slices/product';
import drawerSlice from './slices/drawer';
import settings from './slices/settings';
import recibos from './slices/recibos';
import clientes from './slices/clientes';
import proveedores from './slices/proveedores';

const rootConfig = {
  key: 'root',
  storage,
  version: 1,
  blackList: ['product'],
};
const productPersistConfig = {
  key: 'product',
  storage,
  whitelist: ['sortBy', 'checkout'],
  version: 1,
  blackList: ['root'],
};
export const rootReducer = combineReducers({
  authSlice,
  product: persistReducer(productPersistConfig, product),
  drawerSlice,
  settings,
  recibos,
  clientes,
  proveedores,
});

const store = configureStore({
  reducer: persistReducer(rootConfig, rootReducer),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);
const { dispatch } = store;

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();

export { store, persistor, dispatch, useSelector, useDispatch };
