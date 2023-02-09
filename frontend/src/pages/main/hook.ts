import { useContext } from "react";
import MainPageContext from "./context";

export default function useMainPage() {
    return useContext(MainPageContext)
}