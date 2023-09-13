import Sort from "./Sort";
import { useAppDispatch } from "../hooks";
import { useRef } from "react";
import { setSort } from "../features/filter/filterSlice";

const SortContainer = () => {
    const dispatch = useAppDispatch();
    const select = useRef<HTMLSelectElement | null>(null);

    const sort = () => {
        dispatch(setSort(select.current?.value))
    }
    return (
        <>
            <Sort reference={select} styles="w-24 h-6 border border-slate-800 rounded-md" sort={sort} />
        </>
    )
}

export default SortContainer;