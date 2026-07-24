import React from 'react';

interface ProjectStatsProps {
  total: number;
  finished: number;
  due: number;
  completionRate: number;
}

const ProjectStatsCard: React.FC<ProjectStatsProps> = ({ total, finished, due, completionRate }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-md border border-gray-200 dark:border-slate-700 p-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">Evoluție Proiecte</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-700 text-center">
          <span className="block text-2xl font-black text-rose-600 dark:text-rose-500">{total}</span>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Proiecte Totale</span>
        </div>
        <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-700 text-center">
          <span className="block text-2xl font-black text-emerald-600 dark:text-emerald-500">{finished}</span>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Proiecte Finalizate</span>
        </div>
        <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-700 text-center">
          <span className="block text-2xl font-black text-amber-600 dark:text-amber-500">{due}</span>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Proiecte Întârziate</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectStatsCard;