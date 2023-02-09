import { createContext } from "react"

export type pages = 'login' | 'signup'

export type AuthenticationPageContextValue = {
    currentPage: pages
    navigate: React.Dispatch<React.SetStateAction<pages>>
}

const AuthenticationPageContext = createContext({} as AuthenticationPageContextValue)

export default AuthenticationPageContext