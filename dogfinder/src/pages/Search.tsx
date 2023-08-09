import { useState, useEffect } from "react";
import Sort from "../components/Sort";
import { DogService } from "../services/dog/dogService";
import { Dog } from "../services/dog/IDog";
import { APIGateway } from "../services/APIGateway";
import { useNavigate } from "react-router-dom";
import BreedFilter from "../components/BreedFilter";
import DogDisplay from "../components/DogDisplay";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setIds } from "../features/dog/dogSlice";
import { setNextPage, setPreviousPage } from "../features/pages/next";

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

    useEffect(() => {
        if (!authorized) {
            navigate("/")
        }

        dogService.DogDefault()
            .then((response) => {
                dispatch(setIds(response.resultIds))
                dispatch(setNextPage(response.next))
            })
    }, [])

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
            })
    }

    const sortZtoA = () => {
        dogService.SortZtoA()
            .then((response: any) => {
                dispatch(setIds(response.resultIds))
            })
    }

    const previousPage = () => {
        dogService.PreviousPage()
            .then(response => {
                dispatch(setIds(response.resultIds))
                dispatch(setNextPage(response.next))
                if (response.prev) {
                    dispatch(setPreviousPage(response.prev))
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
                }
            })
    }
    //Filter component to filter by specific breeds
    //Sort component to sort results by ascending or descending
    return (
        <div className="flex">
            <div className="w-1/4 mt-40 flex flex-col">
                <Sort styles="" sortAtoZ={sortAtoZ} sortZtoA={sortZtoA} />
                <BreedFilter />
            </div>
            <section>
                <DogDisplay dogs={dogs} />
            </section>
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