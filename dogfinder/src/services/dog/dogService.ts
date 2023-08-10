import { IAPIGateway } from "../IAPIGateway";
import { IDogGateway } from "./IDogGateway";
import { useAppSelector } from "../../hooks";

export class DogService implements IDogGateway {
    private readonly _apiGateway: IAPIGateway;
    private readonly basePath: string = "https://frontend-take-home-service.fetch.com";
    private readonly results: string[] = useAppSelector(state => state.dog.resultIds);
    private readonly nextPage: string = useAppSelector(state => state.pages.next);
    private readonly previousPage: string = useAppSelector(state => state.pages.previous);
    private readonly breeds: string = useAppSelector(state => state.filter.breeds);
    private readonly ageMin: number | null = useAppSelector(state => state.filter.ageMin);
    private readonly ageMax: number | null = useAppSelector(state => state.filter.ageMax);

    constructor(apiGateway: IAPIGateway) {
        this._apiGateway = apiGateway;
    }

    public async DogDefault(): Promise<any> {
        const path = this.breeds === "" ? `${this.basePath}/dogs/search?sort=breed:asc&ageMin=${this.ageMin}&ageMax=${this.ageMax}` : `${this.basePath}/dogs/search?sort=breed:asc&ageMin=${this.ageMin}&ageMax=${this.ageMax}${this.breeds}`
        return await this._apiGateway.Get(`${path}`)
    }

    public async SortZtoA() {
        const path = this.breeds === "" ? `${this.basePath}/dogs/search?sort=breed:desc&ageMin=${this.ageMin}&ageMax=${this.ageMax}` : `${this.basePath}/dogs/search?sort=breed:desc&ageMin=${this.ageMin}&ageMax=${this.ageMax}${this.breeds}`
        return await this._apiGateway.Get(`${path}`)
    }

    public async GetBreeds(): Promise<string[]> {
        return await this._apiGateway.Get(`${this.basePath}/dogs/breeds`)
    }

    public async GetDogs(): Promise<any> {
        return await this._apiGateway.Post(`${this.basePath}/dogs`, this.results)
    }

    public async NextPage(): Promise<any> {
        return await this._apiGateway.Get(`${this.basePath}${this.nextPage}`)
    }

    public async PreviousPage(): Promise<any> {
        return await this._apiGateway.Get(`${this.basePath}${this.previousPage}`)
    }
}