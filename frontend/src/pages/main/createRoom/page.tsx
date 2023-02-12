import { useEffect, useState } from "react";
import { Friend } from "../../../api/schemas";
import useMainPage from "../hook";
import friendsAPI from '../../../api/friendsClient';
import roomsAPI from '../../../api/roomsClient';
import useRefreshOnExpire from "../../../hooks/useRefreshOnExpire";

export default function CreateRoomPage() {
    const { navigate } = useMainPage();
    const [friends, setFriends] = useState<Friend[]>([]);
    const [roomName, setRoomName] = useState<string>('');
    const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
    
    const createRoomFn = useRefreshOnExpire(async (token: string) => {
        await roomsAPI(token).post('/', {
            roomName,
            members: selectedFriends
        });
        navigate('chat');
    });

    const getFriendsFn = useRefreshOnExpire(async (token: string) => {
        const { data } = await friendsAPI(token).get<{ friends: Friend[] }>('/');
        setFriends(data.friends);
    })

    useEffect(() => {
        getFriendsFn().catch(err => console.log(err));
    }, []);

    const selectFriend = (friend: string) => {
        setSelectedFriends(prev => {
            if (!prev.includes(friend)) return [...prev, friend];
            else return prev.filter(f => f != friend);
        });
    }

    return (
        <>
            <button onClick={() => { navigate('chat') }}>back to chat</button>
            <h1>Create room</h1>
            <input type="text" name="roomName" placeholder="room name" value={roomName} onChange={e => setRoomName(e.target.value)} />
            <button onClick={async () => { await createRoomFn(); }}>create</button>
            <ul>
                {selectedFriends.map(friend => (
                    <p key={friend}>{friends.find(f => f._id == friend)?.username}</p>
                ))}
            </ul>
            <ul>
                {friends.map(friend => (
                    <button key={friend._id} onClick={() => { selectFriend(friend._id) }}>{friend.username}</button>
                ))}
            </ul>
        </>
    )
}