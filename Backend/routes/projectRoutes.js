const express = require('express');
const router = express.Router();
const projectController = require('../controller/projectController');


router.post('/addProject',  projectController.addProject);
router.get('/getProjects',  projectController.getProjects);
router.put('/updateProject/:id',  projectController.updateProject);
router.delete('/deleteProject/:id',  projectController.deleteProject);
module.exports = router;