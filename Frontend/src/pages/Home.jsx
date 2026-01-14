import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Layout, CheckCircle, Clock, ArrowRight, Star } from 'lucide-react';
import { getProjects, getTasksByProject, getUserTasks } from '../../api';
import TaskCard from '../cards/TaskCard';
import { useAuth } from '../context/authcontext';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const HomePage = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [userTasks, setUserTasks] = useState([]);
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const projectData = await getProjects();
        const allProjects = Array.isArray(projectData.projects) ? projectData.projects : projectData;
        setFeaturedProjects(allProjects.slice(0, 3));
         // Top 3 for slider

        // For "My Tasks", we'll fetch tasks from the first project as an example
        if (allProjects.length > 0) {
          const response = await getUserTasks(user._id); 
          
          // Replace with actual user ID logic
          const taskData = response.tasks;
          setUserTasks(taskData.slice(0, 4)); // Show first 4 tasks
        }
      } catch (err) {
        console.error("Home Data Load Error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  return (
    <div className="space-y-12 pb-12">
      {/* SECTION 1: HERO SLIDER */}
      <section className="relative rounded-3xl overflow-hidden shadow-2xl mx-4 mt-6">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="h-[400px] md:h-[500px]"
        >
          {featuredProjects.map((project, index) => (
            <SwiperSlide key={project._id}>
              <div className="relative w-full h-full bg-indigo-900 flex items-center px-10 md:px-20 text-white">
                <div className="z-10 max-w-2xl space-y-4">
                  <motion.span 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="px-3 py-1 bg-indigo-500/30 border border-indigo-400 rounded-full text-xs font-bold uppercase tracking-widest"
                  >
                    Featured Workspace
                  </motion.span>
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-black"
                  >
                    {project.title}
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="text-lg text-indigo-100 opacity-80 line-clamp-2"
                  >
                    {project.description}
                  </motion.p>
                  <motion.button 
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
                    className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-50 transition-colors"
                  >
                    Open Project <ArrowRight size={18} />
                  </motion.button>
                </div>
                {/* Abstract Background Decoration */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/20 to-transparent" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* SECTION 2: STATS QUICK LOOK */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Layout className="text-blue-500" />} label="Active Projects" value={featuredProjects.length} />
        <StatCard icon={<CheckCircle className="text-emerald-500" />} label="Tasks Completed" value="24" />
        <StatCard icon={<Clock className="text-amber-500" />} label="Pending Deadlines" value={userTasks.length} />
      </div>

      {/* SECTION 3: MY TASKS & RECENT ACTIVITY */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Your Priorities</h3>
              <p className="text-gray-500">Tasks assigned to you across all projects</p>
            </div>
            <button className="text-indigo-600 font-bold text-sm flex items-center gap-1 hover:underline">
              See All Tasks <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {userTasks.length > 0 ? (
              userTasks.map(task => <TaskCard key={task._id} task={task} />)
            ) : (
              <div className="p-10 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400">No pending tasks for today!</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
            <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-100">
                <Star className="mb-4 text-yellow-300 fill-yellow-300" />
                <h4 className="text-xl font-bold mb-2">Upgrade to Pro</h4>
                <p className="text-indigo-100 text-sm mb-4">Get unlimited projects, advanced analytics, and priority support.</p>
                <button className="w-full py-3 bg-white text-indigo-600 rounded-xl font-bold text-sm shadow-sm hover:bg-indigo-50 transition-colors">
                    View Pricing
                </button>
            </div>
            
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-4">Tips for today</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex gap-2">🔹 Complete high priority tasks first.</li>
                    <li className="flex gap-2">🔹 Update task status as you go.</li>
                    <li className="flex gap-2">🔹 Communicate with your team lead.</li>
                </ul>
            </div>
        </div>
      </section>
    </div>
  );
};

// Helper Component for Stats
const StatCard = ({ icon, label, value }) => (
  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
    <div className="p-4 bg-gray-50 rounded-2xl">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-2xl font-black text-gray-900">{value}</p>
    </div>
  </div>
);

export default HomePage;