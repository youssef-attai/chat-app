import { useState } from "react";
import useAuth from "../../../hooks/useAuth"
import { useAuthenticationPage } from "../hook"

export default function LoginPage() {
    const { navigate } = useAuthenticationPage()
    const { login } = useAuth()
    const [userId, setUserId] = useState('');

    return (
        <>
            <h1>Login</h1>
            <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="user ID" />
            <button onClick={() => { login(userId) }}>login</button>
            <button onClick={() => { navigate('signup') }}>go to sign up page</button>
        </>
    )
}