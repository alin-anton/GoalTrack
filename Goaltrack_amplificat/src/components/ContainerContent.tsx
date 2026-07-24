import React, { useState } from 'react';
import ProjectCard from './cards/ProjectCard';
import TaskCard from './cards/TaskCard';
import ModalFormular from './embbeded/ModalFormular';
import type { Project } from '../types/Project';
import type { Task } from '../types/Task';

interface ContainerContentProps {
  projects: Project[];
  tasks: Task[];
  onCompleteTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onDeleteProject: (id: string) => void;
  onRefreshData: () => void;
}

const ContainerContent: React.FC<ContainerContentProps> = ({ 
  projects, 
  tasks, 
  onCompleteTask, 
  onDeleteTask, 
  onDeleteProject,
  onRefreshData 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filtrăm task-urile independente, care nu sunt asociate cu niciun proiect
  const standaloneTasks = tasks.filter(task => !task.projectID);

  // Verificăm dacă nu avem niciun element de afișat
  const isEmpty = projects.length === 0 && standaloneTasks.length === 0;

  return (
    <div className="relative h-full">
      <div className="max-w-5xl mx-auto flex flex-col min-h-[calc(100vh-4rem)]">
        
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-md border border-gray-200 dark:border-slate-700 p-6 md:p-8 transition-colors duration-300 flex-1 flex flex-col relative z-10 mb-8">
          
          <header className="mb-8 border-b border-gray-100 dark:border-slate-700 pb-6 text-center shrink-0">
            <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-gray-100 transition-colors duration-300 uppercase">
              Tasks & Projects
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Gestionează-ți activitatea curentă.</p>
          </header>

          {isEmpty ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 text-center animate-fade-in">
              <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">Nu există activitate curentă</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                Momentan nu ai niciun task sau proiect activ. Folosește butonul cu <span className="font-bold text-rose-500">+</span> din colțul dreapta-jos pentru a adăuga ceva nou.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              
              {/* RANDĂM PROIECTELE */}
              {projects.map((project) => {
                const tasksForThisProject = tasks.filter(t => t.projectID === project.id);
                return (
                  <ProjectCard 
                    key={project.id}
                    project={project}
                    projectTasks={tasksForThisProject}
                    onDeleteProject={onDeleteProject}
                    onCompleteTask={onCompleteTask}
                    onDeleteTask={onDeleteTask}
                  />
                );
              })}

              {/* RANDĂM TASK-URILE */}
              {standaloneTasks.map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  userId={task.userId}
                  onComplete={onCompleteTask} 
                  onDelete={onDeleteTask} 
                />
              ))}

            </div>
          )}
        </div>

      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-10 right-10 w-16 h-16 bg-rose-600 hover:bg-rose-500 text-white rounded-full shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center z-40 focus:outline-none focus:ring-4 focus:ring-rose-300 dark:focus:ring-rose-800/50"
        title="Adaugă Task sau Proiect"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      <ModalFormular 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        projects={projects}
        onSuccess={onRefreshData}
      />
    </div>
  );
};

export default ContainerContent;