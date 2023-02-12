import User from "../models/User.js";
import { Router } from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = Router();

router.get('/', isAuthenticated, async (req, res) => {
    try {
        const friends = await User.find({ _id: { $in: req.currentUser.friends } });
        res.status(200).json({ friends });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'something went wrong' });
    }
});

router.post('/request', isAuthenticated, async (req, res) => {
    try {
        const friend = await User.findOne({ username: req.body.username });
        await req.currentUser.updateOne({ $push: { friends: friend._id } });
        await User.findOneAndUpdate({ _id: friend._id }, { $push: { friends: req.currentUser._id } });
        res.status(200).json({ message: `you are new friends with "${req.body.username}"` })
    } catch (error) {
        res.status(400).json({ message: `invalid username: "${req.body.username}"` });
    }
});

export default router;