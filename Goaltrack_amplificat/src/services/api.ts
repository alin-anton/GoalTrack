import axios from 'axios';

// Aici pui URL-ul de bază al serverului tău Spring Boot
// Modifică portul sau ruta dacă backend-ul tău rulează altfel (ex: http://localhost:8080/api/v1)


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. REQUEST INTERCEPTOR: Se execută ÎNAINTE ca request-ul să plece spre backend
api.interceptors.request.use(
  (config) => {
    // Căutăm token-ul salvat în localStorage (acolo unde îl vom pune la pasul de Login)
    const token = localStorage.getItem('token');
    
    // Dacă token-ul există, îl atașăm în header exact cum o cere Spring Security
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 2. RESPONSE INTERCEPTOR: Se execută CÂND se întoarce răspunsul de la backend
api.interceptors.response.use(
  (response) => {
    // Dacă backend-ul zice "200 OK", lăsăm datele să treacă mai departe
    return response;
  },
  (error) => {
    // Dacă backend-ul ne respinge cu 401 (Unauthorized) sau 403 (Forbidden)
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.error("Acces respins: Token expirat sau invalid.");
      
      // Ștergem token-ul invalid din memorie ca să nu mai trimitem request-uri greșite
      localStorage.removeItem('token');
      
      // Mai târziu, aici vom adăuga și o comandă de redirect automat către pagina de Login
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;