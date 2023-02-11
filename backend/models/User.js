import mongoose from 'mongoose';

const User = mongoose.model('User', new mongoose.Schema({
    username: String,
    password: String,
    refresh: String,
    rooms: { type: [{ type: mongoose.Types.ObjectId, ref: 'Room' }], default: [] },
    friends: { type: [{ type: mongoose.Types.ObjectId, ref: 'User' }], default: [] }
}));

export default User;