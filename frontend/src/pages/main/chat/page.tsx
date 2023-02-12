import { useEffect, useState } from "react"
import roomsAPI from "../../../api/roomsClient";
import { Room } from "../../../api/schemas";
import useAuth from "../../../hooks/useAuth"
import useRefreshOnExpire from "../../../hooks/useRefreshOnExpire";
import useMainPage from "../hook";

function ChatPage() {
    const { navigate } = useMainPage();
    const { logout } = useAuth();
    const [rooms, setRooms] = useState<Room[]>([]);
    const [message, setMessage] = useState('');
    const [selectedRoomId, setSelectedRoomId] = useState('');

    const getRoomsFn = useRefreshOnExpire(async (token: string) => {
        const { data } = await roomsAPI(token).get<{ rooms: Room[] }>('/');
        setRooms(data.rooms);
    })

    useEffect(() => {
        getRoomsFn().catch(error => console.log(error));
    }, [])

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
                {rooms.map((room => (<li key={room._id}>{room.name}</li>)))}
            </ul>
            <button onClick={() => { logout() }}>logout</button>
        </>
    )
}

export default ChatPage