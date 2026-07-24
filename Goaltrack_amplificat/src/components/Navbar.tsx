import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importăm useAuth pentru a folosi logout-ul direct

interface NavbarProps {
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth(); // Extragem funcția de logout direct din context

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const getButtonStyles = (path: string) => {
    const isActive = location.pathname.includes(path);
    return isActive 
      ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400' 
      : 'text-gray-600 hover:bg-rose-50 hover:text-rose-600 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-rose-400';
  };

  return (
    <aside
      className={`h-screen bg-white dark:bg-gray-900 flex flex-col sticky top-0 transition-all duration-300 ease-in-out border-r border-gray-200 dark:border-gray-800 shrink-0 shadow-sm
        ${isExpanded ? 'w-64' : 'w-20'}
      `}
    >
      <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800 min-h-[80px]">
        <h1
          className={`font-black text-xl tracking-wider text-rose-600 dark:text-rose-500 transition-opacity duration-300
            ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}
          `}
        >
          GoalTrack
        </h1>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`p-2 rounded-lg text-gray-400 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700
            ${!isExpanded ? 'mx-auto' : ''}
          `}
          title={isExpanded ? "Restrânge meniul" : "Extinde meniul"}
        >
          <svg className={`w-6 h-6 transform transition-transform duration-300 ${!isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <nav className="flex-1 mt-6 px-3 flex flex-col gap-2 overflow-y-auto overflow-x-hidden">
        {/* BUTONUL MAIN */}
        <button
          onClick={() => navigate('/home')}
          className={`flex items-center gap-4 p-3 rounded-xl transition-colors w-full group ${getButtonStyles('/home')}`}
          title="Mergi la pagina principală"
        >
          <svg className="w-6 h-6 shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className={`font-bold tracking-widest text-lg transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 hidden'}`}>
            MAIN
          </span>
        </button>

        {/* BUTONUL STATISTICI */}
        <button
          onClick={() => navigate('/stats')}
          className={`flex items-center gap-4 p-3 rounded-xl transition-colors w-full group ${getButtonStyles('/stats')}`}
          title="Mergi la statistici"
        >
          <svg className="w-6 h-6 shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span className={`font-bold tracking-widest text-lg transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 hidden'}`}>
            STATS
          </span>
        </button>
      </nav>

      <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-2">
        <button
          onClick={toggleTheme}
          className={`flex items-center gap-3 w-full p-2 rounded-lg transition-colors text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-white focus:outline-none ${!isExpanded ? 'justify-center' : ''}`}
        >
          {isDarkMode ? (
            <svg className="w-5 h-5 shrink-0 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 shrink-0 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
          <span className={`text-sm font-semibold transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 hidden'}`}>
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </span>
        </button>

        {/* Butonul de Disconnect funcțional care apelează direct logout-ul */}
        <button
          onClick={logout}
          className={`flex items-center gap-3 w-full p-2 rounded-lg transition-colors text-gray-400 dark:text-gray-500 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 focus:outline-none ${!isExpanded ? 'justify-center' : ''}`}
        >
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className={`text-xs font-semibold uppercase tracking-wider transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 hidden'}`}>
            Disconnect
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Navbar;