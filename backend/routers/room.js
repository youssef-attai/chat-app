import { Router } from "express";
import mongoose from "mongoose";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import Room from "../models/Room.js";
import User from "../models/User.js";

const router = Router();

router.post('/', isAuthenticated, async (req, res) => {
    const roomId = new mongoose.Types.ObjectId();

    const roomMembers = req.body.members?.filter(member => req.currentUser.friends.includes(member)) ?? [];
    const members = [req.currentUser._id.toString(), ...roomMembers];

    console.log(members);

    try {
        const newRoom = new Room({
            name: req.body.roomName,
            members: members
        });
        newRoom._id = roomId;

        console.log(roomId);
        await User.updateMany({ _id: { $in: members } }, {
            $push: { rooms: roomId }
        });
        await newRoom.save();

        return res.status(201).json({ message: `created room: "${roomId}"` });
    } catch (error) {
        return res.status(400).json({ message: 'invalid user IDs' });
    }
})

export default router;