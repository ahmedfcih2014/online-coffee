import DataTypes from 'sequelize'
import Config from './Config.js'

const User = Config.define('user' ,{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM,
        values: ['active' ,'blocked'],
        defaultValue: 'active'
    }
} ,{
    timestamps: false
})

export default User