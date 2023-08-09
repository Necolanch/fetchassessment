import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

interface AuthState {
    authorized: boolean;
}

const initialState: AuthState = {
    authorized: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthorized: (state, action) => { state.authorized = action.payload }
    }
})

export const { setAuthorized } = authSlice.actions;

const selectAuth = (state: RootState) => state.auth.authorized;

export const selector = { selectAuth };

export default authSlice.reducer;