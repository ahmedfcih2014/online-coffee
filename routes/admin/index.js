import express from 'express'
import middlewares from '../../middlewares.js'
import Auth from '../../controllers/admin/Auth.js'
import Statistics from '../../controllers/admin/Statistics.js'

import flavors from './flavors.js'
import sizes from './sizes.js'
import users from './users.js'
import reservations from './reservations.js'

const router = express.Router()

router.get('/login' ,middlewares.is_admin_unauth ,Auth.get_login)
router.post('/login' ,middlewares.is_admin_unauth ,Auth.post_login)
router.get('/logout' ,middlewares.is_admin_auth ,Auth.logout)

router.get('/profile' ,middlewares.is_admin_auth ,Auth.get_profile)
router.post('/profile' ,middlewares.is_admin_auth ,Auth.post_profile)

router.get('/' ,middlewares.is_admin_auth ,Statistics.index)
router.get('/statistics' ,middlewares.is_admin_auth ,Statistics.index)

router.use('/flavors' ,flavors)
router.use('/sizes' ,sizes)
router.use('/users' ,users)
router.use('/reservations' ,reservations)

export default router