import express from 'express'
import expressSession from 'express-session'
import redis from 'redis'
import connectRedis from 'connect-redis'
import {flash} from 'express-flash-message'
import { Server } from 'socket.io'

import admin_routes from './routes/admin/index.js'
import front_end_routes from './routes/front-end/index.js'

const config = {
    port: 8080,
    host: 'localhost'
}
const app = express()
app.set('view engine' ,'ejs')
app.use(express.static('public'))

const RedisStore = connectRedis(expressSession)
//Configure redis client
const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
})
redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
})
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
})

// use this middleware for static files
app.use(express.static('./public'))
app.use(express.urlencoded({extended: true}))
app.use(
    expressSession({
        store: new RedisStore({ client: redisClient }),
        secret: '$3cre6KEYM0stH3R3' ,saveUninitialized: false ,resave: false ,
        name: 'sid',
        cookie: {
            maxAge: 1000 * 60 * 60 * 2,
            sameSite: true,
            secure: false // most be true on production mode
        }
    })
)
app.use(flash({ sessionKeyName: 'flashMessage' }))

app.use('/admin' ,admin_routes)
app.use('/' ,front_end_routes)

const web_server = app.listen(
    config.port ,config.host ,() => console.log(`Runing at http://${config.host}:${config.port}`)
)

const socket_server = new Server(web_server)

const clients = new Map

socket_server.on('connection' ,socket => {
    socket.on('user-reservation' ,data => {
        socket_server.emit('user-reservation' ,data)
    })

    socket.on('set-my-id' ,data => {
        clients.set(data.id ,socket.id)
    })

    socket.on('notify-user' ,data => {
        socket
        .broadcast
        .to(clients.get(data.user_id))
        .emit('reservation-changed' ,{message: data.message ,id: data.id ,status: data.status ,type: data.type})
    })
})