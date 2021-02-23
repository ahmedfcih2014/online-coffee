import Admin from './models/Admin.js'
import bcrypt from 'bcrypt'

const password = 'secret'
const saltRounds = 10

bcrypt.hash(password ,saltRounds ,async (err ,hashedPassword) => {
    if (err) throw err
    let admin = await Admin.findByPk(1)
    if (admin) {
        await admin.update({password: hashedPassword})
    } else {
        admin = await Admin.create({
            name: 'Admin User',
            username: 'admin',
            password: hashedPassword
        })
    }
    console.log('Try admin & secret for login')
    process.exit()
})