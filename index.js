const express = require('express')

const app = express()

app.use(express.json({extended: false})) //Allow to accept JSON data in API

const PORT = 5000

app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`))

