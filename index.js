const
    PORT = 3001
    mongoose = require('mongoose')
    express = require('express')
    app = express()
    MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/base'

mongoose.connect(MONGODB_URI, (err)=>{
    console.log(err||"connected to Mongo")
})

app.get('/api', (req, res) => {
	res.json({message: "API root."})
})

app.listen(PORT, (err)=>{
    console.log(err|| `connected at ${PORT}`)
})