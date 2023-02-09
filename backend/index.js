import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'

let latestMsgId = 3

const users = [
    {
        userId: 'youssef',
        username: 'Youssef Attai',
        rooms: ['potato', 'asgard']
    },
    {
        userId: 'omar',
        username: 'Omar Taai',
        rooms: ['potato']
    },
    {
        userId: 'ashraf',
        username: 'AboAshraf',
        rooms: ['asgard']
    }
]

const rooms = [
    {
        roomId: 'potato',
        roomName: 'ThePotatoes',
        messages: [
            {
                messageId: 'msg1',
                sender: 'youssef',
                content: 'lol'
            },
            {
                messageId: 'msg2',
                sender: 'omar',
                content: 'damn'
            }
        ]
    },
    {
        roomId: 'asgard',
        roomName: 'Asgardians of the GALAxi',
        messages: [
            {
                messageId: 'msg3',
                sender: 'ashraf',
                content: 'ya sater'
            }
        ]
    },
]

const app = express();

app.use(cors())
app.use(express.json())

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173'
    }
});

app.post('/login', (req, res) => {
    const userId = req.body.userId
    res.json({ user: users.find(u => u.userId === userId) })
})

app.get('/:userId/rooms', (req, res) => {
    const userId = req.params.userId;
    res.json({ rooms: users.find(u => u.userId === userId).rooms.map(roomId => rooms.find(r => r.roomId === roomId)) })
});

io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId

    console.log(userId, 'connected');

    users.find(u => u.userId === userId).rooms.forEach(r => socket.join(r))

    socket.on('send-chat-msg', (message) => {
        console.log(message);
        latestMsgId++
        io.in(message.roomId).emit('receive-chat-msg', {...message, messageId: `msg${latestMsgId}`})
    })

    socket.on('disconnect', () => {
        console.log(userId, 'disconnected');
    })
});

server.listen(3000, () => {
    console.log(`server running on http://localhost:${3000}`);
});

