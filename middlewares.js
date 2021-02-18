export default {
    is_admin_auth: (req ,res ,next) => {
        if (req.session.admin) next()
        else res.redirect('/admin/login')
    },
    is_admin_unauth: (req ,res ,next) => {
        if (!req.session.admin) next()
        else res.redirect('/admin/statistics')
    },
    is_user_auth: (req ,res ,next) => {
        if (req.session.user) next()
        else res.redirect('/login')
    },
    is_user_unauth: (req ,res ,next) => {
        if (!req.session.user) next()
        else res.redirect('/')
    }
}