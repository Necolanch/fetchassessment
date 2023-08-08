import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

interface DogState {
    resultIds: string[]
}

const initialState: DogState = {
    resultIds: []
}

export const dogSlice = createSlice({
    name: "dog",
    initialState,
    reducers: {
        setIds: (state, action) => { state.resultIds = action.payload }
    }
})

export const { setIds } = dogSlice.actions;

const selectIds = (state: RootState) => state.dog.resultIds;

export const selector = { selectIds };

export default dogSlice.reducer;