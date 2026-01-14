import React from 'react';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  Pencil, 
  Trash2, 
  Calendar, 
  Users 
} from 'lucide-react';

const ProjectCard = ({ project, onDelete, onViewTasks, onEdit }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="bg-indigo-50 p-3 rounded-2xl text-indigo-600">
          <Calendar className="w-6 h-6" />
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onEdit(project)}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-indigo-600 transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onDelete(project._id)}
            className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
      <p className="text-gray-500 text-sm line-clamp-2 mb-6">
        {project.description || "No description provided for this workspace."}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
        <div className="flex items-center gap-2 text-gray-400">
          <Users className="w-4 h-4" />
          <span className="text-xs font-semibold">{project.owner?.split('@')[0] || 'Lead'}</span>
        </div>
        
        <button 
          onClick={onViewTasks}
          className="flex items-center gap-1.5 text-indigo-600 font-bold text-sm hover:gap-2 transition-all"
        >
          View Tasks <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default ProjectCard;