import { Message } from "./Message"

export interface Room {
    roomId: string
    roomName: string
    messages: Message[]
}