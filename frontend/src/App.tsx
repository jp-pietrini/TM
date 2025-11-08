import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Showcase } from './pages/Showcase';
import { UploadDemo } from './pages/UploadDemo';
import { VerificationDemo } from './pages/VerificationDemo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Showcase />} />
        <Route path="/upload-demo" element={<UploadDemo />} />
        <Route path="/verification-demo" element={<VerificationDemo />} />
        <Route path="/buscar" element={<div className="p-4">Buscar Page (Coming Soon)</div>} />
        <Route path="/chats" element={<div className="p-4">Chats Page (Coming Soon)</div>} />
        <Route path="/perfil" element={<div className="p-4">Perfil Page (Coming Soon)</div>} />
      </Routes>
    </Router>
  );
}

export default App;
