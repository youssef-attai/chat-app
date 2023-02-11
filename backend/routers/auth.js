import { Router } from 'express'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

import { createAccessToken, createRefreshToken } from '../utils.js'
import { REFRESH_TOKEN_EXPIRE_SECONDS, REFRESH_TOKEN_SECRET_KEY } from '../env.js'

import User from '../models/User.js'

const router = Router()

function loginResponse(accessToken, user) {
    return { accessToken, currentUser: { userId: user._id, username: user.username, rooms: user.rooms } };
}

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username) return res.status(400).json({ message: 'username field is missing' });
    if (!password) return res.status(400).json({ message: 'password field is missing' });

    const foundUser = await User.findOne({ username });
    if (!foundUser) return res.status(400).json({ message: 'invalid username' });

    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch) return res.status(400).json({ message: 'invalid password' });

    try {
        const refreshToken = createRefreshToken(foundUser)
        const accessToken = createAccessToken(foundUser)

        await foundUser.updateOne({ $set: { refresh: refreshToken } })

        res.cookie('refresh', refreshToken, {
            httpOnly: true,
            sameSite: 'none',
            maxAge: REFRESH_TOKEN_EXPIRE_SECONDS,
            secure: true
        })

        return res.status(200).json(loginResponse(accessToken, foundUser));
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'something went wrong' });
    }
})

router.post("/new", async (req, res) => {
    const { username, password } = req.body;

    if (!username) return res.status(400).json({ message: 'username field is missing' });
    if (!password) return res.status(400).json({ message: 'password field is missing' });

    try {
        const userId = new mongoose.Types.ObjectId();
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const refreshToken = createRefreshToken({ _id: userId });
        const accessToken = createAccessToken({ _id: userId });

        const newUser = new User({
            username,
            password: hashedPassword,
            refresh: refreshToken
        });

        newUser._id = userId;
        await newUser.save();

        res.cookie('refresh', refreshToken, {
            httpOnly: true,
            sameSite: 'none',
            maxAge: REFRESH_TOKEN_EXPIRE_SECONDS,
            secure: true
        });

        return res.status(201).json(loginResponse(accessToken, newUser));
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'something went wrong' });
    }
})

router.get("/refresh", async (req, res) => {
    if (!req.cookies.refresh) return res.status(401).json({ message: 'missing refresh token' });

    const refreshToken = req.cookies.refresh;

    const foundUser = await User.findOne({ refresh: refreshToken })
    if (!foundUser) return res.status(403).json({ message: 'invalid refresh token' });

    try {
        const accessToken = createAccessToken(foundUser);

        return res.status(200).json(loginResponse(accessToken, foundUser));
    } catch (error) {
        console.log(error);
        return res.sendStatus(403)
    }
})

router.get("/logout", async (req, res) => {
    if (!req.cookies.refresh) return res.sendStatus(204);

    const refreshToken = req.cookies.refresh;

    try {
        await User.updateOne({ refresh: refreshToken }, { $set: { refresh: "" } });

        res.clearCookie('refresh', {
            httpOnly: true,
            sameSite: 'none',
            secure: true
        });

        return res.sendStatus(204);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }
})

export default router;