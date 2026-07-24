import React from 'react';

interface TaskStatsProps {
  total: number;
  finished: number;
  due: number;
  completionRate: number;
}

const TaskStatsCard: React.FC<TaskStatsProps> = ({ total, finished, due, completionRate }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-md border border-gray-200 dark:border-slate-700 p-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">Performanță Task-uri</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-700 text-center">
          <span className="block text-2xl font-black text-rose-600 dark:text-rose-500">{total}</span>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Totale</span>
        </div>
        <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-700 text-center">
          <span className="block text-2xl font-black text-emerald-600 dark:text-emerald-500">{finished}</span>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Finalizate</span>
        </div>
        <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-700 text-center">
          <span className="block text-2xl font-black text-amber-600 dark:text-amber-500">{due}</span>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Întârziate</span>
        </div>
        <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-700 text-center">
          <span className="block text-2xl font-black text-indigo-600 dark:text-indigo-400">{completionRate}%</span>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Succes</span>
        </div>
      </div>

      {/* Bara de progres */}
      <div className="w-full bg-gray-100 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
        <div 
          className="bg-rose-600 h-full transition-all duration-500 rounded-full" 
          style={{ width: `${completionRate}%` }}
        ></div>
      </div>
    </div>
  );
};

export default TaskStatsCard;