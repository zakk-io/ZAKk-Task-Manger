const Task = require('../model/tasks')


const CreateTask = async (req,res) => {
    try {
        const data = await new Task(req.body)
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