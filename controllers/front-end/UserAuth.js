import bcrypt from 'bcrypt'
import UserModel from '../../models/User.js'

export default {
    login: async (req ,res) => {
        const errors = await req.consumeFlash('errors') ,success = await req.consumeFlash('success') ,error = await req.consumeFlash('error')
        res.render('front-end/login' ,{errors ,success ,error})
    },
    postLogin: async (req ,res) => {
        const user = await UserModel.findAll({where: {phone: req.body.phone}})
        if (user[0]) {
            const passCompared = await bcrypt.compare(req.body.password ,user[0].password)
            if (passCompared) {
                req.session.user = user[0]
                res.redirect('/')
                return
            }
        }
        await req.flash('error' ,'Enter valid data')
        res.redirect('back')
    },
    register: async (req ,res) => {
        const errors = await req.consumeFlash('errors')
        res.render('front-end/register' ,{errors})
    },
    postRegister: async (req ,res) => {
        const hashedPass = await bcrypt.hash(req.body.password ,10)
        const user = {
            name: req.body.name,
            phone: req.body.phone,
            password: hashedPass
        }
        const created = await UserModel.create(user)
        await req.flash(created ? 'success' : 'error' ,created ? 'Your account created ,login' : 'Please enter other phone')
        res.redirect('/login')
    },
}