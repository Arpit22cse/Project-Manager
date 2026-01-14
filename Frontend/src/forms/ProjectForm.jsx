import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { addProject, updateProject } from '../../api'; // Added updateProject
import { useAuth } from '../context/authcontext';
import { Loader2, Save, FolderPlus } from 'lucide-react';

const ProjectForm = ({ initialData, isEdit, onSuccess }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Local state to manage form fields for editing
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    owner: user?.email || ''
  });

  // Sync state if initialData changes (when clicking "Edit" on a different project)
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        owner: initialData.owner || user?.email || ''
      });
    }
  }, [initialData, isEdit, user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEdit) {
        // Call update API
        await updateProject(initialData._id, formData);
      } else {
        // Call create API
        await addProject(formData);
      }
      
      if (onSuccess) onSuccess(); 
    } catch (err) {
      console.error("Project Form Error:", err);
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
    >
      <div className="mb-8 flex items-center gap-4">
        <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
          {isEdit ? <Save className="w-6 h-6" /> : <FolderPlus className="w-6 h-6" />}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isEdit ? 'Update Project' : 'Create New Project'}
          </h2>
          <p className="text-gray-500">
            {isEdit ? 'Modify project details and workspace settings.' : 'Set up a new workspace for your team.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 text-sm text-red-700 bg-red-50 rounded-xl border border-red-100">
            {error}
          </div>
        )}

        <div className="space-y-1">
          <label className="block text-sm font-bold text-gray-700 ml-1">Project Title</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Website Redesign"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-bold text-gray-700 ml-1">Description</label>
          <textarea
            name="description"
            required
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="What is this project about?"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
          ></textarea>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-bold text-gray-700 ml-1">Owner Email</label>
          <input
            type="email"
            name="owner"
            required
            value={formData.owner}
            onChange={handleChange}
            placeholder="owner@company.com"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>

        <div className="pt-4 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : isEdit ? 'Save Changes' : 'Create Project'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ProjectForm;