import { PropsWithChildren, useCallback, useState } from 'react'
import AuthContext, { AuthContextValue } from '../contexts/AuthContext'
import User from '../models/User';

function AuthProvider({ children }: PropsWithChildren) {
    const [currentUser, setCurrentUser] = useState<User | undefined>();

    const login = useCallback(async (userId: string) => {
        const res = await fetch('http://localhost:3000/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
        })
        const { user } = await res.json()
        setCurrentUser(user)
    }, [])


    const signUp = useCallback(async () => {

    }, [])


    const logout = useCallback(async () => {
        setCurrentUser(undefined)
    }, [])


    const contextValue: AuthContextValue = { currentUser, login, signUp, logout }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider