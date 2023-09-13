import { useState, useEffect } from "react";
import { setIds } from "../features/dog/dogSlice";
import { setNextPage, setPreviousPage } from "../features/pages/next";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import Cookies from "js-cookie";
import { Dog } from "../services/dog/IDog";
import { useDogService } from "../services/dog/dogServices";

export default function useFetchData() {
    const dogService = useDogService();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const resultIds = useAppSelector(state => state.dog.resultIds);
    const breedFilter = useAppSelector(state => state.filter.breeds);
    const ageMin = useAppSelector(state => state.filter.ageMin);
    const ageMax = useAppSelector(state => state.filter.ageMax);
    const sort = useAppSelector(state => state.filter.sort)
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (Cookies.get("frontendAuth") !== "token") {
            navigate("/")
        }

        if (dogService !== undefined) {
            dogService.dogDefault()
                .then((response) => {
                    dispatch(setIds(response.resultIds))
                    dispatch(setNextPage(response.next))
                    dispatch(setPreviousPage(""))
                })
        }

    }, [breedFilter, ageMin, ageMax, sort])

    useEffect(() => {
        if (dogService !== undefined) {

            dogService.getDogs()
                .then(res => res.json())
                .then(data => setDogs([...data]))
        }

        setLoading(false)
    }, [resultIds])

    return { dogs, loading }
}