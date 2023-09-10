import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc } from 'firebase/firestore';
import { hasError, startLoading } from '../slices/recibos';
import { getRecibos } from '../../pages/user/ventas/pages/recibos/utils/getRecibos';
import { DB } from '../../App';

export const addRecibo = createAsyncThunk('recibos/add', async (data, { dispatch, getState }) => {
  const nuevoReciboRef = doc(DB, 'recibos', data.uid);
  const nuevoIdRef = doc(DB, 'idRecibo', 'idRecibo');
  dispatch(startLoading());
  try {
    await setDoc(nuevoReciboRef, data);
    await setDoc(nuevoIdRef, data.reciboId);
  } catch (error) {
    console.log(error);
    dispatch(hasError(error));
    return Promise.reject(error);
  }
  await dispatch(getRecibos());
});
