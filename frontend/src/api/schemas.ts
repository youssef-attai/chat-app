export interface Room {
    roomId: string,
    name: string
}

export interface Friend {
    userId: string,
    username: string
}

export interface CurrentUser {
    userId: string
    username: string,
    rooms: Room[]
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