import express from 'express'
import middlewares from '../../middlewares.js'
import Users from '../../controllers/admin/Users.js'

const router = express.Router()

router.get('/' ,middlewares.is_admin_auth ,Users.index)
router.get('/block/:id' ,middlewares.is_admin_auth ,Users.block)
router.get('/active/:id' ,middlewares.is_admin_auth ,Users.active)
router.get('/delete/:id' ,middlewares.is_admin_auth ,Users.delete)

export default router