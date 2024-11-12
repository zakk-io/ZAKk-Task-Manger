const express = require('express')
const router = express.Router()
const TaskControllers = require('../controllers/TaskControllers')




router.post('/api/tasks',TaskControllers.CreateTask)
router.get('/api/tasks',TaskControllers.GetTasks)
router.get('/api/tasks/:id',TaskControllers.GetTasksByid)
router.put('/api/tasks/:id',TaskControllers.UpdateTask)
router.delete('/api/tasks/:id',TaskControllers.DeleteTask)






module.exports = router