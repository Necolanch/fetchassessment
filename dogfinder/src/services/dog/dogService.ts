import { IAPIGateway } from "../IAPIGateway";
import { IDogGateway } from "./IDogGateway";

export class DogService implements IDogGateway {
    private readonly _apiGateway: IAPIGateway;
    private readonly basePath: string = "https://frontend-take-home-service.fetch.com/dogs/search";

    constructor(apiGateway: IAPIGateway) {
        this._apiGateway = apiGateway;
    }

    public async DogDefault() {
        return await this._apiGateway.Get(`${this.basePath}?sort=breed:asc`)
    }

    public async SortZtoA() {
        return await this._apiGateway.Get(`${this.basePath}?sort=breed:desc`)
    }
}