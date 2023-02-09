import { useContext } from "react";
import AuthenticationPageContext from "./context";

export function useAuthenticationPage() {
    return useContext(AuthenticationPageContext)
}