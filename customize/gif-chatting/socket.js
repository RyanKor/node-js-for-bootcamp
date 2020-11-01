// import WebSocket from 'socket'
import SocketIo from 'socket.io'
import axios from 'axios'

module.exports = (server, app, sessionMiddleware)=>{
    // const sockets = new WebSocket.Server({server})
    const io = SocketIo(server, {path:'/socket.io'})
    app.set('io', io)
    const room = io.of('/room')
    const chat = io.of('/chat')
    io.use((socket,next)=>{
        sessionMiddleware(socket.request, socket.request.res, next)
    })
    room.on('connection', (socket)=>{
        console.log('room namespace connection')
        socket.on('disconnect', ()=>{
            console.log('room namespace disconnected')
        })
    })
    chat.on('connection', (socket)=>{
        console.log('chat namespace connected')
        const req = socket.request
        const {headers:{referer}} = req
        const roomId = referer
        .split('/')[referer.split('/').length-1]
        .replace(/\?.+/,'')
        socket.join(roomId) //방에 들어올 때
        socket.to(roomId).emit('join', {
            user: "system",
            chat: `${req.session.color} Entered`
        })
        socket.on('disconnect', ()=>{
            console.log('chat namespace disconneced')
            socket.leave(roomId) //방에 나갈 때
            const currentRoom = socket.adapter.rooms[roomId]
            const userCount = currentRoom ? currentRoom.length : 0
            if(userCount === 0){
                axios.delete(`http://localhost:8005/room/${roomId}`)
                .then(
                    ()=>{
                        console.log('Room Deleted')
                    }
                ).catch((error)=>{
                    console.error(error)
                })
            }else{
                socket.to(roomId).emit('exit', {
                    user:"system",
                    chat: `${req.session.color} exited`
                })
            }
        })
    })
}