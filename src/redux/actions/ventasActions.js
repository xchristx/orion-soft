import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, updateDoc, deleteDoc, arrayUnion } from 'firebase/firestore';
import { hasError, startLoading } from '../slices/ventas';
import { DB } from '../../App';
import { getVentas } from '../../pages/user/ventas/pages/historial/utils/getVentas';

export const addVenta = createAsyncThunk('ventas/add', async (data, { dispatch, getState }) => {
  const ventaRef = doc(DB, 'ventas', data.uid);
  const nuevoVentaId = doc(DB, 'idVenta', 'idVenta');
  const nuevoReciboIdRef = doc(DB, 'idRecibo', 'idRecibo');

  dispatch(startLoading());
  try {
    if (data.adelanto && parseFloat(data.adelanto) > 0) {
      await setDoc(nuevoReciboIdRef, { id: data.recibosVenta[0].reciboId });
    }
    await setDoc(ventaRef, data);
    await setDoc(nuevoVentaId, data.ventaId);
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
export const addReciboSaldo = createAsyncThunk('ventas/addRecibo', async ({ data, uid, totalAdelanto }, { dispatch, getState }) => {
  const ventas = doc(DB, 'ventas', uid);
  const nuevoReciboIdRef = doc(DB, 'idRecibo', 'idRecibo');
  dispatch(startLoading());
  try {
    await setDoc(nuevoReciboIdRef, { id: data.reciboId });
    await updateDoc(ventas, { recibosVenta: arrayUnion(data), adelanto: totalAdelanto });
  } catch (error) {
    console.log(error);
    dispatch(hasError(error));
    return Promise.reject(error);
  } finally {
    await dispatch(getVentas());
  }
});
export const changeReciboState = createAsyncThunk(
  'ventas/changeReciboState',
  async ({ uid, data, adelantoActualizado }, { dispatch, getState }) => {
    const ventas = doc(DB, 'ventas', uid);
    dispatch(startLoading());
    try {
      await updateDoc(ventas, { recibosVenta: data, adelanto: adelantoActualizado });
    } catch (error) {
      console.log(error);
      dispatch(hasError(error));
      return Promise.reject(error);
    } finally {
      await dispatch(getVentas());
    }
  }
);
