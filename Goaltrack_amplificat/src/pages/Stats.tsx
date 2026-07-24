import React from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import UserProfileCard from '../components/cards/stats/UserProfileCard';
import TaskStatsCard from '../components/cards/stats/TaskStatsCard';
import ProjectStatsCard from '../components/cards/stats/ProjectStatsCard';

const Stats: React.FC = () => {
  const { user, logout } = useAuth();

  // Extragem datele din profilul utilizatorului logat
  const totalTasks = user?.totalTasks || 0;
  const finishedTasks = user?.finishedTasks || 0;
  const dueTasks = user?.dueTasks || 0;

  const totalProjects = user?.totalProjects || 0;
  const finishedProjects = user?.finishedProjects || 0;
  const dueProjects = user?.dueProjects || 0;

  // Calculăm ratele de succes
  const taskCompletionRate = totalTasks > 0 ? Math.round((finishedTasks / totalTasks) * 100) : 0;
  const projectCompletionRate = totalProjects > 0 ? Math.round((finishedProjects / totalProjects) * 100) : 0;

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 font-sans overflow-hidden">
      
      <Navbar onLogout={logout} />

      <main className="flex-1 p-8 h-screen overflow-y-auto relative">
        <div className="max-w-5xl mx-auto space-y-8 pb-12">
          
          <header className="mb-8 border-b border-gray-100 dark:border-slate-700 pb-6">
            <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-gray-100 uppercase">
              Profil & Statistici
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
              Analizează-ți productivitatea și gestionează-ți contul.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* COLOANA STÂNGĂ: Cardul de Profil */}
            <div className="lg:col-span-1">
              <UserProfileCard />
            </div>

            {/* COLOANA DREAPTĂ: Grafice și Statistici */}
            <div className="lg:col-span-2 space-y-8">
              
              <TaskStatsCard 
                total={totalTasks}
                finished={finishedTasks}
                due={dueTasks}
                completionRate={taskCompletionRate}
              />

              <ProjectStatsCard 
                total={totalProjects}
                finished={finishedProjects}
                due={dueProjects}
                completionRate={projectCompletionRate}
              />

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Stats;