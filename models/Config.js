import { Sequelize } from 'sequelize'

export default new Sequelize(
    'online_coffee',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
)