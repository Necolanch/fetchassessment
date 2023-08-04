export interface IAPIGateway {
    Get: <T>(path: string) => Promise<T>;
    Post: <T>(path: string, requestBody: { name: string, email: string }) => Promise<T>;
    PostNoBody: (path: string) => void;
}