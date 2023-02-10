import * as dotenv from 'dotenv'

dotenv.config()

export const MONGODB_CONNECTION_URL = process.env.MONGODB_CONNECTION_URL
export const PORT = process.env.PORT || 3000
export const ACCESS_TOKEN_EXPIRE_SECONDS = parseInt(process.env.ACCESS_TOKEN_EXPIRE_SECONDS)
export const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY
export const REFRESH_TOKEN_EXPIRE_SECONDS = parseInt(process.env.REFRESH_TOKEN_EXPIRE_SECONDS)
export const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY