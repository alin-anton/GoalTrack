import React, { useState, useEffect } from 'react';

interface ModalFormularProps {
  isOpen: boolean;
  onClose: () => void;
  // Aici poți adăuga pe viitor o funcție onSubmit pentru a trimite datele către API
}

const ModalFormular: React.FC<ModalFormularProps> = ({ isOpen, onClose }) => {
  // Starea pentru radio buttons, default este 'task'
  const [formType, setFormType] = useState<'task' | 'project'>('task');

  // Resetăm starea la 'task' ori de câte ori modalul se redeschide
  useEffect(() => {
    if (isOpen) {
      setFormType('task');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    // Backdrop-ul întunecat care acoperă tot ecranul
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      onClick={onClose} // Închide modalul dacă dai click pe fundal
    >
      {/* Containerul efectiv al modalului */}
      <div 
        className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()} // Prevenim închiderea când dăm click în interiorul formularului
      >
        {/* Antetul modalului */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Adaugă un element nou
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {/* Zona de Radio Buttons (Task / Proiect) */}
          <div className="flex gap-6 mb-8 p-1 bg-gray-50 dark:bg-slate-900/50 rounded-xl w-max">
            <label className="flex items-center gap-2 cursor-pointer relative px-4 py-2">
              <input 
                type="radio" 
                name="type" 
                value="task" 
                checked={formType === 'task'}
                onChange={() => setFormType('task')}
                className="w-4 h-4 text-rose-600 bg-gray-100 border-gray-300 focus:ring-rose-500 dark:focus:ring-rose-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
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
                className="w-4 h-4 text-rose-600 bg-gray-100 border-gray-300 focus:ring-rose-500 dark:focus:ring-rose-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
              />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Proiect Nou</span>
            </label>
          </div>

          {/* Formularul dinamic */}
          <form className="space-y-4">
            
            {/* Câmpuri comune */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Titlu</label>
              <input 
                type="text" 
                placeholder={`Titlul ${formType === 'task' ? 'task-ului' : 'proiectului'}...`}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Câmpuri specifice pentru Proiect */}
            {formType === 'project' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descriere</label>
                <textarea 
                  rows={3}
                  placeholder="Scurtă descriere a proiectului..."
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all resize-none"
                />
              </div>
            )}

            {/* Câmpuri specifice pentru Task */}
            {formType === 'task' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Asignează unui Proiect (Opțional)</label>
                <select className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-rose-500 outline-none transition-all">
                  <option value="">Fără proiect (Standalone)</option>
                  <option value="proj-1">Dezvoltare Platformă GoalTrack</option>
                  {/* Aici vor fi mapate proiectele reale din API */}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deadline</label>
              <input 
                type="datetime-local" 
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-rose-500 outline-none transition-all"
              />
            </div>

            {/* Butoanele de acțiune */}
            <div className="flex justify-end gap-3 pt-6 mt-2 border-t border-gray-100 dark:border-slate-700">
              <button 
                type="button" 
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              >
                Anulează
              </button>
              <button 
                type="button" 
                className="px-5 py-2.5 rounded-lg font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-500/30 transition-all active:scale-95"
              >
                Salvează
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalFormular;