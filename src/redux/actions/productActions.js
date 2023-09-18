import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { hasError, startLoading } from '../slices/clientes';
import { DB } from '../../App';
import { getProductos } from '../../pages/user/product/utils/getProductos';

export const addProducto = createAsyncThunk('producto/add', async (data, { dispatch, getState }) => {
  const nuevoProducto = doc(DB, 'productos', data.uid);
  dispatch(startLoading());
  try {
    await setDoc(nuevoProducto, data);
  } catch (error) {
    console.log(error);
    dispatch(hasError(error));
    return Promise.reject(error);
  } finally {
    await dispatch(getProductos());
  }
});
export const editProducto = createAsyncThunk('producto/edit', async (data, { dispatch, getState }) => {
  const nuevoProducto = doc(DB, 'productos', data.uid);
  dispatch(startLoading());
  try {
    await updateDoc(nuevoProducto, data);
  } catch (error) {
    console.log(error);
    dispatch(hasError(error));
    return Promise.reject(error);
  } finally {
    await dispatch(getProductos());
  }
});
export const deleteProducto = createAsyncThunk('producto/delete', async (id, { dispatch, getState }) => {
  const nuevoProducto = doc(DB, 'productos', id);
  dispatch(startLoading());
  try {
    await deleteDoc(nuevoProducto);
  } catch (error) {
    console.log(error);
    dispatch(hasError(error));
    return Promise.reject(error);
  } finally {
    await dispatch(getProductos());
  }
});
