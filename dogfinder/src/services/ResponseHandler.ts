import { IResponseHandler } from "./IResponseHandler";
import { useNavigate } from "react-router-dom";

export class ResponseHandler implements IResponseHandler {
    private nameError = document.getElementById("name-error");
    private emailError = document.getElementById("email-error");
    public async HandleResponse(response: any) {
        if (response?.message === "Please enter your name") {
            this.nameError!.style.display = "block";
        } else if (response?.message === "Please enter a valid email") {
            this.nameError!.style.display = "none";
            this.emailError!.style.display = "block";
        } else if (response === undefined) {
            this.nameError!.style.display = "none";
            this.emailError!.style.display = "none";
        }
    }
}