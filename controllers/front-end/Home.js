import Reservations from '../../models/Reservation.js'
import Cups from '../../models/ReservationCup.js'
import Size from '../../models/Size.js'
import Flavor from '../../models/Flavor.js'
import DefaultValues from '../../defaull-values.js'
import Pagination from '../../logic/Pagination.js'

Cups.belongsTo(Reservations ,{
    foreignKey: 'coffee_reservation_id'
})

Cups.belongsTo(Flavor ,{
    foreignKey: 'cup_flavor_id'
})

Cups.belongsTo(Size ,{
    foreignKey: 'cup_size_id'
})

Reservations.hasMany(Cups ,{
    foreignKey: 'coffee_reservation_id'
})

export default {
    get: async (req ,res) => {
        const
            page = req.query.page ? parseInt(req.query.page) : DefaultValues.page ,
            limit = DefaultValues.limit,
            options = {
                order: [
                    ['id' ,'desc']
                ],
                limit,
                offset: page * limit - limit,
                where: {user_id: req.session.user.id}
            },
            uri = '#my-reservations',
            data = await Reservations.findAndCountAll(options),
            pages = Pagination(uri ,page ,data.count ,limit),
            reservations = data.rows,
            sizes = await Size.findAll(),
            flavors = await Flavor.findAll()
        res.render('front-end/home-page' ,{
            reservations ,pages ,limit ,page ,sizes ,flavors ,user_id: req.session.user.id ,user: req.session.user
        })
    },
    fetch_reservation: async (req ,res) => {
        res.send(await Reservations.findByPk(req.params.id ,{
            include: [{
                model: Cups, include: [Size ,Flavor]
            }]
        }))
    },
    do_reserve: async (req ,res) => {
        console.log(req.body)
        const reservation = await Reservations.create({
            user_id: req.session.user.id,
            arrival_date: req.body.arrival_date,
            arrival_time: req.body.arrival_time
        })
        const cups = []
        let amount = 0 ,number_of_cups = 0
        for(let [index ,cup] of Object.entries(req.body.cups)) {
            const size = await Size.findByPk(cup.size)
            const flavor = await Flavor.findByPk(cup.flavor)
            cups.push({
                coffee_reservation_id: reservation.id,
                cup_size_id: cup.size,
                cup_size_price: size.extra_price,
                cup_flavor_id: cup.flavor,
                cup_flavor_price: flavor.extra_price,
            })
            amount += size.extra_price + flavor.extra_price
            number_of_cups++
        }
        Cups.bulkCreate(cups)
        await reservation.update({amount ,number_of_cups})
        res.send({
            message: 'Your reservation sent to our Shop wait for our response',
            location: '/',
            id: reservation.id,
            admin_message: `New reservation at ${reservation.arrival_date}`
        })
    }
}