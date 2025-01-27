const express = require('express')
const mongodb = require('./config/mongodbConfig')
const sequelize = require('./config/sqlConfig')

const app = express() 

mongodb()
sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Sync failed:', err));

app.listen(3000, ()=>{
    console.log("Server running at port 3000!")
})