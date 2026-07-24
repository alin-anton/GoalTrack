import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ContainerContent from '../components/ContainerContent';
import type { Task } from '../types/Task'; 
import type { Project } from '../types/Project';
import { ProjectService } from '../services/ProjectService';
import { TaskService } from '../services/TaskService';
import { UserService } from '../services/UserService';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { user, token, updateUser } = useAuth();
  
  // Funcția care aduce datele esențiale sigură, fără să crape dacă user service dă eroare 500
  // Adaugă o stare pentru procente
 const fetchDashboardData = async () => {
    if (!user || !user.id || !token) return; 

    setIsLoading(true);
    try {
      // Preluăm strict proiectele și task-urile care funcționează perfect
      const [fetchedProjects, fetchedTasks] = await Promise.all([
        ProjectService.getByUserId(user.id),
        TaskService.getByUserId(user.id)
      ]);
      
      setProjects(fetchedProjects);
      setTasks(fetchedTasks);

    } catch (error) {
      console.error("Eroare la preluarea datelor din backend:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user?.id]);

  // --- HANDLERE PENTRU ACȚIUNI REALE ---

  const handleCompleteTask = async (id: string) => {
    try {
      await TaskService.finishTask(id);
      
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === id ? { ...task, status: 'COMPLETED' } : task
        )
      );

      await fetchDashboardData();
    } catch (error) {
      console.error(`Eroare la finalizarea task-ului ${id}:`, error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if(window.confirm('Sigur vrei să ștergi acest task?')) {
      try {
        await TaskService.deleteTask(id);
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        
        await fetchDashboardData();
      } catch (error) {
        console.error(`Eroare la ștergerea task-ului ${id}:`, error);
      }
    }
  };

  const handleDeleteProject = async (id: string) => {
    if(window.confirm('Sigur vrei să ștergi acest proiect și toate task-urile din el?')) {
      try {
        await ProjectService.deleteProject(id);
        setProjects(prevProjects => prevProjects.filter(project => project.id !== id));
        setTasks(prevTasks => prevTasks.filter(task => task.projectID !== id));
        
        await fetchDashboardData();
      } catch (error) {
        console.error(`Eroare la ștergerea proiectului ${id}:`, error);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 font-sans overflow-hidden">
      
      <Navbar />
   
      <main className="flex-1 p-8 h-screen overflow-y-auto relative">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full opacity-60">
            <svg className="animate-spin h-10 w-10 text-rose-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-xl font-bold text-gray-500 dark:text-gray-400">Se încarcă datele...</span>
          </div>
        ) : (
          <ContainerContent 
            projects={projects}
            tasks={tasks}
            onCompleteTask={handleCompleteTask}
            onDeleteTask={handleDeleteTask}
            onDeleteProject={handleDeleteProject}
            onRefreshData={fetchDashboardData}
          />
        )}
      </main>

    </div>
  );
};

export default Home;