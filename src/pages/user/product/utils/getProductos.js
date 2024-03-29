import { getDocs, collection } from 'firebase/firestore';
import { productFormater } from '../formaters/productFormater';
import { DB } from '../../../../App';
import { hasError, setData, startLoading } from '../../../../redux/slices/product';

export const getProductos = () => async dispatch => {
  const dataRef = collection(DB, 'productos');
  try {
    dispatch(startLoading());
    const docSnap = await getDocs(dataRef);
    let data = [];
    docSnap.forEach(el => {
      data = [...data, productFormater(el.data())];
    });
    dispatch(setData(data));
  } catch (error) {
    dispatch(hasError(error));
    return Promise.reject(error);
  }
};
