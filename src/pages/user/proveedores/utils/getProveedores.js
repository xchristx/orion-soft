import { getDocs, collection } from 'firebase/firestore';
import { hasError, setData, startLoading } from '../../../../redux/slices/proveedores';
import { DB } from '../../../../App';
import { proveedoresFormater } from '../formaters/proveedoresFormater';

export const getProveedores = () => async dispatch => {
  const dataRef = collection(DB, 'proveedores');
  try {
    dispatch(startLoading());
    const docSnap = await getDocs(dataRef);
    let data = [];
    docSnap.forEach(el => {
      data = [...data, proveedoresFormater(el.data())];
    });
    dispatch(setData(data));
  } catch (error) {
    dispatch(hasError(error));
    return Promise.reject(error);
  }
};
