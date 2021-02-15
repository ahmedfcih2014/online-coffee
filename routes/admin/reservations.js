import express from 'express'
import middlewares from '../../middlewares.js'
import Reservations from '../../controllers/admin/Reservations.js'

const router = express.Router()

router.get('/' ,middlewares.is_admin_auth ,Reservations.index)
router.get('/fetch/:user_id' ,middlewares.is_admin_auth ,Reservations.index)
router.get('/:id' ,middlewares.is_admin_auth ,Reservations.fetch)
router.post('/approve/:id' ,middlewares.is_admin_auth ,Reservations.approve)
router.post('/reject/:id' ,middlewares.is_admin_auth ,Reservations.reject)

export default router