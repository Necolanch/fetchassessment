import { useState, useEffect } from "react";
import Sort from "../components/Sort";
import BreedFilter from "../components/BreedFilter";
import DogDisplay from "../components/DogDisplay";
import { Button } from "../components/Button";
import { DogService } from "../services/dog/dogService";
import { Dog } from "../services/dog/IDog";
import { APIGateway } from "../services/APIGateway";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setIds } from "../features/dog/dogSlice";
import { setNextPage, setPreviousPage } from "../features/pages/next";
import AgeFilter from "../components/AgeFilter";
import Cookies from "js-cookie";

export const Search = () => {
    const apiGateway = new APIGateway();
    const dogService = new DogService(apiGateway);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [loading, setLoading] = useState(false);
    const resultIds = useAppSelector(state => state.dog.resultIds);
    const previous = useAppSelector(state => state.pages.previous);
    const next = useAppSelector(state => state.pages.next);
    const breedFilter = useAppSelector(state => state.filter.breeds);
    const ageMin = useAppSelector(state => state.filter.ageMin);
    const ageMax = useAppSelector(state => state.filter.ageMax);
    const [showBreeds, setShowBreeds] = useState(false);

    useEffect(() => {
        if (Cookies.get("frontendAuth") !== "token") {
            navigate("/")
        }

        dogService.DogDefault()
            .then((response) => {
                dispatch(setIds(response.resultIds))
                dispatch(setNextPage(response.next))
            })
    }, [breedFilter, ageMin, ageMax])

    useEffect(() => {
        dogService.GetDogs()
            .then(res => res.json())
            .then(data => setDogs(data))

        setLoading(true)
    }, [resultIds]);

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

    const previousPage = () => {
        dogService.PreviousPage()
            .then(response => {
                dispatch(setIds(response.resultIds))
                dispatch(setNextPage(response.next))
                if (response.prev) {
                    dispatch(setPreviousPage(response.prev))
                } else {
                    dispatch(setPreviousPage(""))
                }
            })
    }

    const nextPage = () => {
        dogService.NextPage()
            .then(response => {
                dispatch(setIds(response.resultIds))
                dispatch(setPreviousPage(response.prev))
                if (response.next) {
                    dispatch(setNextPage(response.next))
                } else {
                    dispatch(setNextPage(""))
                }
            })
    }

    return (
        <div className={`w-screen bg-gradient-to-tr from-[#40E0D0] to-teal-200 flex flex-col`}>
            <div className="w-screen h-20 relative top-12 flex justify-center items-center">
                <h1 className="font-light text-4xl text-cyan-950 text-center">NewHome</h1>
                <img src={require("../img/pawprint.png")} alt="Pawprint" width={40} height={40} />
            </div>
            <p className="mt-12 text-center font-light text-sm">New friend, new home</p>
            <div className={`w-screen mt-10 flex justify-center`}>
                <div className="w-full flex flex-col items-center">
                    <p className="">Filters</p>
                    <Sort styles="w-24 h-6 border border-slate-800 rounded-md" sortAtoZ={sortAtoZ} sortZtoA={sortZtoA} />
                    <AgeFilter />
                    <div className="w-full flex flex-col items-center">
                        <Button text={`${showBreeds ? "Hide Breeds" : "Show Breeds"}`} styles="hover:cursor-pointer w-32 h-12 bg-cyan-800 p-2 text-white rounded-sm font-medium" onClick={() => setShowBreeds(!showBreeds)} />
                        <p className="underline underline-offset-4 hover:cursor-pointer h-fit text-slate-800 p-2" onClick={() => navigate("/match")}>Find your Dog Match</p>
                    </div>
                    <main className={`${showBreeds ? "block" : "hidden"} absolute top-80 mt-8 w-72 h-64 overflow-auto p-4 rounded-md bg-cyan-800 text-slate-100`}>
                        <h4 className="text-center">Filter by Breeds</h4>
                        <BreedFilter containerStyles="" />
                    </main>
                </div>
            </div>
            <section className="w-screen mt-8 xl:grid xl:grid-cols-3 xl:gap-2">
                <DogDisplay dogs={dogs} />
            </section>
            <footer className="w-full flex justify-around my-10">
                {
                    previous === "" ? (
                        <p onClick={nextPage} className="hover:cursor-pointer hover:underline hover:text-slate-600">{`Next ->`}</p>
                    ) : next === "" ? (
                        <p className="hover:cursor-pointer hover:underline hover:text-slate-600" onClick={previousPage}>{`<- Previous`}</p>
                    ) : (
                        <>
                            <p className="hover:cursor-pointer hover:underline hover:text-slate-600" onClick={previousPage}>{`<- Previous`}</p>
                            <p className="hover:cursor-pointer hover:underline hover:text-slate-600" onClick={nextPage}>{`Next ->`}</p>
                        </>
                    )
                }

            </footer>
        </div>
    )
}