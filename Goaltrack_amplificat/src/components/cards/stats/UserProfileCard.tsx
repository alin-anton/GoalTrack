import React from 'react';
import { useAuth } from '../../../context/AuthContext';

const UserProfileCard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-md border border-gray-200 dark:border-slate-700 p-6 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Date Utilizator</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Nume de utilizator</label>
          <input 
            type="text" 
            value={user?.username || ''}
            readOnly
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 outline-none cursor-default"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Email</label>
          <input 
            type="email" 
            value={user?.email || ''}
            readOnly
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 outline-none cursor-default"
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;