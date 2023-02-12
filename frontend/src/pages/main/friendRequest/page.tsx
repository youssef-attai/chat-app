import { useState } from "react"
import friendsAPI from "../../../api/friendsClient";
import useAuth from "../../../hooks/useAuth";
import useMainPage from "../hook";

export default function FriendRequestPage() {
    const [username, setUsername] = useState<string>('');
    const { accessToken } = useAuth();
    const { navigate } = useMainPage();

    const handleSend = async () => {
        await friendsAPI(accessToken).post('/request', { username });
    }

    return (
        <>
            <button
                onClick={() => {
                    navigate('chat');
                }}>
                back to chat
            </button>
            <h1>Send a friend request</h1>
            <input type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
            <button onClick={handleSend}>send</button>
        </>
    )
}