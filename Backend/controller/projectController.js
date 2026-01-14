const Project = require('../models/Project');
const User = require('../models/User');

class ProjectController{

    async addProject(req,res){
      const { title, description, owner} = req.body;
      const user = await User.findOne({ email:owner });
      
      if(!user){
        return res.status(400).json({msg:"owner not found"});
      }
      
      const project = new Project({ title, description, owner:user._id  });
      try{
        await project.save();
        res.status(201).json({message:"Project created successfully",project});
      }catch(err){
        res.status(500).json({message:"Server error",error:err.message});
      }
    }

    async getProjects(req,res){
      try{
        const projects = await Project.find({});  
        res.status(200).json({projects});
      }catch(err){
        res.status(500).json({message:"Server error",error:err.message});
      }
    }
    
    async updateProject(req,res){
      const projectId = req.params.id;
      const { title, description, owner} = req.body;
      const user = await User.findOne({ email:owner });
      
      if(!user){
        return res.status(400).json({msg:"owner not found"});
      }
      
      try{
        const project = await Project.findByIdAndUpdate({_id:projectId},{ title, description, owner: user._id },{new:true}); 
        
        if(!project){
          return  res.status(404).json({message:"Project not found"});
        }
        res.status(200).json({message:"Project updated successfully",project});
      }catch(err){
        console.log(err.message);
        res.status(500).json({message:"Server error",error:err.message});
      }
    }

    async deleteProject(req,res){
      const projectId = req.params.id;  
      try{
        const project = await Project.findByIdAndDelete({_id:projectId});
        if(!project){
          return res.status(404).json({message:"Project not found"});
        }
        res.status(200).json({message:"Project deleted successfully"});
      }catch(err){  
        res.status(500).json({message:"Server error",error:err.message});
      }
    }
}
module.exports = new ProjectController();