import express from 'express'
import Home from '../../controllers/front-end/Home.js'

const router = express.Router()

router.get('/' ,Home.get)

export default router