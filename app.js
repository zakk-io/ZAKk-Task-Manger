const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config();
const app = express()



app.use(express.static(path.join(__dirname,'public')))

const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected!'));



app.listen(5000,() => console.log("server listening on port 5000"))