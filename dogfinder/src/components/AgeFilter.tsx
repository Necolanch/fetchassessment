import { useAppDispatch } from "../hooks";
import { setAgeMax, setAgeMin } from "../features/filter/filterSlice";
import MinAgeFilter from "./MinAgeFilter";
import MaxAgeFilter from "./MaxAgeFilter";
import { ChangeEvent } from "react";

const AgeFilter = () => {
    const dispatch = useAppDispatch();

    const changeAgeMin = (e: any) => {
        if (e.target.value < 0) {
            console.log("age is less than 0")
        } else {
            dispatch(setAgeMin(e.target.value));
        }
    }

    const changeAgeMax = (e: any) => {
        if (e.target.value > 20) {
            console.log("age greater than 20");
        } else {
            dispatch(setAgeMax(e.target.value));
        }
    }
    return (
        <div className="flex my-4">
            <MinAgeFilter changeAgeMin={(e: ChangeEvent<HTMLInputElement>) => changeAgeMin(e)} />
            <MaxAgeFilter changeAgeMax={(e: ChangeEvent<HTMLInputElement>) => changeAgeMax(e)} />
        </div >
    )
}

export default AgeFilter;