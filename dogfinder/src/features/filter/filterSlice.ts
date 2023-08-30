import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

interface FilterState {
    ageMin: number | null,
    ageMax: number | null,
    breeds: string,
    zipCodes: string[]
}

const initialState: FilterState = {
    ageMin: null,
    ageMax: null,
    breeds: "",
    zipCodes: []
}

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setAgeMin: (state, action) => { state.ageMin = action.payload },
        setAgeMax: (state, action) => { state.ageMax = action.payload },
        setBreeds: (state, action) => { state.breeds += action.payload },
        removeBreeds: (state, action) => { state.breeds = action.payload },
        setZipCodes: (state, action) => { state.zipCodes = action.payload }
    }
})

export const { setAgeMin, setAgeMax, setBreeds, setZipCodes, removeBreeds } = filterSlice.actions;

const selectAgeMin = (state: RootState) => state.filter.ageMin;
const selectAgeMax = (state: RootState) => state.filter.ageMax;
const selectBreeds = (state: RootState) => state.filter.breeds;
const selectZipCodes = (state: RootState) => state.filter.zipCodes;

export const selectors = { selectAgeMin, selectAgeMax, selectBreeds, selectZipCodes };

export default filterSlice.reducer;