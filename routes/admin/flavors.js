import express from 'express'
import middlewares from '../../middlewares.js'
import Flavors from '../../controllers/admin/Flavors.js'

const router = express.Router()

router.get('/' ,middlewares.is_admin_auth ,Flavors.index)
router.get('/create' ,middlewares.is_admin_auth ,Flavors.create)
router.post('/create' ,middlewares.is_admin_auth ,Flavors.store)
router.get('/edit/:id' ,middlewares.is_admin_auth ,Flavors.edit)
router.post('/edit/:id' ,middlewares.is_admin_auth ,Flavors.update)
router.get('/delete/:id' ,middlewares.is_admin_auth ,Flavors.delete)

export default router