const Sequelize = require('sequelize')
const config = require('../config')

const sequelize = new Sequelize(
    config.database.schema,
    config.database.username,
    config.database.password,
    {
        host: config.database.host,
        dialect: 'postgres'
    }
)

async function sequelizeInit() {
    try {
        await sequelize.authenticate()
        console.info('[Database] Connection has been established successfully.')

        try {
            await sequelize.sync()
            // await sequelize.sync({alter: true})
            console.info('[Database] Database synced.')
        } catch (err) {
            console.info('[Database] Unable to sync database:', err)
        }

    } catch (err) {
        console.error('[Database] Unable to connect to the database:', err)
    }
}

module.exports = {sequelize, sequelizeInit}

