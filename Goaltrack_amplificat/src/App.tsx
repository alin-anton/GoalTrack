import React from 'react';
import TaskCard from './components/TaskCard';
import ProjectCard from './components/ProjectCard';
import type { Task } from './types/Task'; 
import type { Project } from './types/Project';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const mockProjects: Project[] = [
    {
      id: 'proj-1',
      name: 'GoalTrack',
      title: 'Dezvoltare Platformă GoalTrack',
      description: 'Aplicație completă pentru managementul task-urilor',
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

  const handleCompleteTask = (id: string) => {
    alert(`Ai dat click pe Finalizează pentru task-ul: ${id}`);
  };

  const handleDeleteTask = (id: string) => {
    if(window.confirm('Sigur vrei să ștergi acest task?')) {
      alert(`Task-ul ${id} ar fi fost șters.`);
    }
  };

  const handleDeleteProject = (id: string) => {
    if(window.confirm('Sigur vrei să ștergi acest proiect și toate task-urile din el?')) {
      alert(`Proiectul ${id} ar fi fost șters.`);
    }
  };

  const standaloneTasks = mockTasks.filter(task => !task.projectId);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 font-sans overflow-hidden">
      
      <Navbar 
        onNavigate={(path) => console.log('Navigat catre', path)} 
        onLogout={() => console.log('Iesire')} 
      />
   
      <main className="flex-1 p-8 h-screen overflow-y-auto">
        <div className="max-w-5xl mx-auto pb-20">
          
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300">
              Task-urile Mele
            </h1>
          </header>

          <div className="flex flex-col gap-6">
            {mockProjects.map((project) => {
              const tasksForThisProject = mockTasks.filter(t => t.projectId === project.id);
              
              return (
                <ProjectCard 
                  key={project.id}
                  project={project}
                  projectTasks={tasksForThisProject}
                  onDeleteProject={handleDeleteProject}
                  onCompleteTask={handleCompleteTask}
                  onDeleteTask={handleDeleteTask}
                />
              );
            })}

            {standaloneTasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                userId={task.userId}
                onComplete={handleCompleteTask} 
                onDelete={handleDeleteTask} 
              />
            ))}
          </div>
        </div>
      </main>

    </div>
  );
};

export default App;