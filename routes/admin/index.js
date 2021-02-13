import express from 'express'

const router = express.Router()

router.get('/login' ,(req ,res) => res.render('login'))
router.get('/' ,(req ,res) => res.redirect('/admin/statistics'))
router.get('/statistics' ,(req ,res) => {
    res.render('layout' ,{
        title: 'Admin Portal',
        current_uri : '/admin/statistics',
        current_group: ''
    })
})

export default router