import { PropsWithChildren, useCallback, useState } from 'react'
import AuthContext, { AuthContextValue } from '../contexts/AuthContext'
import authAPI from '../api/authClient';
import { CurrentUser, LoginResponse, RefreshResponse, SignUpResponse } from '../api/schemas';


function AuthProvider({ children }: PropsWithChildren) {
    const [accessToken, setAccessToken] = useState('');
    const [currentUser, setCurrentUser] = useState<CurrentUser | undefined>();

    const login = useCallback(async (username: string, password: string) => {
        try {
            const {
                data: {
                    accessToken: token,
                    currentUser: user
                } } = await authAPI.post<LoginResponse>('/login',
                    {
                        username,
                        password
                    },
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                    });
            setAccessToken(token);
            setCurrentUser(user);
        } catch (error) {
            setAccessToken('');
            setCurrentUser(undefined);
        }
    }, []);

    const signUp = useCallback(async (username: string, password: string) => {
        const {
            data: {
                accessToken: token,
                currentUser: user
            } } = await authAPI.post<SignUpResponse>('/new',
                {
                    username,
                    password
                });

        setAccessToken(token);
        setCurrentUser(user);
    }, [])

    const refresh = useCallback(async () => {
        console.log("refreshing");
        try {
            const {
                data: {
                    accessToken: token
                } } = await authAPI.get<RefreshResponse>('/refresh');

            setAccessToken(token);
            return token;
        } catch (error) {
            console.log(error);
            setAccessToken('');
        }
    }, []);

    const logout = useCallback(async () => {
        await authAPI.get('/logout');
        setCurrentUser(undefined);
    }, [])

    const contextValue: AuthContextValue = { currentUser, accessToken, login, signUp, refresh, logout }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider