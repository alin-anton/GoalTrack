import React, { useState } from "react";
import type { Project } from "../types/Project";
import type { Task } from "../types/Task"; 
import TaskCard from "./TaskCard";
import StatusBadge from "./StatusBadge";
import { formatCreationDate } from "../utils/formatCreationDate";
import { formatDeadline } from "../utils/formatDeadline";

interface ProjectCardProps {
  project: Project;
  projectTasks: Task[];
  onDeleteProject?: (id: string) => void;
  onCompleteTask?: (id: string) => void;
  onDeleteTask?: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  projectTasks, 
  onDeleteProject, 
  onCompleteTask, 
  onDeleteTask 
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const dataFormatata = formatCreationDate(project.creationDate);
    const deadlineFormatata = formatDeadline(project.deadline);

    return (
        <div className="mb-6">
            
            {/* 1. ANTETUL PROIECTULUI (Folder) */}
            <div className={`flex justify-between items-center px-6 py-5 
                transition-all duration-300 shadow-md border relative z-10
                ${isExpanded 
                    ? 'bg-yellow-100 dark:bg-slate-700 border-yellow-300 dark:border-slate-600 rounded-t-xl rounded-b-none'
                    : 'bg-yellow-50 dark:bg-slate-800 border-yellow-200 dark:border-slate-700 rounded-xl hover:shadow-lg hover:-translate-y-0.5'
                }
            `}>
                
                <div className="flex flex-col flex-1 pr-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1 flex items-center gap-2 transition-colors">
                        <span className="text-2xl">{isExpanded ? '📂' : '📁'}</span> 
                        {project.title || project.name} 
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-3 transition-colors">Creat la: {dataFormatata}</p>
                    
                    <div className="inline-block bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-md px-3 py-1.5 w-max shadow-sm transition-colors">
                        <p className="text-sm font-black text-red-600 dark:text-red-400 tracking-wide uppercase flex items-center gap-2">
                            Deadline: {deadlineFormatata}
                        </p>
                    </div>
                </div>

                <div className="w-36 flex justify-center px-2">
                    <StatusBadge status={project.status} />
                </div>

                <div className="flex items-center gap-3 ml-4 border-l border-yellow-300 dark:border-slate-500 pl-6 transition-colors">
                    <button 
                        onClick={() => onDeleteProject && onDeleteProject(project.id)}
                        className="px-4 py-2 bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 dark:hover:text-white text-sm font-bold rounded-lg transition-colors duration-200 shadow-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
                        title="Șterge Proiect"
                    >
                        ✗ Delete
                    </button>

                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-2 bg-yellow-200 dark:bg-slate-600 text-yellow-800 dark:text-gray-200 hover:bg-yellow-400 dark:hover:bg-slate-500 hover:text-white rounded-lg transition-colors duration-200 shadow-sm focus:ring-2 focus:ring-yellow-500 dark:focus:ring-slate-400 focus:outline-none"
                        title={isExpanded ? "Închide proiectul" : "Vezi task-urile"}
                    >
                        <svg 
                            className={`w-6 h-6 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>

            </div>

            {/* 2. ZONA EXTINSĂ (Animație Smooth cu CSS Grid) */}
            <div 
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                    isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
            >
                <div className="overflow-hidden">
                    <div className="bg-gray-50 dark:bg-slate-900/50 border border-t-0 border-gray-200 dark:border-slate-700 rounded-b-xl p-6 shadow-inner transition-colors">
                        {projectTasks && projectTasks.length > 0 ? (
                            projectTasks.map((task, index) => (
                                <TaskCard 
                                    key={task.id} 
                                    task={task} 
                                    index={index + 1} 
                                    isNested={true} 
                                    userId={task.userId}
                                    onComplete={onCompleteTask}
                                    onDelete={onDeleteTask}
                                />
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-6">
                                <p className="text-gray-500 dark:text-gray-400 font-medium">Nu există task-uri în acest proiect.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
        </div>
    );
};  

export default ProjectCard;