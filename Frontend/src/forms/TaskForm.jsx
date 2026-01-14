import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { addTask, updateTask } from '../../api'; // Ensure updateTask is exported in your API file
import { Loader2, CheckCircle, Save, Plus } from 'lucide-react';

const TaskForm = ({ projectId, initialData, isEdit, refreshTasks, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // local state for controlled inputs
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: '',
    assignedTo: ''
  });

  // Populate form when in edit mode
  useEffect(() => {
    if (isEdit && initialData) {
      console.log("Populating form with initial data:", initialData);
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        status: initialData.status || 'pending',
        priority: initialData.priority || 'medium',
        dueDate: initialData.dueDate ? initialData.dueDate.split('T')[0] : '', // Format date for input
        assignedTo: initialData.assignedTo || ''
      });
    }
  }, [initialData, isEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    const taskPayload = {
      ...formData,
      project: projectId,
    };

    try {
      if (isEdit) {
        await updateTask(initialData._id, taskPayload);
        setMessage({ type: 'success', text: 'Task updated successfully!' });
      } else {
        await addTask(taskPayload);
        setMessage({ type: 'success', text: 'Task created successfully!' });
        setFormData({ title: '', description: '', status: 'pending', priority: 'medium', dueDate: '', assignedTo: '' });
      }

      if (refreshTasks) refreshTasks();
    } catch (error) {
      console.error("Task Form Error:", error);
      setMessage({ type: 'error', text: 'Operation failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white text-sm";
  const labelStyle = "block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1";

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg ${isEdit ? 'bg-amber-50 text-amber-600' : 'bg-indigo-50 text-indigo-600'}`}>
          {isEdit ? <Save size={20} /> : <Plus size={20} />}
        </div>
        <h3 className="font-bold text-gray-900">{isEdit ? 'Edit Task' : 'Quick Add Task'}</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {message.text && (
          <div className={`p-3 rounded-xl text-xs font-medium border ${message.type === 'success' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
            {message.text}
          </div>
        )}

        {/* Title (Always editable or read-only based on preference, here it's editable) */}
        <div>
          <label className={labelStyle}>Title</label>
          <input name="title" value={formData.title} onChange={handleChange} required className={inputStyle} />
        </div>

        {/* Description (Always editable or read-only based on preference, here it's editable) */}
        <div>
          <label className={labelStyle}>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className={inputStyle}></textarea>
        </div>

        {/* Status & Priority Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelStyle}>Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className={inputStyle}>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <label className={labelStyle}>Priority</label>
            <select name="priority" value={formData.priority} onChange={handleChange} className={inputStyle}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        {/* Date & Assignee Row - Fully editable in Edit Mode */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelStyle}>Due Date</label>
            <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} className={inputStyle} />
          </div>
          <div>
            <label className={labelStyle}>Assignee</label>
            <input type="text" name="assignedTo" value={formData.assignedTo} onChange={handleChange} required placeholder="User name" className={inputStyle} />
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          {isEdit && (
            <button 
              type="button" 
              onClick={onCancel} 
              className="flex-1 py-2.5 text-sm font-bold text-gray-500 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="flex-[2] py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isEdit ? 'Update Task' : 'Add Task')}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default TaskForm;