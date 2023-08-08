export interface IAPIGateway {
    Get: <T>(path: string) => Promise<T>;
    Login: <T>(path: string, requestBody: { name: string, email: string }) => Promise<T>;
    Post: <T>(path: string, requestBody: {}) => Promise<T>;
    PostNoBody: (path: string) => void;
}