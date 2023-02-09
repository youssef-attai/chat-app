import { useContext } from "react";
import ChatContext from "../contexts/ChatContext";

export default function useChat() {
    return useContext(ChatContext)
}