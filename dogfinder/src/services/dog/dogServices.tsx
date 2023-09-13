import React from "react";
import { IDogGateway } from "./IDogGateway";
import { APIGateway } from "../APIGateway";
import Contextualizer from "../Contextualizer";
import ProvidedServices from "../ProvidedServices";

const DogServiceContext = Contextualizer.createContext(ProvidedServices.DogServices);

export const useDogService = () => Contextualizer.use<IDogGateway>(ProvidedServices.DogServices);

interface IDogServicesProps {
    children: React.ReactNode,
    results: string[],
    nextPage: string,
    previousPage: string,
    breeds: string,
    ageMin: number | null,
    ageMax: number | null,
    matchIds: string[],
    match: string[],
    sort: string
}
const DogServices = ({ children, results, nextPage, previousPage, ageMin, ageMax, matchIds, match, sort, breeds }: IDogServicesProps) => {
    const _apiGateway = new APIGateway();
    const basePath: string = "https://frontend-take-home-service.fetch.com";

    const dogService = {
        async dogDefault(): Promise<any> {
            if (sort === "Z-A") {
                const path = breeds === "" ? `${basePath}/dogs/search?sort=breed:desc&ageMin=${ageMin}&ageMax=${ageMax}` : `${basePath}/dogs/search?sort=breed:desc&ageMin=${ageMin}&ageMax=${ageMax}${breeds}`
                return await _apiGateway.Get(`${path}`)
            }
            const path = breeds === "" ? `${basePath}/dogs/search?sort=breed:asc&ageMin=${ageMin}&ageMax=${ageMax}` : `${basePath}/dogs/search?sort=breed:asc&ageMin=${ageMin}&ageMax=${ageMax}${breeds}`
            return await _apiGateway.Get(`${path}`)
        },

        async getDogs(): Promise<any> {
            return await _apiGateway.Post(`${basePath}/dogs`, results)
        },

        async getBreeds(): Promise<string[]> {
            return await _apiGateway.Get(`${basePath}/dogs/breeds`)
        },

        async nextPage(): Promise<any> {
            return await _apiGateway.Get(`${basePath}${nextPage}`)
        },

        async previousPage(): Promise<any> {
            return await _apiGateway.Get(`${basePath}${previousPage}`)
        }
    }

    return (
        <>
            <DogServiceContext.Provider value={dogService}>
                {children}
            </DogServiceContext.Provider>
        </>
    )
}

export default DogServices;