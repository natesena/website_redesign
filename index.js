const
    PORT = 3000
    mongoose = require('mongoose')
    express = require('express')
    app = express()

app.listen(PORT, (err)=>{
    console.log(err|| `connected at ${PORT}`)
})