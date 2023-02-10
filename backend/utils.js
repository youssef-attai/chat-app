import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_EXPIRE_SECONDS, ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_EXPIRE_SECONDS, REFRESH_TOKEN_SECRET_KEY } from './env.js'

export function createAccessToken({ _id: userId }) {
    return jwt.sign({ userId }, ACCESS_TOKEN_SECRET_KEY, { expiresIn: `${ACCESS_TOKEN_EXPIRE_SECONDS}s` })
}

export function createRefreshToken({ _id: userId }) {
    return jwt.sign({ userId }, REFRESH_TOKEN_SECRET_KEY, { expiresIn: `${REFRESH_TOKEN_EXPIRE_SECONDS}s` })
}