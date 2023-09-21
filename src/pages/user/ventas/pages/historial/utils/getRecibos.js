import { getDocs, collection } from 'firebase/firestore';
import { hasError, setData, startLoading } from '../../../../../../redux/slices/recibos';
import { recibosFormater } from '../formaters/recibosFormater';
import { DB } from '../../../../../../App';

export const getRecibos = () => async dispatch => {
  const dataRef = collection(DB, 'recibos');
  try {
    dispatch(startLoading());
    const docSnap = await getDocs(dataRef);
    let data = [];
    docSnap.forEach(el => {
      data = [...data, { ...recibosFormater(el.data()), id: el.id }];
    });
    dispatch(setData(data));
  } catch (error) {
    dispatch(hasError(error));
    return Promise.reject(error);
  }
};
