import { getDocs, collection } from 'firebase/firestore';
import { hasError, setData, startLoading } from '../../../../../../redux/slices/ventas';
import { ventasFormater } from '../formaters/ventasFormater';
import { DB } from '../../../../../../App';

export const getVentas = () => async dispatch => {
  const dataRef = collection(DB, 'ventas');
  try {
    dispatch(startLoading());
    const docSnap = await getDocs(dataRef);
    let data = [];
    docSnap.forEach(el => {
      data = [...data, { ...ventasFormater(el.data()), id: el.id }];
    });
    dispatch(setData(data));
  } catch (error) {
    dispatch(hasError(error));
    return Promise.reject(error);
  }
};
