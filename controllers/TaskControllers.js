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


const GetTasks = async (req,res) => {
    try {
        const tasks = await Task.find()
        res.json(tasks)
    } catch (error) {
        res.json(error)
    }
}


const GetTasksByid = async (req,res) => {
    try {
        const tasks = await Task.findById(req.params.id)
        if(tasks){
          res.json(tasks)
        }else{
          res.status(404)
          res.json({
            "status" : 404,
            "message" : "Resourses Not Found"
          })
        }
        
    } catch (error) {
        if(error.name === 'CastError'){
            res.status(400)
            ErrorObject = {
               "error" : error.name,
               "kind" : error.kind,
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
    GetTasks,
    GetTasksByid,
}