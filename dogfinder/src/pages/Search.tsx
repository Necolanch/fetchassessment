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
import { setBreeds } from "../features/filter/filterSlice";
import AgeFilter from "../components/AgeFilter";

export const Search = () => {
    const apiGateway = new APIGateway();
    const dogService = new DogService(apiGateway);
    const navigate = useNavigate();
    const authorized = localStorage.getItem("authorized");
    const dispatch = useAppDispatch();
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [loading, setLoading] = useState(false);
    const resultIds = useAppSelector(state => state.dog.resultIds);
    const previous = useAppSelector(state => state.pages.previous)
    const breedFilter = useAppSelector(state => state.filter.breeds);
    const ageMin = useAppSelector(state => state.filter.ageMin);
    const ageMax = useAppSelector(state => state.filter.ageMax)

    useEffect(() => {
        if (!authorized) {
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

    const applyFilters = () => {
        const breedsList = document.querySelectorAll(".breed") as NodeListOf<HTMLInputElement>;
        const breeds = [...breedsList];
        let breedParam = "";
        breeds.map(breed => {
            if (breed.checked) {
                breedParam += `&breeds=${breed.value}`
            }
        })
        console.log(breedParam)
        dispatch(setBreeds(breedParam))
    }

    return (
        <div className="flex">
            <div className="w-1/4 mt-40 flex flex-col">
                <Sort styles="" sortAtoZ={sortAtoZ} sortZtoA={sortZtoA} />
                <p>Filter</p>
                <AgeFilter />
                <BreedFilter />
                <Button text="Apply Filters" styles="" onClick={applyFilters} />
            </div>
            <section>
                <DogDisplay dogs={dogs} />
            </section>
            <p className="underline underline-offset-4 hover:cursor-pointer h-fit" onClick={() => navigate("/match")}>Find your Dog Match</p>
            <footer>
                {
                    previous === "" ? (
                        <p onClick={nextPage} className="hover:cursor-pointer">{`Next ->`}</p>
                    ) : (
                        <>
                            <p className="hover:cursor-pointer hover:text-red-500" onClick={previousPage}>{`<- Previous`}</p>
                            <p className="hover:cursor-pointer hover:text-red-500" onClick={nextPage}>{`Next ->`}</p>
                        </>
                    )
                }
            </footer>
        </div>
    )
}