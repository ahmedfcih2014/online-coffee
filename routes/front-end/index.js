import express from 'express'
import { body ,validationResult } from 'express-validator'
import Home from '../../controllers/front-end/Home.js'
import UserAuthRouter from './auth.js'
import middlewares from '../../middlewares.js'
import UserAuth from '../../controllers/front-end/UserAuth.js'

const router = express.Router()

router.get('/' ,middlewares.is_user_auth ,Home.get)
router.use(UserAuthRouter)
router.post(
    '/reserve',
    middlewares.is_user_auth,
    body('arrival_date').exists().isDate().withMessage('Invalid Arrival Date'),
    body('arrival_time').exists().withMessage('Invalid Arrival Time'),
    body('cups').exists().custom(cups => {
        console.log(cups)
        return new Promise((resolve ,reject) => {
            let has_error = false
            for(let [index ,cup] of Object.entries(cups)) {
                if (cup.size != '' && cup.flavor != '') continue
                else {
                    has_error = true
                    break
                }
            }
            if (has_error) reject()
            resolve()
        })
    }).withMessage('Please select size & flavor for all Cups you Need and remove others'),
    (req ,res ,next) => { // here we fetch if data is invalid
        const errors = validationResult(req)
        const messages = []
        errors.errors.forEach(element => {
            messages.push(`<div class="alert alert-danger"> ${element.msg} </div>`)
        })
        if (messages.length > 0) {
            res.status(400).send({messages})
            return
        }
        next()
    },
    Home.do_reserve
)
router.get('/my-reservations/:id' ,Home.fetch_reservation)
router.get('/logout' ,UserAuth.logout)

export default router