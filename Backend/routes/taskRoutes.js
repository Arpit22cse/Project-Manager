const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskController');


router.post('/addTask',  taskController.addTask);
router.get('/getUserTasks/:id',  taskController.getUserTasks);
router.get('/getTaskByProject/:id',  taskController.getProjectTasks);
router.put('/updateTask/:id',  taskController.updateTask);
router.delete('/deleteTask/:id',  taskController.deleteTask);
module.exports = router;