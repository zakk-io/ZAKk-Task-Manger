const mongoose = require('mongoose')


const TasksSchema =  mongoose.Schema(
    {
        name : {
            type : String,
            maxlength : 50,
            required : true
        },

        complate : {
            type : Boolean,
            required : true
        }
    }
)


const Task = mongoose.model('Task',TasksSchema,'Task')

module.exports = Task