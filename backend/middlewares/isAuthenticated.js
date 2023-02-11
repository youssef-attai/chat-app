import jwt from 'jsonwebtoken'

import User from "../models/User.js";
import { ACCESS_TOKEN_SECRET_KEY } from "../env.js";

export default async function (req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'missing header: "Authorization"' })

    const accessToken = authorization.split(' ')[1]

    try {
        const { userId } = jwt.verify(accessToken, ACCESS_TOKEN_SECRET_KEY);
        
        const foundUser = await User.findById(userId);
        
        if (!foundUser) return res.status(403).json({ mesage: 'invalid access token' });

        req.currentUser = foundUser;

        next();
    } catch (error) {
        return res.status(403).json({message: 'expired access token'});
    }
}