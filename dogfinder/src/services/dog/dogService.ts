import { IAPIGateway } from "../IAPIGateway";
import { IDogGateway } from "./IDogGateway";
import { useAppSelector } from "../../hooks";

export class DogService implements IDogGateway {
    private readonly _apiGateway: IAPIGateway;
    private readonly basePath: string = "https://frontend-take-home-service.fetch.com";
    private readonly results: string[] = useAppSelector(state => state.dog.resultIds);
    private readonly next: string = useAppSelector(state => state.pages.next);
    private readonly previous: string = useAppSelector(state => state.pages.previous);
    private readonly breeds: string = useAppSelector(state => state.filter.breeds);
    private readonly ageMin: number | null = useAppSelector(state => state.filter.ageMin);
    private readonly ageMax: number | null = useAppSelector(state => state.filter.ageMax);
    private readonly matchIds: string[] = useAppSelector(state => state.match.matchIds);
    private readonly matchP: string[] = useAppSelector(state => state.match.match);

    constructor(apiGateway: IAPIGateway) {
        this._apiGateway = apiGateway;
    }

    public async dogDefault(): Promise<any> {
        const path = this.breeds === "" ? `${this.basePath}/dogs/search?sort=breed:asc&ageMin=${this.ageMin}&ageMax=${this.ageMax}` : `${this.basePath}/dogs/search?sort=breed:asc&ageMin=${this.ageMin}&ageMax=${this.ageMax}${this.breeds}`
        return await this._apiGateway.Get(`${path}`)
    }

    public async getBreeds(): Promise<string[]> {
        return await this._apiGateway.Get(`${this.basePath}/dogs/breeds`)
    }

    public async getDogs(): Promise<any> {
        return await this._apiGateway.Post(`${this.basePath}/dogs`, this.results)
    }

    public async nextPage(): Promise<any> {
        return await this._apiGateway.Get(`${this.basePath}${this.next}`)
    }

    public async previousPage(): Promise<any> {
        return await this._apiGateway.Get(`${this.basePath}${this.previous}`)
    }

    public async match(): Promise<any> {
        return await this._apiGateway.Post(`${this.basePath}/dogs/match`, this.matchIds)
    }

    public async getMatch(): Promise<any> {
        return await this._apiGateway.Post(`${this.basePath}/dogs`, this.matchP)
    }
}