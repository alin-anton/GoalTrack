import React, { useState } from 'react';

interface ProjectDescriptionCardProps {
  description?: string;
}

const ProjectDescriptionCard: React.FC<ProjectDescriptionCardProps> = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Dacă proiectul nu are descriere deloc, nu afișăm cardul
  if (!description) return null;

  return (
    <div className="bg-white dark:bg-slate-800/80 rounded-xl border border-gray-200 dark:border-slate-700 p-4 mb-5 shadow-sm transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide">
          Descriere Proiect
        </h3>
      </div>
      
      {/* Containerul textului cu logica de line-clamp (ascunde restul textului dacă nu e extins) */}
      <div 
        className={`text-sm text-gray-600 dark:text-gray-400 transition-all duration-300 leading-relaxed
          ${isExpanded ? '' : 'line-clamp-2'}
        `}
      >
        {description}
      </div>
      
      {/* Butonul de Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-3 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors focus:outline-none flex items-center gap-1"
      >
        {isExpanded ? 'Afișează mai puțin ↑' : 'Citește toată descrierea ↓'}
      </button>
    </div>
  );
};

export default ProjectDescriptionCard;