import express from 'express'
import middlewares from '../../middlewares.js'
import Sizes from '../../controllers/admin/Sizes.js'

const router = express.Router()

router.get('/' ,middlewares.is_admin_auth ,Sizes.index)
router.get('/create' ,middlewares.is_admin_auth ,Sizes.create)
router.post('/create' ,middlewares.is_admin_auth ,Sizes.store)
router.get('/edit/:id' ,middlewares.is_admin_auth ,Sizes.edit)
router.post('/edit/:id' ,middlewares.is_admin_auth ,Sizes.update)
router.get('/delete/:id' ,middlewares.is_admin_auth ,Sizes.delete)

export default router