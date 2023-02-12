import { createContext } from "react"
import { CurrentUser } from "../api/schemas";

export interface AuthContextValue {
    currentUser?: CurrentUser
    accessToken: string
    login: Function
    signUp: Function
    refresh: Function
    logout: Function
}

const AuthContext = createContext({} as AuthContextValue);

export default AuthContext;