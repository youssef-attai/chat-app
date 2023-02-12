import { useCallback, useEffect, useState } from "react";
import { Friend } from "../../../api/schemas";
import useAuth from "../../../hooks/useAuth";
import useMainPage from "../hook";
import friendsAPI from '../../../api/friendsClient';
import roomsAPI from '../../../api/roomsClient';
import { AxiosError } from "axios";

export default function CreateRoomPage() {
    const { navigate } = useMainPage();
    const { accessToken, refresh } = useAuth();
    const [friends, setFriends] = useState<Friend[]>([]);
    const [roomName, setRoomName] = useState<string>('');
    const [selectedFriends, setSelectedFriends] = useState<string[]>([]);

    useEffect(() => {
        friendsAPI(accessToken)
            .get<Friend[]>('/')
            .then(({ data }) => setFriends(data))
            .catch(error => console.log(error));
    }, []);

    const selectFriend = (friend: string) => {
        setSelectedFriends(prev => {
            if (!prev.includes(friend)) return [...prev, friend];
            else return prev.filter(f => f != friend);
        });
    }

    // TODO: Extract the "try-again-on-token-expire" logic into a separate generic function
    const handleCreate = useCallback(async () => {
        try {
            await roomsAPI(accessToken).post('/', {
                roomName,
                members: selectedFriends
            });
            navigate('chat');
        } catch (error) {
            if ((error as AxiosError).response?.status == 403) {
                const newToken = await refresh();
                await roomsAPI(newToken).post('/', {
                    roomName,
                    members: selectedFriends
                });
                navigate('chat');
            } else {
                console.log(error);
            }
        }
    }, [accessToken]);

    return (
        <>
            <button onClick={() => { navigate('chat') }}>back to chat</button>
            <h1>Create room</h1>
            <input type="text" name="roomName" placeholder="room name" value={roomName} onChange={e => setRoomName(e.target.value)} />
            <button onClick={handleCreate}>create</button>
            <ul>
                {selectedFriends.map(friend => (
                    <p key={friend}>{friends.find(f => f.userId == friend)?.username}</p>
                ))}
            </ul>
            <ul>
                {friends.map(friend => (
                    <button key={friend.userId} onClick={() => { selectFriend(friend.userId) }}>{friend.username}</button>
                ))}
            </ul>
        </>
    )
}