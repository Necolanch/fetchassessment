import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

interface PagesState {
    next: string,
    previous: string
}

const initialState: PagesState = {
    next: "",
    previous: ""
}

export const nextSlice = createSlice({
    name: "nextPage",
    initialState,
    reducers: {
        setNextPage: (state, action) => { state.next = action.payload },
        setPreviousPage: (state, action) => { state.previous = action.payload }
    }
})

export const { setNextPage, setPreviousPage } = nextSlice.actions;

const selectNextPage = (state: RootState) => state.pages.next;
const selectPreviousPage = (state: RootState) => state.pages.previous

export const selector = { selectNextPage, selectPreviousPage };

export default nextSlice.reducer;