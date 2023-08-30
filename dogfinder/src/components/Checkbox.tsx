import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setBreeds, removeBreeds } from "../features/filter/filterSlice";

interface ICheckboxProps {
    breed: string;
}

const Checkbox = ({ breed }: ICheckboxProps) => {
    const [checked, setChecked] = useState(false);
    const dispatch = useAppDispatch();
    const breedParam = useAppSelector(state => state.filter.breeds);

    const filterBreed = (breed: string) => {
        setChecked(!checked);
        if (checked === false) {
            dispatch(setBreeds(`&breeds=${breed}`))
        } else {
            const newBreedParam = breedParam.replace(`&breeds=${breed}`, "")
            dispatch(removeBreeds(newBreedParam))
        }
    }
    return (
        <>
            <input value={breed} type="checkbox" onClick={() => filterBreed(breed)} />
        </>
    )
}

export default Checkbox;