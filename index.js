import express from 'express'

import admin_routes from './routes/admin/index.js'

const config = {
    port: 8080,
    host: 'localhost'
}
const app = express()
app.set('view engine' ,'ejs')
app.use(express.static('public'))

app.use('/admin' ,admin_routes)
app.get('/' ,(req ,res) => res.send('User Side will rendered here'))

app.listen(config.port ,config.host ,() => console.log(`Runing at http://${config.host}:${config.port}`))