import { IAuthGateway } from "./IAuthGateway"
import Contextualizer from "../Contextualizer";
import ProvidedServices from "../ProvidedServices";

const AuthServiceContext = Contextualizer.createContext(ProvidedServices.AuthServices);

export const useAuthService = () => Contextualizer.use<IAuthGateway>(ProvidedServices.AuthServices)

const AuthServices = ({ children }: { children: React.ReactNode }) => {

    const authService = {
        async Login(name: string, email: string): Promise<any> {
            const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            const emailTest = re.test(email);
            if (name === (undefined || null || "")) {
                return { message: "Please enter your name" }
            } else if (emailTest === false) {
                return { message: "Please enter a valid email" }
            } else {
                fetch("https://frontend-take-home-service.fetch.com/auth/login", {
                    credentials: "include",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, email })
                })
                    .then(response => response)
            }
        }
    }

    return (
        <>
            <AuthServiceContext.Provider value={authService}>
                {children}
            </AuthServiceContext.Provider>
        </>
    )
}

export default AuthServices;