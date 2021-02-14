import Model from '../../models/Admin.js'
import bcrypt from 'bcrypt'
import Admin from '../../models/Admin.js'

export default {
    get_login: async (req ,res) => {
        const error = await req.consumeFlash('error') 
        res.render('admin/login' ,{error})
    },
    post_login: async (req ,res) => {
        // need to implement check data existance in DB
        const cred = {
            username: req.body.username,
            password: req.body.password
        }
        const admins = await Model.findAll({where: {username: cred.username}})
        if (admins[0]) {
            const passChecked = await bcrypt.compare(cred.password ,admins[0].password)
            if (passChecked) {
                req.session.admin = admins[0]
                res.redirect('/admin/statistics')
                return
            }
        }
        await req.flash('error' ,'Please enter a valid credentials')
        res.redirect('/admin/login')
    },
    logout: (req ,res) => {
        req.session.admin = undefined
        res.redirect('/admin/login')
    },
    get_profile: async (req ,res) => {
        const error = await req.consumeFlash('error')
        const success = await req.consumeFlash('success')
        res.render('admin/profile' ,{
            admin:req.session.admin,
            title: 'Admin Profile',
            current_uri: '/admin/profile',
            uri_group: '',
            success,
            error
        })
    },
    post_profile: async (req ,res) => {
        const data = req.body
        if (data.password == '') delete data.password
        if (data.password) {
            const hashedPass = await bcrypt.hash(data.password ,10)
            data.password = hashedPass
        }
        const model = await Admin.findByPk(req.session.admin.id)
        const updated = await model.update(data)
        if (updated) {
            req.session.admin.name = data.name
            req.session.admin.username = data.username
            await req.flash('success' ,'Your profile have been updated :)')
            res.redirect('back')
        } else {
            await req.flash('error' ,'Your profile didn`t updated :(')
            res.redirect('back')
        }
    }
}