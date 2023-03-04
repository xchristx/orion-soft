// redux/toolkit
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

//
import { FIREBASE_API } from '../../../config';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

// const ADMIN_EMAILS = ['botines.workers@gmail.com'];

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
    return error;
  }
});

export const registerUser = createAsyncThunk('auth/register', async ({ email, password, firstName, lastName }) =>
  createUserWithEmailAndPassword(AUTH, email, password).then(async res => {
    const userRef = doc(collection(DB, 'users'), res.user?.uid);
    const data = {
      uid: res.user?.uid,
      email,
      firstName,
      lastName,
      rol: 'user',
    };

    await setDoc(userRef, { ...data, password });
    return data;
  })
);

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
      const user = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        isInitialized: true,
        user,
      };
    },
    setUserNull(state) {
      return {
        ...state,
        isAuthenticated: false,
        isInitialized: true,
        user: null,
      };
    },
    startLoading(state) {
      return {
        ...state,
        isLoading: true,
      };
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.user = null;
      console.log(action.payload);
    },
    setUserData(state, action) {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: {
          ...state.user,
          firstName: action.payload.firstName,
          rol: action.payload.rol,
          lastName: action.payload.lastName,
          uid: action.payload.uid,
          email: action.payload.email,
          photoUrl: action.payload.photoUrl ? action.payload.photoUrl : '',
        },
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
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        isInitialized: true,
        user: { ...state.user, email: actions.payload.email, uid: actions.payload.uid },
      };
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
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        isInitialized: true,
        user: { ...state.user, email: actions.payload.email, uid: actions.payload.uid },
      };
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.isInitialized = true;
      state.error = action.payload;
      state.user = null;
    });
  },
});
// Actions
export const setUserData = data => dispatch => {
  dispatch(slice.actions.startLoading());
  dispatch(slice.actions.setUserData(data));
};
// Reducer
export default slice.reducer;
export const { login, startLoading, hasError, setUserNull } = slice.actions;

// ----------------
