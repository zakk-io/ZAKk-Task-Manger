const express = require('express')
const router = express.Router()
const TaskControllers = require('../controllers/TaskControllers')




router.post('/api/tasks',TaskControllers.CreateTask)



module.exports = router