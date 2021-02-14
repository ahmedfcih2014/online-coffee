import Model from '../../models/Size.js'

const view_path = 'admin/sizes/'

export default {
    index: async (req ,res) => {
        const error = await req.consumeFlash('error'), success = await req.consumeFlash('success')
        const sizes = await Model.findAll()
        res.render(`${view_path}index` ,{
            page_title: 'Sizes Data',
            title: 'Sizes',
            current_uri: '/admin/sizes',
            uri_group: 'coffee-part',
            success, error,
            sizes
        })
    },
    create: (req ,res) => {
        res.render(`${view_path}create` ,{
            page_title: 'Create A Size',
            title: 'Sizes',
            current_uri: '/admin/sizes',
            uri_group: 'coffee-part'
        })
    },
    store: async (req ,res) => {
        const size = req.body
        const created = await Model.create(size)
        await req.flash(created ? 'success' : 'error' ,created ? 'Size created' : 'Can`t create this size')
        res.redirect('/admin/sizes')
    },
    edit: async (req ,res) => {
        const id = req.params.id
        const model = await Model.findByPk(id)
        res.render(`${view_path}edit` ,{
            page_title: 'Edit Size',
            title: 'Sizes',
            current_uri: '/admin/sizes',
            uri_group: 'coffee-part',
            model
        })
    },
    update: async (req ,res) => {
        const size = req.body
        const id = req.params.id
        const model = await Model.findByPk(id)
        const updated = await model.update(size)
        await req.flash(updated ? 'success' : 'error' ,updated ? 'Size updated' : 'Can`t update this size')
        res.redirect('/admin/sizes')
    },
    delete: async (req ,res) => {
        const id = req.params.id
        const model = await Model.findByPk(id)
        const deleted = await model.destroy()
        await req.flash(deleted ? 'success' : 'error' ,deleted ? 'Size deleted' : 'Can`t delete this size')
        res.redirect('/admin/sizes')
    }
}