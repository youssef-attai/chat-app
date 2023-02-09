import { PropsWithChildren, useCallback, useState } from 'react'
import AuthContext, { AuthContextValue } from '../contexts/AuthContext'
import User from '../models/User';

function AuthProvider({ children }: PropsWithChildren) {
    const [currentUser, setCurrentUser] = useState<User | undefined>();

    const login = useCallback(async (userId: string) => {
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