import Model from '../../models/Reservation.js'
import Cups from '../../models/ReservationCup.js'
import User from '../../models/User.js'
import Size from '../../models/Size.js'
import Flavor from '../../models/Flavor.js'
import DefaultValues from '../../defaull-values.js'
import Pagination from '../../logic/Pagination.js'

const view_path = 'admin/reservations/'
const uri = '/admin/reservations'

Cups.belongsTo(Model ,{
    foreignKey: 'coffee_reservation_id'
})

Cups.belongsTo(Flavor ,{
    foreignKey: 'cup_flavor_id'
})

Cups.belongsTo(Size ,{
    foreignKey: 'cup_size_id'
})

Model.hasMany(Cups ,{
    foreignKey: 'coffee_reservation_id'
})

Model.belongsTo(User ,{
    foreignKey: 'user_id'
})

export default {
    index: async (req ,res) => {
        const for_user = req.params.user_id ? req.params.user_id : undefined
        const error = await req.consumeFlash('error'),
            success = await req.consumeFlash('success'),
            page = req.query.page ? parseInt(req.query.page) : DefaultValues.page ,
            limit = req.query.limit ? parseInt(req.query.limit) : DefaultValues.limit,
            options = {
                order: [
                    ['id' ,'desc']
                ],
                limit,
                offset: page * limit - limit,
                include: [User]
            }

        if (for_user) options.where = {user_id : for_user}

        const data = await Model.findAndCountAll(options),
            pages = Pagination(uri ,page ,data.count ,limit),
            reservations = data.rows
        res.render(view_path + 'index' ,{
            page_title: (for_user ? 'User ' : '') + 'Reservations Data',
            title: (for_user ? 'User ' : '') + 'Reservations',
            current_uri: uri,
            uri_group: 'users-part',
            success, error,
            reservations, pages, limit, page
        })
    },
    fetch: async (req ,res) => {
        const model = await Model.findByPk(req.params.id ,{
                include: [User ,{
                    model: Cups, include: [Size ,Flavor]
                }]
            }) ,
            error = await req.consumeFlash('error'),
            success = await req.consumeFlash('success')
        if (model) {
            res.render(view_path + '/' + 'fetch' ,{
                page_title: 'Show Reservation Data',
                title: 'Show Reservation',
                current_uri: uri,
                uri_group: 'users-part',
                success, error, model
            })
        } else {
            await req.flash('error' ,'Reservation not exists')
            res.redirect(uri)
        }
    },
    approve: async (req ,res) => {
        const model = await Model.findByPk(req.params.id)
        if (!model) {
            await req.flash('error' ,'Reservation not exists')
            res.redirect(uri)
        } else {
            const updated = await model.update({comment: req.body.comment ,status: 'approved'})
            await req.flash(updated ? 'success' : 'error' ,'Reservation ' + (updated ? 'updated' : 'not updated'))
            res.redirect(uri)
        }
    },
    reject: async (req ,res) => {
        const model = await Model.findByPk(req.params.id)
        if (!model) {
            await req.flash('error' ,'Reservation not exists')
            res.redirect(uri)
        } else {
            const updated = await model.update({comment: req.body.comment ,status: 'rejected'})
            await req.flash(updated ? 'success' : 'error' ,'Reservation ' + (updated ? 'updated' : 'not updated'))
            res.redirect(uri)
        }
    }
}