// redux/toolkit
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

//
import { FIREBASE_API } from '../../../config';

// ----------------------------------------------------------------------

const firebaseApp = initializeApp(FIREBASE_API);

const AUTH = getAuth(firebaseApp);
const DB = getFirestore(firebaseApp);

// Extra Reducer
export const fetchUser = createAsyncThunk('auth/login', async ({ email, password }) => {
  try {
    const response = await signInWithEmailAndPassword(AUTH, email, password);
    const data = {
      email: response.user.email,
      uid: response.user.uid,
    };
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const registerUser = createAsyncThunk('auth/register', async ({ email, password, firstName, lastName }) => {
  try {
    const response = await createUserWithEmailAndPassword(AUTH, email, password);

    if (response.error) return Promise.reject(response.error);
    else {
      try {
        const userRef = doc(collection(DB, 'users'), response.user?.uid);
        const data = {
          uid: response.user?.uid,
          email,
          firstName,
          lastName,
          rol: 'user',
        };

        await setDoc(userRef, { ...data, password });
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
});

export const logout = () => signOut(AUTH);

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  isLoading: false,
  error: false,
  user: null,
};

const slice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    // START LOADING
    login(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isInitialized = true;
    },
    setUserNull(state) {
      state.isAuthenticated = false;
      state.isInitialized = true;
      state.user = null;
    },
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.user = null;
    },
    setUserData(state, action) {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = {
        ...state.user,
        firstName: action.payload.firstName,
        rol: action.payload.rol,
        lastName: action.payload.lastName,
        uid: action.payload.uid,
        email: action.payload.email,
        photoUrl: action.payload.photoUrl ? action.payload.photoUrl : '',
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, state => {
      state.isLoading = true;
      state.isAuthenticated = false;
      state.isInitialized = false;
    });
    builder.addCase(fetchUser.fulfilled, (state, actions) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.isInitialized = true;
      state.user = { ...state.user, email: actions.payload.email, uid: actions.payload.uid };
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.isInitialized = true;
      state.error = action.payload;
      state.user = null;
    });
    builder.addCase(registerUser.pending, state => {
      state.isLoading = true;
      state.isAuthenticated = false;
      state.isInitialized = false;
    });
    builder.addCase(registerUser.fulfilled, (state, actions) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.isInitialized = false;
      state.user = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.isInitialized = true;
      state.error = null;
      state.user = null;
    });
  },
});
// Actio
// Reducer
export default slice.reducer;
export const { login, startLoading, hasError, setUserNull, setUserData } = slice.actions;

// ----------------
