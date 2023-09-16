import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { Dog } from "../services/dog/IDog";
import { setMatch } from "../features/match/matchSlice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDogService } from "../services/dog/dogServices";


export default function useFetchMatch() {
    const dogService = useDogService();
    const match = useAppSelector(state => state.match.match)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [dogMatch, setDogMatch] = useState<Dog[]>([]);

    useEffect(() => {
        if (Cookies.get("frontendAuth") !== "token") {
            navigate("/")
        }

        dogService.match()
            .then(response => response.json())
            .then(data => dispatch(setMatch([data.match])))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        dogService.getMatch()
            .then(response => response.json())
            .then(data => setDogMatch(data))
            .catch(err => console.log(err))
    }, [match])

    return { dogMatch }

}