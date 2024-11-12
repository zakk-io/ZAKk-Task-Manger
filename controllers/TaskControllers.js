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
        res.status(400)
        ErrorObject = {
            "error" : error.name,
            "type" : error._message || error.kind,
            "message" : error.message,
        }
        if(error.name === 'ValidationError' || error.name === 'CastError'){
            res.json(ErrorObject)
        }

        else{
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
               "type" : error.kind,
               "message" : error.message,
             }
             res.json(ErrorObject)
        }else{
            res.json(error)
        }
    }
}





const UpdateTask = async (req,res) => {
    try {
        const clean_data = {
            name :xss(req.body.name),
            complate : req.body.complate
        }

        const task = await Task.findByIdAndUpdate(req.params.id,clean_data,{new:true , runValidators : true})
        if(task){
            res.json(task)
          }else{
            res.status(404)
            res.json({
              "status" : 404,
              "message" : "Resourses Not Found"
            })
          }

    } catch (error) {
        res.status(400)
        ErrorObject = {
            "error" : error.name,
            "type" : error._message || error.kind,
            "message" : error.message,
        }

        if(error.name === 'ValidationError' || error.name === 'CastError'){
            res.json(ErrorObject)
        }

        else{
            res.json(error)
        }    
    }
    
}


const DeleteTask = async (req,res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id)
      if(task){
        res.json({
            "message" : "task deleted!"
          })
      }else{
        res.status(404)
        res.json({
          "status" : 404,
          "message" : "Resourses Not Found"
        })
      }
    } catch (error) {
        res.json(error)
    }
    
}



module.exports = {
    CreateTask,
    GetTasks,
    GetTasksByid,
    UpdateTask,
    DeleteTask
}