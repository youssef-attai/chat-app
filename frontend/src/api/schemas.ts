export interface Room {
    _id: string,
    name: string
}

export interface Friend {
    _id: string,
    username: string
}

export interface CurrentUser {
    _id: string
    username: string
}

export interface LoginResponse {
    accessToken: string,
    currentUser: CurrentUser
}
export interface RefreshResponse {
    accessToken: string,
    currentUser: CurrentUser
}
export interface SignUpResponse {
    accessToken: string,
    currentUser: CurrentUser
}