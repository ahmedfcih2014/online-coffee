import Admin from './models/Admin.js'
import bcrypt from 'bcrypt'

const password = 'secret'
const saltRounds = 10

bcrypt.hash(password ,saltRounds ,async (err ,hashedPassword) => {
    if (err) throw err
    await Admin.create({
        name: 'Admin User',
        username: 'admin',
        password: hashedPassword
    })
    console.log('Try admin & secret for login')
    process.exit()
})