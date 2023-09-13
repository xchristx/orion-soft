import { getDocs, collection } from 'firebase/firestore';
import { hasError, setData, startLoading } from '../../../../redux/slices/clientes';
import { clientesFormater } from '../formaters/clientesFormater';
import { DB } from '../../../../App';

export const getProductos = () => async dispatch => {
  const dataRef = collection(DB, 'productos');
  try {
    dispatch(startLoading());
    const docSnap = await getDocs(dataRef);
    let data = [];
    docSnap.forEach(el => {
      data = [...data, clientesFormater(el.data())];
    });
    dispatch(setData(data));
  } catch (error) {
    dispatch(hasError(error));
    return Promise.reject(error);
  }
};
