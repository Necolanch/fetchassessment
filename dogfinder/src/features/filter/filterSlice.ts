import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

interface FilterState {
    ageMin: number | null,
    ageMax: number | null,
    breeds: string,
    sort: string
}

const initialState: FilterState = {
    ageMin: null,
    ageMax: null,
    breeds: "",
    sort: ""
}

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setAgeMin: (state, action) => { state.ageMin = action.payload },
        setAgeMax: (state, action) => { state.ageMax = action.payload },
        setBreeds: (state, action) => { state.breeds += action.payload },
        removeBreeds: (state, action) => { state.breeds = action.payload },
        setSort: (state, action) => { state.sort = action.payload }
    }
})

export const { setAgeMin, setAgeMax, setBreeds, setSort, removeBreeds } = filterSlice.actions;

const selectAgeMin = (state: RootState) => state.filter.ageMin;
const selectAgeMax = (state: RootState) => state.filter.ageMax;
const selectBreeds = (state: RootState) => state.filter.breeds;
const selectSort = (state: RootState) => state.filter.sort;

export const selectors = { selectAgeMin, selectAgeMax, selectBreeds, selectSort };

export default filterSlice.reducer;