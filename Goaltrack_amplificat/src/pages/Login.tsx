import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Login: React.FC = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // Folosit doar la înregistrare
  
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // --- LOGICA PENTRU LOGIN ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // 1. Apelăm backend-ul (Spring Boot - AuthController)
      const response = await api.post('/auth/login', {
        email,
        password
      });

      // 2. Extragem datele primite (AuthResponse)
      const { token, user } = response.data;

      // 3. Salvăm în Context și LocalStorage
      login(token, user);

      // 4. Redirecționăm către pagina principală
      navigate('/home');
    } catch (err: any) {
      console.error("Eroare la autentificare", err);
      // Afișăm un mesaj prietenos în caz de eroare
      setError(err.response?.data?.message || 'Email sau parolă incorectă. Te rugăm să încerci din nou.');
    } finally {
      setIsLoading(false);
    }
  };

  // --- LOGICA PENTRU REGISTER ---
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Apelăm backend-ul (Spring Boot - AuthController)
      await api.post('/auth/register', {
        username,
        email,
        password
      });

      // Dacă s-a creat contul cu succes, comutăm automat pe formularul de login
      alert('Cont creat cu succes! Te poți autentifica acum.');
      setIsLoginView(true);
      setPassword(''); // Curățăm parola pentru siguranță
    } catch (err: any) {
      console.error("Eroare la înregistrare", err);
      setError(err.response?.data?.message || 'A apărut o eroare la crearea contului.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 transition-colors duration-300 p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden transition-colors duration-300">
        
        {/* Header cu logo și titlu */}
        <div className="p-8 text-center bg-rose-50/50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-700">
          <h1 className="text-3xl font-black tracking-wider text-rose-600 dark:text-rose-500 mb-2">GoalTrack</h1>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {isLoginView ? 'Bine ai revenit! Autentifică-te pentru a continua.' : 'Creează-ți un cont pentru a începe.'}
          </p>
        </div>

        {/* Formularul */}
        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-400 text-sm font-medium rounded-r-md">
              {error}
            </div>
          )}

          <form onSubmit={isLoginView ? handleLogin : handleRegister} className="flex flex-col gap-5">
            
            {/* Câmpul Username (Apare doar la Register) */}
            {!isLoginView && (
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Nume Utilizator</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="ex: alin_dev"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Adresă de Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="nume@exemplu.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Parolă</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="mt-2 w-full py-3.5 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-lg hover:shadow-rose-500/30 transition-all transform active:scale-95 disabled:opacity-70 disabled:active:scale-100 flex justify-center items-center"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                isLoginView ? 'Autentificare' : 'Creare Cont'
              )}
            </button>
          </form>

          {/* Toggle între Login și Register */}
          <div className="mt-8 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
            {isLoginView ? 'Nu ai încă un cont?' : 'Ai deja un cont?'}
            <button 
              onClick={() => {
                setIsLoginView(!isLoginView);
                setError(null); // Resetăm erorile la comutare
              }}
              className="ml-2 text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-bold transition-colors focus:outline-none underline-offset-4 hover:underline"
            >
              {isLoginView ? 'Creează unul acum' : 'Autentifică-te'}
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Login;