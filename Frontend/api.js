import axios from "axios";
const API = import.meta.env.VITE_API_BASE_URL;

const login = async (credentials) => {
  const response = await axios.post(`${API}/login`, credentials, { withCredentials: true });
  return response.data;
}

const register = async (userData) => {
  const response = await axios.post(`${API}/register`, userData, { withCredentials: true });
  return response.data;
}

const logout = async () => {
  const response = await axios.post(`${API}/logout`, {}, { withCredentials: true });
  return response.data;
}

const addTask = async (taskData) => {
  const response = await axios.post(`${API}/tasks/addTask`, taskData, { withCredentials: true });
  return response.data;
}

const updateTask = async (taskId, taskData) => {
  const response = await axios.put(`${API}/tasks/updateTask/${taskId}`, taskData, { withCredentials: true });
  return response.data;
}

const deleteTask = async (taskId) => {
  const response = await axios.delete(`${API}/tasks/deleteTask/${taskId}`, { withCredentials: true });
  return response.data;
}

const getTasksByProject = async (projectId) => {
  const response = await axios.get(`${API}/tasks/getTaskByProject/${projectId}`, { withCredentials: true });
  
  return response.data;
}

const getUserTasks = async (userId) => {
  const response = await axios.get(`${API}/tasks/getUserTasks/${userId}`, { withCredentials: true });
  return response.data;
}

const getProjects = async () => {
  const response = await axios.get(`${API}/projects/getProjects`, { withCredentials: true });
  return response.data;
}

const addProject = async (projectData) => {
  const response = await axios.post(`${API}/projects/addProject`, projectData, { withCredentials: true });
  return response.data;
}

const updateProject = async (projectId, projectData) => {
  const response = await axios.put(`${API}/projects/updateProject/${projectId}`, projectData, { withCredentials: true });
  return response.data;
}


const deleteProject = async (projectId) => {
  const response = await axios.delete(`${API}/projects/deleteProject/${projectId}`, { withCredentials: true });
  return response.data;
}

const updateUserProfile = async (userId, profileData) => {
  const response = await axios.put(`${API}/users/${userId}`, profileData, { withCredentials: true });
  return response.data;
}

const getUserProfile = async (userId) => {
  const response = await axios.get(`${API}/users/${userId}`, { withCredentials: true });
  return response.data;
}

export { login, register, logout, addProject, addTask, getProjects, deleteProject, getTasksByProject, deleteTask, updateTask, getUserTasks, updateProject, updateUserProfile, getUserProfile };