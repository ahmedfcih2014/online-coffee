import express from 'express'
import { body ,validationResult } from 'express-validator'
import UserAuth from '../../controllers/front-end/UserAuth.js'
import middlewares from '../../middlewares.js'

const router = express.Router()

router.get('/login' ,middlewares.is_user_unauth ,UserAuth.login)
router.post(
    '/login' ,
    body('phone').exists().isLength({min: 1}).withMessage('Phone is a required filed'),
    body('password').exists().isLength({min: 1}).withMessage('Password is a required filed'),
    async (req ,res ,next) => { // here we fetch if data is invalid
        const errors = validationResult(req)
        const messages = []
        errors.errors.forEach(element => {
            messages.push(`<div class="alert alert-danger"> ${element.msg} </div>`)
        })
        if (messages.length > 0) {
            await req.flash('errors' ,messages.join(''))
            res.redirect('/login')
            return
        }
        next()
    },
    middlewares.is_user_unauth ,
    UserAuth.postLogin
)
router.get('/register' ,middlewares.is_user_unauth ,UserAuth.register)
router.post(
    '/register' ,
    body('phone').exists().isLength({min: 1}).withMessage('Phone is a required filed'),
    body('name').exists().isLength({min: 1}).withMessage('Name is a required filed'),
    body('password').exists().isLength({min: 1}).withMessage('Password is a required filed'),
    async (req ,res ,next) => { // here we fetch if data is invalid
        const errors = validationResult(req)
        const messages = []
        errors.errors.forEach(element => {
            messages.push(`<div class="alert alert-danger"> ${element.msg} </div>`)
        })
        if (messages.length > 0) {
            await req.flash('errors' ,messages.join(''))
            res.redirect('/register')
            return
        }
        next()
    },
    middlewares.is_user_unauth ,
    UserAuth.postRegister
)


export default router