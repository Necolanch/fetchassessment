export interface IUser {
    name: string;
    email: string;
    Login: (name: string, email: string) => Promise<string>;
    Logout: () => Promise<string>;
}