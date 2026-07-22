import React from 'react';
import TaskCard from './components/TaskCard';
import type { Task } from './types/Task'; 

const App: React.FC = () => {
  // Date de test (Mock Data)
  const mockTasks: Task[] = [
    {
      id: 'task-1',
      title: 'Configurare bază de date MySQL și MongoDB pentru GoalTrack',
      status: 'COMPLETED',
      deadline: '2026-07-15T12:00:00',
      creationDate: '2026-07-01T09:00:00',
    },
    {
      id: 'task-2',
      title: 'Integrare API de autentificare cu token JWT în frontend',
      status: 'IN PROGRESS',
      deadline: '2026-07-25T16:30:00',
      creationDate: '2026-07-05T10:15:00',
    },
    {
      id: 'task-3',
      title: 'Design responsiv pentru pagina de detalii a proiectului folosind Tailwind CSS',
      status: 'PENDING',
      deadline: '2026-07-30T10:00:00',
      creationDate: '2026-07-10T14:45:00',
    }
  ];

  // Funcții de test pentru butoane
  const handleCompleteTask = (id: string) => {
    alert(`Ai dat click pe Finalizează pentru task-ul: ${id}`);
  };

  const handleDeleteTask = (id: string) => {
    if(window.confirm('Sigur vrei să ștergi acest task?')) {
      alert(`Task-ul ${id} ar fi fost șters.`);
    }
  };

  return (
    // Un fundal simplu pe tot ecranul, cu padding (p-8)
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      
      {/* Container care centrează conținutul pe ecranele foarte mari */}
      <div className="max-w-7xl mx-auto">
        
        

        {/* Grila responsivă: 1 coloană pe mobil, până la 4 pe desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockTasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onCompleteTask={handleCompleteTask} 
              onDelete={handleDeleteTask} 
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default App;