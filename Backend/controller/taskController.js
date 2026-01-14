const Task = require('../models/Task');
const User =  require('../models/User');
class TaskController{

    async addTask(req,res){
      
      const { title, description, status, priority, dueDate, assignedTo, project} = req.body;
      
      
      const user = await User.find({ email : assignedTo });
      
      
      if(!user){
        return res.status(400).json({msg:"Assigned user not found"});
      }
      const task = new Task({ title, description, status, priority, dueDate, assignedTo:user._id, project});
      try{
        await task.save();
        res.status(201).json({message:"Task created successfully",task});
      }catch(err){
        res.status(500).json({message:"Server error",error:err.message});
      } 
    }

    async getProjectTasks(req,res){
      const projectId = req.params.id;
      
      const p = projectId ? {project:projectId} : {};
      try{
        const tasks = await Task.find(p);  
        res.status(200).json({tasks});
      }catch(err){
        console.log("Error fetching tasks:", err.message);
        res.status(500).json({message:"Server error",error:err.message});
      }
    }

    async getUserTasks(req,res){
      const userId = req.params.id;
      const u = userId ? {assignedTo:userId} : {};
      try{
        const tasks = await Task.find(u);
        res.status(200).json({tasks});
      }catch(err){
        res.status(500).json({message:"Server error",error:err.message});
      }
    }


    async updateTask(req,res){
      const taskId = req.params.id;
      const { title, description, status, priority, dueDate, assignedTo, project} = req.body;
      const user = await User.findOne({ email:assignedTo });
      
      if(!user){
        return res.status(400).json({msg:"Assigned user not found"});
      }
      try{
        const task = await Task.findByIdAndUpdate(
          { _id:taskId },
          { title, description, status, priority, dueDate, assignedTo:user._id, project },
          {new:true}
        ); 
        if(!task){
          return  res.status(404).json({message:"Task not found"});
        }
        res.status(200).json({message:"Task updated successfully",task});
      }catch(err){
        console.log(err.message);
        res.status(500).json({message:"Server error",error:err.message});
      }
    }
    
    async deleteTask(req,res){
      const taskId = req.params.id;
      try{
        const task = await Task.findByIdAndDelete(taskId); 
        if(!task){
          return res.status(404).json({message:"Task not found"});
        }
        res.status(200).json({message:"Task deleted successfully"});
      }catch(err){
        res.status(500).json({message:"Server error",error:err.message});
      }
    }
}
module.exports = new TaskController();