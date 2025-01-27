require("dotenv").config();
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnathorized: false
        }
    },
    logging: false
})

async function testConnection(){
    try{
        await sequelize.authenticate();
        console.log("Connected to Neon PostgreSQL!")
    }catch (error) {
        console.error("SQL Connection Error: ",error)
    }
}

testConnection()

module.exports = sequelize