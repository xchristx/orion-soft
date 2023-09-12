import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { hasError, startLoading } from '../slices/clientes';
import { DB } from '../../App';
import { getClientes } from '../../pages/user/clientes/utils/getClientes';

export const addCliente = createAsyncThunk('clientes/add', async (data, { dispatch, getState }) => {
  const nuevoCliente = doc(DB, 'clientes', data.uid);
  dispatch(startLoading());
  try {
    await setDoc(nuevoCliente, data);
  } catch (error) {
    console.log(error);
    dispatch(hasError(error));
    return Promise.reject(error);
  } finally {
    await dispatch(getClientes());
  }
});
export const editCliente = createAsyncThunk('clientes/edit', async (data, { dispatch, getState }) => {
  const nuevoCliente = doc(DB, 'clientes', data.uid);
  dispatch(startLoading());
  try {
    await updateDoc(nuevoCliente, data);
  } catch (error) {
    console.log(error);
    dispatch(hasError(error));
    return Promise.reject(error);
  } finally {
    await dispatch(getClientes());
  }
});
export const deleteCliente = createAsyncThunk('clientes/delete', async (id, { dispatch, getState }) => {
  const nuevoCliente = doc(DB, 'clientes', id);
  dispatch(startLoading());
  try {
    await deleteDoc(nuevoCliente);
  } catch (error) {
    console.log(error);
    dispatch(hasError(error));
    return Promise.reject(error);
  } finally {
    await dispatch(getClientes());
  }
});
