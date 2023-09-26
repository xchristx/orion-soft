import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { hasError, startLoading } from '../slices/recibos';
import { DB } from '../../App';
import { getRecibos } from '../../pages/user/ventas/pages/historial/utils/getRecibos';

export const addRecibo = createAsyncThunk('recibos/add', async (data, { dispatch, getState }) => {
  const recibos = doc(DB, 'recibos', data.uid);
  dispatch(startLoading());
  try {
    await setDoc(recibos, data);
  } catch (error) {
    console.log(error);
    dispatch(hasError(error));
    return Promise.reject(error);
  } finally {
    await dispatch(getRecibos());
  }
});
export const editRecibo = createAsyncThunk('recibos/edit', async (data, { dispatch, getState }) => {
  const recibos = doc(DB, 'recibos', data.uid);
  dispatch(startLoading());
  try {
    await updateDoc(recibos, data);
  } catch (error) {
    console.log(error);
    dispatch(hasError(error));
    return Promise.reject(error);
  } finally {
    await dispatch(getRecibos());
  }
});
export const deleteRecibo = createAsyncThunk('recibos/delete', async (id, { dispatch, getState }) => {
  const recibos = doc(DB, 'recibos', id);
  dispatch(startLoading());
  try {
    await deleteDoc(recibos);
  } catch (error) {
    console.log(error);
    dispatch(hasError(error));
    return Promise.reject(error);
  } finally {
    await dispatch(getRecibos());
  }
});
