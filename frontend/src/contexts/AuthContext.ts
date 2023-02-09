import { createContext } from "react"
import User from "../models/User";

export interface AuthContextValue {
    currentUser?: User
    login: Function
    signUp: Function
    logout: Function
}

const AuthContext = createContext({} as AuthContextValue);

export default AuthContext;