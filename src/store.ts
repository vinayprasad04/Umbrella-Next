import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

interface UserState {
  loggedIn: boolean;
  userInitials: string;
}

const initialState: UserState = {
  loggedIn: false,
  userInitials: 'GU',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.loggedIn = true;
      state.userInitials = action.payload;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.userInitials = 'GU';
    },
  },
});

export const { login, logout } = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 