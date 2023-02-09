import { PropsWithChildren, useState } from "react";
import MainPageContext, { MainPageContextValue, pages } from "./context";

export default function MainPageProvider({ children }: PropsWithChildren) {
    const [currentPage, setCurrentPage] = useState<pages>('chat');

    const contextValue: MainPageContextValue = { currentPage, navigate: setCurrentPage }

    return (
        <MainPageContext.Provider value={contextValue}>
            {children}
        </MainPageContext.Provider>
    )
}