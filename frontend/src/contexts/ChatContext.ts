import { createContext } from "react"

export interface ChatContextValue {
    sendMessage: (message: string, roomId: string) => Promise<void>
    onReceiveMsg: (callback: Function) => void
}

const ChatContext = createContext({} as ChatContextValue)

export default ChatContext