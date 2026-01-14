import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

const TaskCard = ({ task }) => {
  const priorityColors = {
    high: 'bg-red-50 text-red-600 border-red-100',
    medium: 'bg-amber-50 text-amber-600 border-amber-100',
    low: 'bg-emerald-50 text-emerald-600 border-emerald-100'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4"
    >
      <div className="mt-1">
        {task.status === 'completed' ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        ) : (
          <Circle className="w-5 h-5 text-gray-300" />
        )}
      </div>

      <div className="flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h4 className={`font-bold ${task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-900'}`}>
            {task.title}
          </h4>
          <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-md border ${priorityColors[task.priority] || priorityColors.low}`}>
            {task.priority}
          </span>
        </div>
        
        <p className="text-sm text-gray-500 mb-3">{task.description}</p>
        
        <div className="flex items-center gap-4 text-xs font-medium text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}
          </div>
          <div className="px-2 py-0.5 bg-gray-50 rounded text-gray-500">
            @{task.assignedTo}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;