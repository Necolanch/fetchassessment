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
        <div className="flex my-4">
            <div className="mr-4">
                <label htmlFor="minAge">Min Age</label>
                <input className="w-12 ml-2 p-2 h-6 border rounded-md border-slate-800 focus:outline-amber-300" name="minAge" onChange={changeAgeMin} type="number" />
            </div>

            <div className="">
                <label htmlFor="maxAge">Max Age</label>
                <input className="w-12 ml-2 h-6 p-2 border rounded-md border-slate-800 focus:outline-amber-300" name="maxAge" onChange={changeAgeMax} type="number" />
            </div>
        </div>
    )
}

export default AgeFilter;