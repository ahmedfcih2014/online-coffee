import DataTypes from 'sequelize'
import Config from './Config.js'

const ReservationCup = Config.define('coffee_reservations_cup' ,{
    coffee_reservation_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cup_size_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cup_size_price: {
        type: DataTypes.DOUBLE,
        defaultValue: 0
    },
    cup_flavor_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cup_flavor_price: {
        type: DataTypes.DOUBLE,
        defaultValue: 0
    }
} ,{
    timestamps: false
})

export default ReservationCup