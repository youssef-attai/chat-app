import { useState } from "react"
import useAuth from "../../../hooks/useAuth"
import useMainPage from "../hook";

function ChatPage() {
    const { navigate } = useMainPage();
    const { currentUser, logout } = useAuth();
    const [message, setMessage] = useState('');
    const [selectedRoomId, setSelectedRoomId] = useState('');

    return (
        <>
            <button
                onClick={() => {
                    navigate('createRoom');
                }}>
                create room
            </button>
            <button
                onClick={() => {
                    navigate('friendRequest');
                }}>
                send a friend request
            </button>
            <h1>Chat</h1>
            <input type="text" value={selectedRoomId} onChange={(e) => setSelectedRoomId(e.target.value)} placeholder="room ID" />
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="message" />
            <button>send</button>
            <ul>
                {currentUser?.rooms.map(room => {
                    return (
                        <li key={room.roomId}>
                            {room.name}
                        </li>
                    )
                })}
            </ul>
            <button onClick={() => { logout() }}>logout</button>
        </>
    )
}

export default ChatPage