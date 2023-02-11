import mongoose from "mongoose";

const Room = mongoose.model('Room', new mongoose.Schema({
    name: String,
    members: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    messages: [{ sender: { type: mongoose.Types.ObjectId, ref: 'User' }, content: String, default: [] }]
}));

export default Room;