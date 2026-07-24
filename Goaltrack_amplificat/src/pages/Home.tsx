import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ContainerContent from '../components/ContainerContent';
import type { Task } from '../types/Task'; 
import type { Project } from '../types/Project';
import { ProjectService } from '../services/ProjectService'; // Asigură-te că folderul se numește 'services'
import { TaskService } from '../services/TaskService';
import { useAuth } from '../context/AuthContext'; // 1. Importăm contextul de autentificare

const Home: React.FC = () => {
  // Stările pentru datele reale
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 2. Extragem utilizatorul curent din memoria aplicației
  const { user } = useAuth();

  // Funcția care aduce datele de la API-urile tale
  const fetchDashboardData = async () => {
    // 3. Dacă nu avem user încă (se încarcă) sau nu are id valid, nu facem request-ul
    if (!user || !user.id) return; 

    setIsLoading(true);
    try {
      // Facem ambele request-uri în paralel pentru a încărca pagina mai repede
      const [fetchedProjects, fetchedTasks] = await Promise.all([
        ProjectService.getByUserId(user.id),
        TaskService.getByUserId(user.id)
      ]);
      
      setProjects(fetchedProjects);
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Eroare la preluarea datelor din backend:", error);
      // Aici poți adăuga pe viitor o notificare (toast) pentru eroare
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Se execută când componenta se montează sau când se schimbă utilizatorul logat
  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  // --- HANDLERE PENTRU ACȚIUNI REALE ---

  const handleCompleteTask = async (id: string) => {
    try {
      // Apelăm API-ul tău pentru a schimba statusul în backend
      await TaskService.finishTask(id);
      
      // Actualizăm starea locală pentru a vedea modificarea instantaneu, fără refresh
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === id ? { ...task, status: 'COMPLETED' } : task
        )
      );
    } catch (error) {
      console.error(`Eroare la finalizarea task-ului ${id}:`, error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if(window.confirm('Sigur vrei să ștergi acest task?')) {
      try {
        // Ștergem din baza de date
        await TaskService.deleteTask(id);
        
        // Ștergem din interfață
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      } catch (error) {
        console.error(`Eroare la ștergerea task-ului ${id}:`, error);
      }
    }
  };

  const handleDeleteProject = async (id: string) => {
    if(window.confirm('Sigur vrei să ștergi acest proiect și toate task-urile din el?')) {
      try {
        // Ștergem proiectul din baza de date
        await ProjectService.deleteProject(id);
        
        // Actualizăm interfața: scoatem proiectul...
        setProjects(prevProjects => prevProjects.filter(project => project.id !== id));
        
        // ...și scoatem automat și task-urile care aparțineau de el
        setTasks(prevTasks => prevTasks.filter(task => task.projectId !== id));
      } catch (error) {
        console.error(`Eroare la ștergerea proiectului ${id}:`, error);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 font-sans overflow-hidden">
      
      {/* Meniul Lateral */}
      <Navbar 
        onNavigate={(path) => console.log('Navigat catre', path)} 
        onLogout={() => console.log('Iesire')} 
      />
   
      {/* Zona Principală */}
      <main className="flex-1 p-8 h-screen overflow-y-auto relative">
        {isLoading ? (
          // Un loader simplu până când răspund serverele
          <div className="flex flex-col items-center justify-center h-full opacity-60">
            <svg className="animate-spin h-10 w-10 text-rose-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-xl font-bold text-gray-500 dark:text-gray-400">Se încarcă datele...</span>
          </div>
        ) : (
          // Containerul este randat doar după ce avem datele
          <ContainerContent 
            projects={projects}
            tasks={tasks}
            onCompleteTask={handleCompleteTask}
            onDeleteTask={handleDeleteTask}
            onDeleteProject={handleDeleteProject}
          />
        )}
      </main>

    </div>
  );
};

export default Home;