import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProjects, deleteProject, getTasksByProject, deleteTask } from '../../api';
import ProjectCard from '../cards/ProjectCard';
import TaskCard from '../cards/TaskCard';
import ProjectForm from '../forms/ProjectForm';
import TaskForm from '../forms/TaskForm';
import { Plus, FolderPlus, ArrowLeft } from 'lucide-react';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectTasks, setProjectTasks] = useState([]);
  const [view, setView] = useState('grid'); // 'grid', 'tasks', 'create', 'edit'
  
  // States for Editing
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const data = await getProjects();
      // Handle different API return structures
      setProjects(Array.isArray(data.projects) ? data.projects : (Array.isArray(data) ? data : []));
    } catch (err) {
      console.error("Failed to fetch projects", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProject = (project) => {
    setProjectToEdit(project);
    setView('edit');
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await deleteProject(id);
      setProjects(projects.filter(p => p._id !== id));
    }
  };

  const handleViewTasks = async (project) => {
    try {
      const data = await getTasksByProject(project._id);
      setProjectTasks(data.tasks);
      setSelectedProject(project);
      setTaskToEdit(null); 
      setView('tasks');
    } catch (err) {
      console.error("Error loading tasks", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Delete this task?")) {
      await deleteTask(taskId);
      setProjectTasks(projectTasks.filter(t => t._id !== taskId));
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-6">
      {/* Header logic remains similar but adds 'edit' title context */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            {view === 'tasks' ? `Tasks: ${selectedProject?.title}` : 
             view === 'edit' ? `Edit Project: ${projectToEdit?.title}` :
             view === 'create' ? 'Create New Project' : 'My Projects'}
          </h2>
          <p className="text-gray-500">
            {view === 'tasks' ? 'Manage specific project objectives' : 'Overview of all active workspaces'}
          </p>
        </div>
        
        {view !== 'tasks' && (
          <button 
            onClick={() => {
                setProjectToEdit(null); // Clear edit state when toggling
                setView(view === 'grid' ? 'create' : 'grid');
            }}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
          >
            {view === 'grid' ? <Plus className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
            {view === 'grid' ? 'New Project' : 'Back to Projects'}
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* VIEW 1: PROJECT GRID */}
        {view === 'grid' && (
          <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {projects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                  <ProjectCard 
                    key={project._id} 
                    project={project} 
                    onDelete={handleDeleteProject}
                    onViewTasks={() => handleViewTasks(project)}
                    onEdit={() => handleEditProject(project)}
                  />
                ))}
              </div>
            ) : !isLoading && (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100 text-center">
                <FolderPlus className="w-10 h-10 text-indigo-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900">No projects yet</h3>
                <button onClick={() => setView('create')} className="text-indigo-600 font-bold mt-2 hover:underline">Create your first project</button>
              </div>
            )}
          </motion.div>
        )}

        {/* VIEW 2: TASK LIST & MULTI-MODE TASK FORM */}
        {view === 'tasks' && (
          <motion.div key="tasks" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <button onClick={() => setView('grid')} className="flex items-center gap-2 text-indigo-600 font-semibold hover:underline">
              <ArrowLeft className="w-4 h-4" /> Back to all projects
            </button>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  {/* TaskForm handles both Create and Edit based on taskToEdit state */}
                  <TaskForm 
                    projectId={selectedProject._id} 
                    isEdit={!!taskToEdit}
                    initialData={taskToEdit}
                    refreshTasks={() => handleViewTasks(selectedProject)} 
                    onCancel={() => setTaskToEdit(null)} // Returns form to 'Create' mode
                  />
                </div>
              </div>

              <div className="lg:col-span-2 space-y-4">
                {projectTasks.length > 0 ? (
                  projectTasks.map(task => (
                    <div key={task._id} className="relative group">
                      <TaskCard task={task} />
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => setTaskToEdit(task)} // Sets form to Edit mode
                          className="text-indigo-600 bg-white px-2 py-1 rounded border border-indigo-100 shadow-sm text-xs font-bold"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteTask(task._id)}
                          className="text-red-500 bg-white px-2 py-1 rounded border border-red-100 shadow-sm text-xs font-bold"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-100">
                    <p className="text-gray-400">No tasks found for this project.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 3 & 4: PROJECT FORM (Create/Edit) */}
        {(view === 'create' || view === 'edit') && (
          <motion.div key="projectForm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="max-w-2xl mx-auto">
              <ProjectForm 
                isEdit={view === 'edit'}
                initialData={projectToEdit}
                onSuccess={() => { fetchProjects(); setView('grid'); }} 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;