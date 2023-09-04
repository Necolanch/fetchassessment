import { useState, useEffect } from "react";
import { setIds } from "../features/dog/dogSlice";
import { setNextPage, setPreviousPage } from "../features/pages/next";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import Cookies from "js-cookie";
import { APIGateway } from "../services/APIGateway";
import { DogService } from "../services/dog/dogService";
import { Dog } from "../services/dog/IDog";

export default function useFetchData() {
    const apiGateway = new APIGateway();
    const dogService = new DogService(apiGateway);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const resultIds = useAppSelector(state => state.dog.resultIds);
    const breedFilter = useAppSelector(state => state.filter.breeds);
    const ageMin = useAppSelector(state => state.filter.ageMin);
    const ageMax = useAppSelector(state => state.filter.ageMax);
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (Cookies.get("frontendAuth") !== "token") {
            navigate("/")
        }

        dogService.DogDefault()
            .then((response) => {
                dispatch(setIds(response.resultIds))
                dispatch(setNextPage(response.next))
                dispatch(setPreviousPage(""))
            })
    }, [breedFilter, ageMin, ageMax])

    useEffect(() => {
        dogService.GetDogs()
            .then(res => res.json())
            .then(data => setDogs([...data]))

        setLoading(false)
    }, [resultIds])

    return { dogs, loading }
}