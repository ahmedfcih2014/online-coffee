import DataTypes from 'sequelize'
import Config from './Config.js'

const Admin = Config.define('admin' ,{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
} ,{
    timestamps: false
})

export default Admin