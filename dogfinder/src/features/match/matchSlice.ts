import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

interface MatchState {
    matchIds: string[],
    match: string[]
}

const initialState: MatchState = {
    matchIds: [],
    match: []
}

export const matchSlice = createSlice({
    name: "match",
    initialState,
    reducers: {
        setMatchIds: (state, action) => { state.matchIds = [...state.matchIds, action.payload] },
        setMatch: (state, action) => { state.match = action.payload }
    }
})

export const { setMatchIds, setMatch } = matchSlice.actions;

const selectMatchIds = (state: RootState) => state.match.matchIds;
const selectMatch = (state: RootState) => state.match.match;

export const selector = { selectMatchIds, selectMatch };

export default matchSlice.reducer;