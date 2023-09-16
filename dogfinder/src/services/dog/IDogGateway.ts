export interface IDogGateway {
    dogDefault: () => Promise<any>;
    getBreeds: () => Promise<string[]>;
    getDogs: () => Promise<any>;
    nextPage: () => Promise<any>;
    previousPage: () => Promise<any>;
    match: () => Promise<any>;
    getMatch: () => Promise<any>;
}