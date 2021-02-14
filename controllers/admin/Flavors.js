import Model from '../../models/Flavor.js'

const view_path = 'admin/flavors/'

export default {
    index: async (req ,res) => {
        const error = await req.consumeFlash('error'), success = await req.consumeFlash('success')
        const flavors = await Model.findAll()
        res.render(`${view_path}index` ,{
            page_title: 'Flavors Data',
            title: 'Flavors',
            current_uri: '/admin/flavors',
            uri_group: 'coffee-part',
            success, error,
            flavors
        })
    },
    create: (req ,res) => {
        res.render(`${view_path}create` ,{
            page_title: 'Create A Flavor',
            title: 'Flavors',
            current_uri: '/admin/flavors',
            uri_group: 'coffee-part'
        })
    },
    store: async (req ,res) => {
        const flavor = req.body
        const created = await Model.create(flavor)
        await req.flash(created ? 'success' : 'error' ,created ? 'Flavor created' : 'Can`t create this flavor')
        res.redirect('/admin/flavors')
    },
    edit: async (req ,res) => {
        const id = req.params.id
        const model = await Model.findByPk(id)
        res.render(`${view_path}edit` ,{
            page_title: 'Edit Flavor',
            title: 'Flavors',
            current_uri: '/admin/flavors',
            uri_group: 'coffee-part',
            model
        })
    },
    update: async (req ,res) => {
        const flavor = req.body
        const id = req.params.id
        const model = await Model.findByPk(id)
        const updated = await model.update(flavor)
        await req.flash(updated ? 'success' : 'error' ,updated ? 'Flavor updated' : 'Can`t update this flavor')
        res.redirect('/admin/flavors')
    },
    delete: async (req ,res) => {
        const id = req.params.id
        const model = await Model.findByPk(id)
        const deleted = await model.destroy()
        await req.flash(deleted ? 'success' : 'error' ,deleted ? 'Flavor deleted' : 'Can`t delete this flavor')
        res.redirect('/admin/flavors')
    }
}