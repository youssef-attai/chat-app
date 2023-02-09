import { PropsWithChildren, useState } from "react";
import AuthenticationPageContext, { AuthenticationPageContextValue, pages } from "./context";

export default function AuthenticationPageProvider({ children }: PropsWithChildren) {
    const [currentPage, setCurrentPage] = useState<pages>('login');

    const contextValue: AuthenticationPageContextValue = { currentPage, navigate: setCurrentPage }

    return (
        <AuthenticationPageContext.Provider value={contextValue}>
            {children}
        </AuthenticationPageContext.Provider>
    )
}