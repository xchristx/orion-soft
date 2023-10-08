import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { hasError, startLoading } from '../slices/recibos';
import { DB } from '../../App';
import { getVentas } from '../../pages/user/ventas/pages/historial/utils/getVentas';

export const addVenta = createAsyncThunk('ventas/add', async (data, { dispatch, getState }) => {
  const ventaRef = doc(DB, 'ventas', data.uid);
  const nuevoIdRef = doc(DB, 'idVenta', 'idVenta');
  dispatch(startLoading());
  try {
    await setDoc(ventaRef, data);
    await setDoc(nuevoIdRef, data.ventaId);
  } catch (error) {
    console.log(error);
    dispatch(hasError(error));
    return Promise.reject(error);
  }
  await dispatch(getVentas());
});
export const editVenta = createAsyncThunk('ventas/edit', async (data, { dispatch, getState }) => {
  const ventas = doc(DB, 'ventas', data.uid);
  dispatch(startLoading());
  try {
    await updateDoc(ventas, data);
  } catch (error) {
    console.log(error);
    dispatch(hasError(error));
    return Promise.reject(error);
  } finally {
    await dispatch(getVentas());
  }
});
export const deleteVenta = createAsyncThunk('ventas/delete', async (id, { dispatch, getState }) => {
  const ventas = doc(DB, 'ventas', id);
  dispatch(startLoading());
  try {
    await deleteDoc(ventas);
  } catch (error) {
    console.log(error);
    dispatch(hasError(error));
    return Promise.reject(error);
  } finally {
    await dispatch(getVentas());
  }
});
