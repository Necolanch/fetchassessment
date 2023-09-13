import { useAuthService } from "../services/auth/authServices";
import FormContainer from "../components/FormContainer";

export const Login = () => {
    const authService = useAuthService();
    return (
        <div className="w-screen h-screen flex flex-col items-center bg-gradient-to-tr from-[#40E0D0] to-teal-200">
            <FormContainer authGateway={authService} />
        </div>
    )
}