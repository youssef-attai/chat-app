import { useEffect, useState } from "react"
import useAuth from "../../../hooks/useAuth"
import useChat from "../../../hooks/useChat";
import { Room } from "../../../models/Room";

function ChatPage() {
    const { currentUser, logout } = useAuth()
    const { sendMessage, onReceiveMsg } = useChat()
    const [rooms, setRooms] = useState([] as Room[])

    const [message, setMessage] = useState('')
    const [selectedRoomId, setSelectedRoomId] = useState('')

    useEffect(() => {
        onReceiveMsg((message: { roomId: string, content: string, sender: string, messageId: string}) => {
            console.log(message)
            setRooms(prev => {
                const roomsCopy = [...prev]
                roomsCopy.find(r => r.roomId === message.roomId)?.messages.push(message)
                return roomsCopy
            })
        })
        fetch(`http://localhost:3000/${currentUser!.userId}/rooms`)
            .then(res => res.json()
                .then(data => {
                    setRooms(data.rooms)
                }))
            .catch(error => console.log(error))
    }, [])

    return (
        <>
            <h1>Chat</h1>
            <input type="text" value={selectedRoomId} onChange={(e) => setSelectedRoomId(e.target.value)} placeholder="room ID" />
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="message" />
            <button onClick={async () => await sendMessage(message, selectedRoomId)}>send</button>
            <ul>
                {rooms.map(room => {
                    return (
                        <li key={room.roomId}>
                            <p>{room.roomName}</p>
                            <ul>
                                {room.messages.map(message => {
                                    return (
                                        <li key={message.messageId}>
                                            <span>{message.sender}</span>: <span>{message.content}</span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                    )
                })}
            </ul>
            <button onClick={() => { logout() }}>logout</button>
        </>
    )
}

export default ChatPage