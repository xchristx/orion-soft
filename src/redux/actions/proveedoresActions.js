import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { hasError, startLoading } from '../slices/proveedores';
import { DB } from '../../App';
import { getProveedores } from '../../pages/user/proveedores/utils/getProveedores';

export const addProvedor = createAsyncThunk('proveedores/add', async (data, { dispatch, getState }) => {
  const proveedor = doc(DB, 'proveedores', data.uid);
  dispatch(startLoading());
  try {
    await setDoc(proveedor, data);
  } catch (error) {
    console.log(error);
    dispatch(hasError(error));
    return Promise.reject(error);
  } finally {
    await dispatch(getProveedores());
  }
});
export const editProvedor = createAsyncThunk('proveedores/edit', async (data, { dispatch, getState }) => {
  const proveedor = doc(DB, 'proveedores', data.uid);
  dispatch(startLoading());
  try {
    await updateDoc(proveedor, data);
  } catch (error) {
    console.log(error);
    dispatch(hasError(error));
    return Promise.reject(error);
  } finally {
    await dispatch(getProveedores());
  }
});
export const deleteProvedor = createAsyncThunk('proveedores/delete', async (id, { dispatch, getState }) => {
  const proveedor = doc(DB, 'proveedores', id);
  dispatch(startLoading());
  try {
    await deleteDoc(proveedor);
  } catch (error) {
    console.log(error);
    dispatch(hasError(error));
    return Promise.reject(error);
  } finally {
    await dispatch(getProveedores());
  }
});
