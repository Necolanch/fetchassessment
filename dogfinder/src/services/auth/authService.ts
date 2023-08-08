import { IAPIGateway } from "../IAPIGateway";
import { IAuthGateway } from "./IAuthGateway";

export class AuthService implements IAuthGateway {
    private readonly _apiGateway: IAPIGateway;
    private readonly basePath: string = "https://frontend-take-home-service.fetch.com/auth";

    constructor(apiGateway: IAPIGateway) {
        this._apiGateway = apiGateway;
    }

    public async Login(name: string, email: string): Promise<any> {
        return await this._apiGateway.Login(`${this.basePath}/login`, { name, email });
    }

    public async Logout(): Promise<any> {
        return await this._apiGateway.PostNoBody(`${this.basePath}/logout`);
    }
}