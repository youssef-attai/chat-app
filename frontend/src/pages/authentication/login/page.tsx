import { useState } from "react";
import useAuth from "../../../hooks/useAuth"
import { useAuthenticationPage } from "../hook"

export default function LoginPage() {
    const { navigate } = useAuthenticationPage()
    const { login } = useAuth()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <h1>Login</h1>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
            <button onClick={() => { login(username, password) }}>login</button>
            <button onClick={() => { navigate('signup') }}>go to sign up page</button>
        </>
    )
}