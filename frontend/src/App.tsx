import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Showcase } from './pages/Showcase';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Showcase />} />
        <Route path="/buscar" element={<div className="p-4">Buscar Page (Coming Soon)</div>} />
        <Route path="/chats" element={<div className="p-4">Chats Page (Coming Soon)</div>} />
        <Route path="/perfil" element={<div className="p-4">Perfil Page (Coming Soon)</div>} />
      </Routes>
    </Router>
  );
}

export default App;
