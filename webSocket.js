import { Server } from 'socket.io'

const invoke = (web_server) => {
    const socket_server = new Server(web_server)

    const clients = new Map
    
    socket_server.on('connection' ,socket => {
        socket.on('user-reservation' ,data => {
            socket_server.emit('user-reservation' ,data)
        })
    
        socket.on('set-my-id' ,data => clients.set(data.id ,socket.id))
    
        socket.on('notify-user' ,data => {
            socket
            .broadcast
            .to(clients.get(data.user_id))
            .emit('reservation-changed' ,{message: data.message ,id: data.id ,status: data.status ,type: data.type})
        })
    })
}

export default invoke