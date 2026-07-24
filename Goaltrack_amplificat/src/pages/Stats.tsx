import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { UserService } from '../services/UserService';
import { useAuth } from '../context/AuthContext';

const Stats: React.FC = () => {
  const { user, token, updateUser } = useAuth();

  // Se execută fix când se accesează pagina /stats prin buton
  const fetchFreshUserData = async () => {
  console.log("Token actual trimis:", token);
  console.log("ID user trimis:", user?.id);
  if (!user || !user.id || !token) return;

  try {
    const freshUser = await UserService.getById(user.id);
    if (freshUser) {
      updateUser(freshUser);
    }
  } catch (error) {
    console.error("Eroare detaliată:", error);
  }
};

  // Folosim valorile actualizate ale utilizatorului
  const totalTasks = user?.totalTasks ?? 0;
  const finishedTasks = user?.finishedTasks ?? 0;
  const dueTasks = user?.dueTasks ?? 0;

  const totalProjects = user?.totalProjects ?? 0;
  const finishedProjects = user?.finishedProjects ?? 0;
  const dueProjects = user?.dueProjects ?? 0;

  const successRateTasks = totalTasks > 0 ? Math.round((finishedTasks / totalTasks) * 100) : 0;

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 font-sans overflow-hidden">
      <Navbar />

      <main className="flex-1 p-8 h-screen overflow-y-auto relative">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8 border-b border-gray-100 dark:border-slate-700 pb-6">
            <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-gray-100 uppercase">
              Profil & Statistici
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
              Analizează-ți productivitatea și gestionează-ți contul.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card Task-uri */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Performanță Task-uri</h3>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-gray-50 dark:bg-slate-700/50 p-3 rounded-xl">
                  <span className="block text-xl font-black text-gray-900 dark:text-white">{totalTasks}</span>
                  <span className="text-xs text-gray-500 uppercase">Totale</span>
                </div>
                <div className="bg-gray-50 dark:bg-slate-700/50 p-3 rounded-xl">
                  <span className="block text-xl font-black text-emerald-600 dark:text-emerald-400">{finishedTasks}</span>
                  <span className="text-xs text-gray-500 uppercase">Finalizate</span>
                </div>
                <div className="bg-gray-50 dark:bg-slate-700/50 p-3 rounded-xl">
                  <span className="block text-xl font-black text-rose-600 dark:text-rose-400">{dueTasks}</span>
                  <span className="text-xs text-gray-500 uppercase">Întârziate</span>
                </div>
                <div className="bg-gray-50 dark:bg-slate-700/50 p-3 rounded-xl">
                  <span className="block text-xl font-black text-indigo-600 dark:text-indigo-400">{successRateTasks}%</span>
                  <span className="text-xs text-gray-500 uppercase">Succes</span>
                </div>
              </div>
            </div>

            {/* Card Proiecte */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Evoluție Proiecte</h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-gray-50 dark:bg-slate-700/50 p-3 rounded-xl">
                  <span className="block text-xl font-black text-gray-900 dark:text-white">{totalProjects}</span>
                  <span className="text-xs text-gray-500 uppercase">Totale</span>
                </div>
                <div className="bg-gray-50 dark:bg-slate-700/50 p-3 rounded-xl">
                  <span className="block text-xl font-black text-emerald-600 dark:text-emerald-400">{finishedProjects}</span>
                  <span className="text-xs text-gray-500 uppercase">Finalizate</span>
                </div>
                <div className="bg-gray-50 dark:bg-slate-700/50 p-3 rounded-xl">
                  <span className="block text-xl font-black text-rose-600 dark:text-rose-400">{dueProjects}</span>
                  <span className="text-xs text-gray-500 uppercase">Întârziate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Stats;