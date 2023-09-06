import { useState, useEffect } from "react";
import { APIGateway } from "../services/APIGateway";
import { DogService } from "../services/dog/dogService";
import { useAppSelector, useAppDispatch } from "../hooks";
import { Dog } from "../services/dog/IDog";
import { setMatch } from "../features/match/matchSlice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


export default function useFetchMatch() {
    const apiGateway = new APIGateway();
    const dogService = new DogService(apiGateway);
    const match = useAppSelector(state => state.match.match)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [dogMatch, setDogMatch] = useState<Dog[]>([]);

    useEffect(() => {
        if (Cookies.get("frontendAuth") !== "token") {
            navigate("/")
        }

        dogService.Match()
            .then(response => response.json())
            .then(data => dispatch(setMatch([data.match])))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        dogService.GetMatch()
            .then(response => response.json())
            .then(data => setDogMatch(data))
            .catch(err => console.log(err))
    }, [match])

    return { dogMatch }

}