import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import http from 'http';
import authRouter from './routers/auth.js';
import roomsRouter from './routers/room.js';
import friendsRouter from './routers/friends.js';
import './database/database.js';
import { PORT } from './env.js';
import User from './models/User.js';

const app = express();

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173'
    }
});

app.use('/auth', authRouter);
app.use('/rooms', roomsRouter);
app.use('/friends', friendsRouter);

io.on('connection', async (socket) => {
    const userId = socket.handshake.query.userId

    console.log(userId, 'connected');

    const foundUser = await User.findById(userId);
    foundUser.rooms.forEach(r => socket.join(r))

    socket.on('send-chat-msg', (message) => {
        console.log(message);
        io.in(message.roomId).emit('receive-chat-msg', { ...message, messageId: `msg${latestMsgId}` })
    })

    socket.on('disconnect', () => {
        console.log(userId, 'disconnected');
    })
});

server.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});

