import React from "react";
import Sort from "../components/Sort";
import { DogService } from "../services/dog/dogService";
import { APIGateway } from "../services/APIGateway";
import { useNavigate } from "react-router-dom";

export const Search = () => {
    const apiGateway = new APIGateway();
    const dogService = new DogService(apiGateway);
    const navigate = useNavigate();
    const authorized = JSON.parse(localStorage.getItem("user")!)

    if (!authorized) {
        navigate("/")
    }

    const sortAtoZ = () => {
        dogService.DogDefault()
            .then(response => console.log(response))
    }

    const sortZtoA = () => {
        dogService.SortZtoA()
            .then(response => console.log(response))
    }

    //Filter component to filter by specific breeds
    //Sort component to sort results by ascending or descending
    return (
        <>
            <Sort styles="" sortAtoZ={sortAtoZ} sortZtoA={sortZtoA} />
        </>
    )
}