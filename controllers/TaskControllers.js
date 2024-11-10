const Task = require('../model/tasks')
const xss = require('xss')

const CreateTask = async (req,res) => {
    try {
        const clean_data = {
            name :xss(req.body.name),
            complate : req.body.complate
        }

        const data = await new Task(clean_data)
        const task = await data.save()
        res.status(201)
        res.json(task)
    } catch (error) {
        if(error.name === 'ValidationError'){
           res.status(400)
           ErrorObject = {
              "error" : error.name,
              "type" : error._message,
              "message" : error.message,
            }
            res.json(ErrorObject)
        }else{
            res.json(error)
        }
    }
}


module.exports = {
    CreateTask,
}