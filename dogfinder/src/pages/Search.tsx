import { useState } from "react";
import SortContainer from "../components/SortContainer";
import BreedFilter from "../components/BreedFilter";
import DogDisplay from "../components/DogDisplay";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import AgeFilter from "../components/AgeFilter";
import useFetchData from "../hooks/useFetchData";
import FooterContainer from "../components/FooterContainer";

export const Search = () => {
    const navigate = useNavigate();
    const [showBreeds, setShowBreeds] = useState(false);

    const { dogs, loading } = useFetchData();

    return (
        <>
            {
                loading ? (<p>Loading...</p>) : (
                    <div className={`w-screen bg-gradient-to-tr from-[#40E0D0] to-teal-200 flex flex-col`}>
                        <div className="w-screen h-20 relative top-12 flex justify-center items-center">
                            <h1 className="font-light text-4xl text-cyan-950 text-center">NewHome</h1>
                            <img src={require("../img/pawprint.png")} alt="Pawprint" width={40} height={40} />
                        </div>
                        <p className="mt-12 text-center font-light text-sm">New friend, new home</p>
                        <div className={`w-screen mt-10 flex justify-center`}>
                            <div className="w-full flex flex-col items-center">
                                <p>Filters</p>
                                <SortContainer />
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
                        <section className="w-screen h-max mt-8 xl:grid xl:grid-cols-3 xl:gap-2">
                            <DogDisplay dogs={dogs} />
                        </section>
                        <FooterContainer />
                    </div>
                )
            }
        </>
    )
}