import { PropsWithChildren, useEffect, useState } from "react";
import ChatContext, { ChatContextValue } from "../contexts/ChatContext";
import useAuth from "../hooks/useAuth";

export function ChatProvider({ children }: PropsWithChildren) {
    const { currentUser } = useAuth()

    useEffect(() => {
        if (currentUser === undefined) { } else socket = io('http://localhost:3000', { query: { userId: currentUser.userId } })

        return () => {
            socket.disconnect()
        }
    }, [currentUser])


    const contextValue: ChatContextValue = { sendMessage, onReceiveMsg }

    return <ChatContext.Provider value={contextValue}>
        {children}
    </ChatContext.Provider>
}