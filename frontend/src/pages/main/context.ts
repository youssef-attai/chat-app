import { createContext } from "react"

export type pages = 'chat' | 'settings' | 'createRoom' | 'friendRequest';

export type MainPageContextValue = {
    currentPage: pages
    navigate: React.Dispatch<React.SetStateAction<pages>>
};

const MainPageContext = createContext({} as MainPageContextValue);

export default MainPageContext;