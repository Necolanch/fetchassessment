import React from "react";
import Sort from "../components/Sort";
import { DogService } from "../services/dog/dogService";
import { APIGateway } from "../services/APIGateway";
import { useNavigate } from "react-router-dom";
import BreedFilter from "../components/BreedFilter";
import DogDisplay from "../components/DogDisplay";

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
            <div className="w-1/4 mt-40 flex flex-col">
                <Sort styles="" sortAtoZ={sortAtoZ} sortZtoA={sortZtoA} />
                <BreedFilter />
                <DogDisplay />
            </div>
        </>
    )
}