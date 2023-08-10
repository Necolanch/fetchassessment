import { useAppDispatch } from "../hooks";
import { setAgeMax, setAgeMin } from "../features/filter/filterSlice";

const AgeFilter = () => {
    const dispatch = useAppDispatch();

    const changeAgeMin = (e: any) => {
        dispatch(setAgeMin(e.target.value));
    }

    const changeAgeMax = (e: any) => {
        dispatch(setAgeMax(e.target.value));
    }
    return (
        <>
            <label htmlFor="minAge">Min Age</label>
            <input name="minAge" onChange={changeAgeMin} type="number" />

            <label htmlFor="maxAge">Max Age</label>
            <input name="maxAge" onChange={changeAgeMax} type="number" />
        </>
    )
}

export default AgeFilter;