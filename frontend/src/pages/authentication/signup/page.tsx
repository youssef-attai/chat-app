import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useAuthenticationPage } from "../hook"

function SignUpPage() {
    const { navigate } = useAuthenticationPage()
    const { signUp } = useAuth()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <h1>Sign up</h1>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
            <button onClick={() => { signUp(username, password) }}>sign up</button>
            <button onClick={() => { navigate('login') }}>go to login page</button>
        </>
    )
}

export default SignUpPage