const express = require('express')
const path = require('path')
const {handleJsonSyntaxError} = require('./middlewares')
const TaskRouters = require('./routers/TaskRouters')
const mongoose = require('mongoose')
require('dotenv').config();
const app = express()


const mongoUri = process.env.MONGODB_URI;
mongoose.connect(mongoUri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected!'));
app.use(express.json())


app.use(express.static(path.join(__dirname,'public')))
app.use(express.json())
app.use(handleJsonSyntaxError)
app.use(TaskRouters)

app.get('/tasks',(req,res) => {
    res.sendfile(path.join(__dirname,'public','index.html'))
})

app.get('/tasks/:id',(req,res) => {
    res.sendfile(path.join(__dirname,'public','task.html'))
})



app.listen(5000,() => console.log("server listening on port 5000"))