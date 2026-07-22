import React from 'react';
import { ProjectCard } from './components/ProjectCard';
import type { Project } from './types/Project';

const App: React.FC = () => {
  // 1. Creăm niște date de test (mock data)
  const proiectDeTest1 = {
    id: 'proj-001',
    name: 'GoalTrack Frontend',
    title: 'Dezvoltare GoalTrack',
    description: 'Implementarea arhitecturii de frontend cu React, Tailwind CSS și TypeScript pentru o performanță optimă.',
    status: 'IN PROGRESS',
    creationTime: '2026-01-15T09:00:00',
    deadline: '2026-08-20T15:00:00',
    progressPercentage: 65,
    tasks: [
      {
        id: 'task-001',
        title: 'Design UI și componente',
        status: 'IN PROGRESS',
        creationDate: '2026-01-16T10:00:00',
        deadline: '2026-03-01T18:00:00',
      },
      {
        id: 'task-002',
        title: 'Integrare API proiecte',
        status: 'PENDING',
        creationDate: '2026-02-01T09:00:00',
        deadline: '2026-04-15T17:00:00',
      },
    ],
  };

  const proiectDeTest2 = {
    id: 'proj-002',
    name: 'Autentificare JWT',
    title: 'Sistem de Autentificare',
    description: 'Securizarea aplicației folosind JWT.',
    status: 'COMPLETED',
    creationTime: '2026-03-02T11:30:00',
    deadline: '2026-07-10T10:00:00',
    progressPercentage: 100,
    tasks: [
      {
        id: 'task-011',
        title: 'Configurare backend JWT',
        status: 'COMPLETED',
        creationDate: '2026-03-03T11:00:00',
        deadline: '2026-03-15T16:00:00',
      },
      {
        id: 'task-012',
        title: 'Testare flux de autentificare',
        status: 'COMPLETED',
        creationDate: '2026-03-10T14:00:00',
        deadline: '2026-04-05T14:00:00',
      },
    ],
  };

  // 2. O funcție simplă pentru testarea butonului
  const handleViewDetails = (id: string) => {
    alert(`Ai dat click pe proiectul cu ID-ul: ${id}`);
  };

  return (
    // Un fundal gri deschis ca să iasă în evidență cardurile albe
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Proiectele mele</h1>
      
      {/* Folosim un grid CSS pentru a le așeza frumos pe coloane */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard project={proiectDeTest1} onViewDetails={handleViewDetails} />
        <ProjectCard project={proiectDeTest2} onViewDetails={handleViewDetails} />
      </div>
    </div>
  );
};

export default App;