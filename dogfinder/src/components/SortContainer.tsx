import Sort from "./Sort";
import { DogService } from "../services/dog/dogService";
import { APIGateway } from "../services/APIGateway";
import { setIds } from "../features/dog/dogSlice";
import { setNextPage, setPreviousPage } from "../features/pages/next";
import { useAppDispatch } from "../hooks";
import { useRef } from "react";

const SortContainer = () => {
    const dispatch = useAppDispatch();
    const apiGateway = new APIGateway();
    const dogService = new DogService(apiGateway);
    const select = useRef<HTMLSelectElement | null>(null);

    const sortAtoZ = () => {
        dogService.DogDefault()
            .then(response => {
                dispatch(setIds(response.resultIds))
                dispatch(setNextPage(response.next))
                dispatch(setPreviousPage(""))
            })
    }

    const sortZtoA = () => {
        dogService.SortZtoA()
            .then((response: any) => {
                dispatch(setIds(response.resultIds))
                dispatch(setNextPage(response.next))
                dispatch(setPreviousPage(""))
            })
    }

    const sort = () => {
        if (select.current?.value === "A-Z") {
            return sortAtoZ();
        } else if (select.current?.value === "Z-A") {
            return sortZtoA();
        }
    }
    return (
        <>
            <Sort reference={select} styles="w-24 h-6 border border-slate-800 rounded-md" sort={sort} />
        </>
    )
}

export default SortContainer;