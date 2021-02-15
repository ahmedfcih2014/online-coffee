import Model from '../../models/User.js'
import DefaultValues from '../../defaull-values.js'
import Pagination from '../../logic/Pagination.js'

const view_path = 'admin/users/'
const uri = '/admin/users'

export default {
    index: async (req ,res) => {
        const error = await req.consumeFlash('error'),
            success = await req.consumeFlash('success'),
            page = req.query.page ? parseInt(req.query.page) : DefaultValues.page ,
            limit = req.query.limit ? parseInt(req.query.limit) : DefaultValues.limit,
            options = {
                order: [
                    ['id' ,'desc']
                ],
                limit,
                offset: page * limit - limit
            },
            data = await Model.findAndCountAll(options),
            pages = Pagination(uri ,page ,data.count ,limit),
            users = data.rows
        res.render(view_path + 'index' ,{
            page_title: 'Users Data',
            title: 'Users',
            current_uri: uri,
            uri_group: 'users-part',
            success, error,
            users, pages, limit, page
        })
    },
    block: async (req ,res) => {
        const model = await Model.findByPk(req.params.id)
        let updated = undefined
        if (model) {
            updated = await model.update({status: 'blocked'})
        }
        await req.flash(updated ? 'success' : 'error' ,updated ? 'User blocked successfully' : 'Can`t block this user')
        res.redirect(uri)
    },
    active: async (req ,res) => {
        const model = await Model.findByPk(req.params.id)
        let updated = undefined
        if (model) {
            updated = await model.update({status: 'active'})
        }
        await req.flash(updated ? 'success' : 'error' ,updated ? 'User activated successfully' : 'Can`t activate this user')
        res.redirect(uri)
    },
    delete: async (req ,res) => {
        const model = await Model.findByPk(req.params.id)
        let updated = undefined
        if (model) {
            updated = await model.destroy()
        }
        await req.flash(updated ? 'success' : 'error' ,updated ? 'User deleted successfully' : 'Can`t delete this user')
        res.redirect(uri)
    }
}