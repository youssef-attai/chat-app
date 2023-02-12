import { PropsWithChildren, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import ChatContext, { ChatContextValue } from "../contexts/ChatContext";
import useAuth from "../hooks/useAuth";

let socket: Socket;

export function ChatProvider({ children }: PropsWithChildren) {
    const { currentUser } = useAuth();
    const [receiveChatMsgCallbacks, setReceiveChatMsgCallbacks] = useState<Function[]>([]);

    useEffect(() => {
        if (currentUser === undefined) { } else socket = io('http://localhost:3000', { query: { userId: currentUser.userId } });

        return () => {
            socket.disconnect();
        }
    }, [currentUser]);

    useEffect(() => {
        socket.on('receive-chat-msg', (message) => {
            receiveChatMsgCallbacks.forEach(cb => cb(message))
        })

        return () => {
            socket.off('receive-chat-msg')
        }
    }, [receiveChatMsgCallbacks])

    const sendMessage = async (message: string, roomId: string) => {
        socket.emit('send-chat-msg', {
            content: message, roomId, sender: currentUser!.userId
        })
    }

    const onReceiveMsg = (callback: Function) => {
        setReceiveChatMsgCallbacks(prev => [...prev, callback])
    }

    const contextValue: ChatContextValue = { sendMessage, onReceiveMsg }

    return (
        <ChatContext.Provider value={contextValue}>
            {children}
        </ChatContext.Provider>
    )
}