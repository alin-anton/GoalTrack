import React, { useState, useEffect } from 'react';
import { TaskService } from '../../services/TaskService';
import { ProjectService } from '../../services/ProjectService';
import { useAuth } from '../../context/AuthContext';
import type { Project } from '../../types/Project';

interface ModalFormularProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[]; // Adăugat pentru a popula dropdown-ul
  onSuccess: () => void; // Adăugat pentru a da refresh la pagină după salvare
}

const ModalFormular: React.FC<ModalFormularProps> = ({ isOpen, onClose, projects, onSuccess }) => {
  const { user } = useAuth(); // Luăm utilizatorul logat pentru a-i asocia elementele
  const [formType, setFormType] = useState<'task' | 'project'>('task');
  const [isLoading, setIsLoading] = useState(false);

  // Stările pentru valorile din formular
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState('');

  // Resetăm starea ori de câte ori modalul se redeschide
  useEffect(() => {
    if (isOpen) {
      setFormType('task');
      setTitle('');
      setDescription('');
      setDeadline('');
      setSelectedProjectId('');
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !user.id) return;
    setIsLoading(true);

    try {
      if (formType === 'task') {
        // Dacă e task, apelăm serviciul de task-uri
        await TaskService.createTask(
          title, 
          deadline, 
          user.id, 
          selectedProjectId === '' ? undefined : selectedProjectId
        );
      } else {
        // Dacă e proiect, apelăm serviciul de proiecte
        await ProjectService.createProject(title, description, deadline, user.id);
      }
      
      // Dacă a reușit, declanșăm refresh-ul și închidem modalul
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Eroare la salvare:", error);
      alert("A apărut o eroare la salvarea datelor.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Adaugă un element nou
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="flex gap-6 mb-8 p-1 bg-gray-50 dark:bg-slate-900/50 rounded-xl w-max">
            <label className="flex items-center gap-2 cursor-pointer relative px-4 py-2">
              <input 
                type="radio" 
                name="type" 
                value="task" 
                checked={formType === 'task'}
                onChange={() => setFormType('task')}
                className="w-4 h-4 text-rose-600 bg-gray-100 border-gray-300 focus:ring-rose-500"
              />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Task Nou</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer relative px-4 py-2">
              <input 
                type="radio" 
                name="type" 
                value="project" 
                checked={formType === 'project'}
                onChange={() => setFormType('project')}
                className="w-4 h-4 text-rose-600 bg-gray-100 border-gray-300 focus:ring-rose-500"
              />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Proiect Nou</span>
            </label>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Titlu</label>
              <input 
                type="text" 
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`Titlul ${formType === 'task' ? 'task-ului' : 'proiectului'}...`}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-rose-500 outline-none transition-all"
              />
            </div>

            {formType === 'project' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descriere</label>
                <textarea 
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Scurtă descriere a proiectului..."
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-rose-500 outline-none transition-all resize-none"
                />
              </div>
            )}

            {formType === 'task' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Asignează unui Proiect (Opțional)</label>
                <select 
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                >
                  <option value="">Fără proiect (Standalone)</option>
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deadline</label>
              <input 
                type="datetime-local" 
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-rose-500 outline-none transition-all"
              />
            </div>

            <div className="flex justify-end gap-3 pt-6 mt-2 border-t border-gray-100 dark:border-slate-700">
              <button 
                type="button" 
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              >
                Anulează
              </button>
              <button 
                type="submit" 
                disabled={isLoading}
                className="px-5 py-2.5 rounded-lg font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-500/30 transition-all active:scale-95 disabled:opacity-70"
              >
                {isLoading ? 'Se salvează...' : 'Salvează'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalFormular;