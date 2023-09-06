import { AuthService } from "../services/auth/authService";
import { APIGateway } from "../services/APIGateway";
import FormContainer from "../components/FormContainer";

export const Login = () => {
    const apiGateway = new APIGateway()
    const authService = new AuthService(apiGateway)
    return (
        <div className="w-screen h-screen flex flex-col items-center bg-gradient-to-tr from-[#40E0D0] to-teal-200">
            <FormContainer authGateway={authService} />
        </div>
    )
}