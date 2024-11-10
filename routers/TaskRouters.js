const express = require('express')
const router = express.Router()
const TaskControllers = require('../controllers/TaskControllers')




router.post('/api/tasks',TaskControllers.CreateTask)
router.get('/api/tasks',TaskControllers.GetTasks)
router.get('/api/tasks/:id',TaskControllers.GetTasksByid)





module.exports = router