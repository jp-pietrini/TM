import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button, Card, Input } from '../components/ui';
import { Header, BottomNav } from '../components/layout';
import type { NavItem } from '../components/layout';

// Icons (simple SVG icons)
const HomeIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ChatIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const navItems: NavItem[] = [
  { path: '/', label: 'Inicio', icon: <HomeIcon /> },
  { path: '/buscar', label: 'Buscar', icon: <SearchIcon /> },
  { path: '/chats', label: 'Chats', icon: <ChatIcon /> },
  { path: '/perfil', label: 'Perfil', icon: <UserIcon /> },
];

export const Showcase: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <Header
        right={
          isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">
                Hola, {user?.email?.split('@')[0]}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </div>
          ) : (
            <Button variant="primary" size="sm" onClick={() => navigate('/login')}>
              Iniciar sesión
            </Button>
          )
        }
      />

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Hero Section with Mascots */}
        <Card className="overflow-hidden animate-fadeIn" padding="none">
          <div className="bg-gradient-to-br from-sky-500 to-sky-600 p-8 text-white text-center">
            <h1 className="text-2xl font-bold mb-2 animate-slideDown">¡Bienvenido a TrustMe!</h1>
            <p className="text-sky-100 text-sm animate-slideUp">Conecta con expertos verificados para tu hogar</p>
          </div>

          <div className="p-6 grid grid-cols-2 gap-4">
            <div className="text-center group cursor-pointer">
              <div className="w-32 h-32 mx-auto mb-3 rounded-full bg-gradient-to-br from-sky-200 to-sky-100 p-4 shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:scale-105 group-active:scale-95">
                <img src="/brand/Trosmi.png" alt="Trosmi" className="w-full h-full object-contain drop-shadow-md transition-transform duration-300 group-hover:rotate-6" />
              </div>
              <h3 className="font-semibold text-gray-900">Trosmi</h3>
              <p className="text-xs text-gray-500 mt-1">Tu compañero para encontrar ayuda</p>
            </div>

            <div className="text-center group cursor-pointer">
              <div className="w-32 h-32 mx-auto mb-3 rounded-full bg-gradient-to-br from-sky-300 to-sky-200 p-4 shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:scale-105 group-active:scale-95">
                <img src="/brand/MrHandy.png" alt="MrHandy" className="w-full h-full object-contain drop-shadow-md transition-transform duration-300 group-hover:-rotate-6" />
              </div>
              <h3 className="font-semibold text-gray-900">MrHandy</h3>
              <p className="text-xs text-gray-500 mt-1">Experto respetado y confiable</p>
            </div>
          </div>
        </Card>

        {/* Buttons Section */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Botones</h2>
          <div className="space-y-3">
            <Button variant="primary" fullWidth>
              Botón Principal
            </Button>
            <Button variant="secondary" fullWidth>
              Botón Secundario
            </Button>
            <Button variant="tertiary" fullWidth>
              Botón Terciario
            </Button>
            <Button variant="ghost" fullWidth>
              Botón Ghost
            </Button>
            <Button variant="primary" fullWidth loading={loading} onClick={handleSubmit}>
              {loading ? 'Cargando...' : 'Botón con Loading'}
            </Button>
          </div>
        </Card>

        {/* Inputs Section */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Inputs</h2>
          <div className="space-y-4">
            <Input
              label="Correo electrónico"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Con icono izquierdo"
              placeholder="Buscar..."
              leftIcon={<SearchIcon />}
            />
            <Input
              label="Con error"
              placeholder="Campo con error"
              error="Este campo es obligatorio"
            />
            <Input
              label="Con helper"
              placeholder="Campo normal"
              helper="Texto de ayuda para el usuario"
            />
          </div>
        </Card>

        {/* Cards Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Cards</h2>

          <Card hoverable onClick={() => alert('Card clickeada!')}>
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
                <HomeIcon />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">Card Interactiva</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Esta card tiene hover y es clickeable
                </p>
              </div>
              <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-3">
              <img src="/icon.png" alt="TrustMe" className="w-10 h-10 rounded-lg" />
              <div>
                <h3 className="font-semibold text-gray-900">Card con Imagen</h3>
                <p className="text-sm text-gray-500">Subtítulo de ejemplo</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Esta es una card con contenido más largo. Puedes incluir párrafos, imágenes y cualquier contenido que necesites.
            </p>
            <div className="flex gap-2 mt-4">
              <Button variant="primary" size="sm" fullWidth>
                Acción Principal
              </Button>
              <Button variant="secondary" size="sm" fullWidth>
                Cancelar
              </Button>
            </div>
          </Card>
        </div>

        {/* Typography Section */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tipografía</h2>
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Heading 1</h1>
              <p className="text-sm text-gray-500">32px • Bold</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Heading 2</h2>
              <p className="text-sm text-gray-500">24px • Bold</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Heading 3</h3>
              <p className="text-sm text-gray-500">20px • Semibold</p>
            </div>
            <div>
              <p className="text-base text-gray-900">Body Text</p>
              <p className="text-sm text-gray-500">16px • Regular</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Small Text</p>
              <p className="text-xs text-gray-500">14px • Regular</p>
            </div>
          </div>
        </Card>

        {/* Colors Section */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Colores</h2>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <div className="h-16 rounded-lg bg-sky-500 shadow-sm"></div>
              <p className="text-xs text-gray-600 mt-2 text-center">Sky 500</p>
            </div>
            <div>
              <div className="h-16 rounded-lg bg-sky-600 shadow-sm"></div>
              <p className="text-xs text-gray-600 mt-2 text-center">Sky 600</p>
            </div>
            <div>
              <div className="h-16 rounded-lg bg-gray-100 border border-gray-200 shadow-sm"></div>
              <p className="text-xs text-gray-600 mt-2 text-center">Gray 100</p>
            </div>
            <div>
              <div className="h-16 rounded-lg bg-gray-900 shadow-sm"></div>
              <p className="text-xs text-gray-600 mt-2 text-center">Gray 900</p>
            </div>
            <div>
              <div className="h-16 rounded-lg bg-white border border-gray-200 shadow-sm"></div>
              <p className="text-xs text-gray-600 mt-2 text-center">White</p>
            </div>
            <div>
              <div className="h-16 rounded-lg bg-red-500 shadow-sm"></div>
              <p className="text-xs text-gray-600 mt-2 text-center">Red 500</p>
            </div>
          </div>
        </Card>
      </div>

      <BottomNav items={navItems} />
    </div>
  );
};
