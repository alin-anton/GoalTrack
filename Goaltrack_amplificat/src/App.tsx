
import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import {Home,Stats} from './pages/Home';

function App() {

  return (
    <BrowserRouter>
        <div className="min-h-screen">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/stats" element={<Stats />} />
            </Routes>
        </div>
    </BrowserRouter>
  );
  
}

export default App;
