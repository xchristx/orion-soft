// import './App.css';
// routes
import Router from './routes/router';

// theme
import ThemeProvider from './theme';

// components
import ScrollToTop from './components/scroll-to-top';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import NotistackProvider from './components/NotistackProvider';
// firebase
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { FIREBASE_API } from '../config';

import { useDispatch } from 'react-redux';
import { setUserData, setUserNull, startLoading } from './redux/slices/auth';
import { ProgressBarStyle } from './components/ProgressBar';
import MotionLazyContainer from './components/animate/MotionLazyContainer';

// ----------------------------------------------------------------------

export const firebaseApp = initializeApp(FIREBASE_API);
const AUTH = getAuth(firebaseApp);
export const DB = getFirestore(firebaseApp);
export default function App() {
  const dispatch = useDispatch();

  onAuthStateChanged(AUTH, async user => {
    if (user) {
      const userRef = doc(DB, 'users', user.uid);
      dispatch(startLoading());

      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        dispatch(setUserData(docSnap.data()));
      }
    } else {
      dispatch(setUserNull());
    }
  });

  return (
    <ThemeProvider>
      <NotistackProvider>
        <MotionLazyContainer>
          <ProgressBarStyle />
          <ScrollToTop />
          <Router />
        </MotionLazyContainer>
      </NotistackProvider>
    </ThemeProvider>
  );
}
