import express from 'express'
import Home from '../../controllers/front-end/Home.js'
import UserAuthRouter from './auth.js'
import middlewares from '../../middlewares.js'

const router = express.Router()

router.get('/' ,middlewares.is_user_auth ,Home.get)
router.use(UserAuthRouter)

export default router