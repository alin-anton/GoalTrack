import React from 'react';
import Navbar from '../components/Navbar';
import ContainerContent from '../components/ContainerContent';
import type { Task } from '../types/Task'; 
import type { Project } from '../types/Project';

const Home: React.FC = () => {
  // Date de test (Mock Data)
  const mockProjects: Project[] = [
    {
      id: 'proj-1',
      name: 'GoalTrack',
      title: 'Dezvoltare Platformă GoalTrack',
      description: 'Aplicație completă pentru managementul task-urilor, incluzând panouri de control, modalități de adăugare rapide și o structură clară pentru organizarea activității zilnice. Acest proiect folosește React, Tailwind CSS și o bază de date non-relațională.',
      creationDate: '2026-06-15T08:00:00',
      deadline: '2026-08-01T23:59:59',
      status: 'IN PROGRESS'
    }
  ];

  const mockTasks: Task[] = [
    {
      id: 'task-1',
      title: 'Configurare bază de date MySQL și MongoDB pentru GoalTrack',
      status: 'COMPLETED',
      deadline: '2026-07-15T12:00:00',
      creationDate: '2026-07-01T09:00:00',
      projectId: 'proj-1', 
      userId: 'user-1'
    },
    {
      id: 'task-2',
      title: 'Integrare API de autentificare cu token JWT în frontend',
      status: 'IN PROGRESS',
      deadline: '2026-07-25T16:30:00',
      creationDate: '2026-07-05T10:15:00',
      projectId: 'proj-1', 
      userId: 'user-1'
    },
    {
      id: 'task-3',
      title: 'Design responsiv pentru pagina de detalii a proiectului folosind Tailwind CSS',
      status: 'PENDING',
      deadline: '2026-07-30T10:00:00',
      creationDate: '2026-07-10T14:45:00',
      userId: 'user-1', 
    }
  ];

  // Funcții pentru acțiuni
  const handleCompleteTask = (id: string) => {
    console.log(`Finalizează task-ul: ${id}`);
  };

  const handleDeleteTask = (id: string) => {
    if(window.confirm('Sigur vrei să ștergi acest task?')) {
      console.log(`Task-ul ${id} a fost șters.`);
    }
  };

  const handleDeleteProject = (id: string) => {
    if(window.confirm('Sigur vrei să ștergi acest proiect și toate task-urile din el?')) {
      console.log(`Proiectul ${id} a fost șters.`);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 font-sans overflow-hidden">
      
      {/* Meniul Lateral */}
      <Navbar 
        onNavigate={(path) => console.log('Navigat catre', path)} 
        onLogout={() => console.log('Iesire')} 
      />
   
      {/* Zona Principală care conține containerul */}
      <main className="flex-1 p-8 h-screen overflow-y-auto relative">
        <ContainerContent 
          projects={mockProjects}
          tasks={mockTasks}
          onCompleteTask={handleCompleteTask}
          onDeleteTask={handleDeleteTask}
          onDeleteProject={handleDeleteProject}
        />
      </main>

    </div>
  );
};

export default Home;