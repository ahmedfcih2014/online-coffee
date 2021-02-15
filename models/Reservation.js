import DataTypes from 'sequelize'
import Config from './Config.js'

const Reservation = Config.define('coffee_reservation' ,{
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amount: {
        type: DataTypes.DOUBLE,
        defaultValue: 0
    },
    status: {
        type: DataTypes.ENUM,
        values: ['pending', 'approved', 'rejected'],
        defaultValue: 'pending'
    },
    number_of_cups: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true
    }
} ,{
    timestamps: false
})

export default Reservation