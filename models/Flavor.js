import DataTypes from 'sequelize'
import Config from './Config.js'

const Flavor = Config.define('cup_flavor' ,{
    extra_price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    flavor_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
} ,{
    timestamps: false
})

export default Flavor