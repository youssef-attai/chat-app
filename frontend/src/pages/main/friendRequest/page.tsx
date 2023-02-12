import { useState } from "react"
import friendsAPI from "../../../api/friendsClient";
import useRefreshOnExpire from "../../../hooks/useRefreshOnExpire";
import useMainPage from "../hook";

export default function FriendRequestPage() {
    const [username, setUsername] = useState<string>('');
    const { navigate } = useMainPage();

    const sendFriendRequestFn = useRefreshOnExpire(async (token: string) => {
        await friendsAPI(token).post('/request', { username });
    });

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
            <button onClick={async () => { sendFriendRequestFn(); }}>send</button>
        </>
    )
}