import { createContext } from "react"
import User from "../models/User";

export interface AuthContextValue {
    accessToken: string
    login: Function
    signUp: Function
    refresh: Function
    logout: Function
}

const AuthContext = createContext({} as AuthContextValue);

export default AuthContext;