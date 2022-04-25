const express = require('express')
const connectDB = require('./config/db')

const app = express()

// Connect to DB
connectDB()

app.use(express.json({extended: false})) //Allow to accept JSON data in API

const PORT = 5000

app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`))

