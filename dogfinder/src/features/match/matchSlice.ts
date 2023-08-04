import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

interface MatchState {
    match: string[]
}

const initialState: MatchState = {
    match: []
}

export const matchSlice = createSlice({
    name: "match",
    initialState,
    reducers: {
        setMatch: (state, action) => { state.match = [...state.match, action.payload] }
    }
})

export const { setMatch } = matchSlice.actions;

const selectMatch = (state: RootState) => state.match.match;

export const selector = { selectMatch };

export default matchSlice.reducer;