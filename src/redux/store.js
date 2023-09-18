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
import createMigrate from 'redux-persist/es/createMigrate';

const rootConfig = {
  key: 'root',
  storage,
  version: import.meta.env.VITE_YVY_LOCALSTORAGE_VERSION,
  blackList: [],
  migrate: createMigrate({
    [import.meta.env.VITE_YVY_LOCALSTORAGE_VERSION]: state => {
      return undefined;
    },
  }),
};

export const rootReducer = combineReducers({
  authSlice,
  product,
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
