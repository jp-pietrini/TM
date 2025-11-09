import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui';
import { PublicHeader } from '../components/PublicHeader';

// Service category icons
const PlumbingIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  </svg>
);

const ElectricalIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const PaintingIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const MoneyIcon = () => (
  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const [showStickyButton, setShowStickyButton] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky button when hero CTA is NOT visible
        setShowStickyButton(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '0px',
      }
    );

    const currentRef = heroCtaRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white pb-20 lg:pb-0">
      <PublicHeader />

      {/* Hero Section - Mobile Optimized */}
      <section className="relative bg-gradient-to-br from-sky-50 via-white to-blue-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              {/* Mobile: Larger, punchier headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
                Encuentra el profesional perfecto
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Compara expertos verificados, revisa sus trabajos y contrata con confianza.
                <span className="block mt-2 text-sky-600 font-bold text-lg sm:text-xl">100% gratis</span>
              </p>

              {/* Mobile: Larger CTA button with min-h for touch - tracked for sticky CTA */}
              <div ref={heroCtaRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-6 sm:mb-8">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/register?role=client')}
                  className="text-lg sm:text-xl px-8 py-5 sm:py-4 min-h-[56px] font-semibold shadow-lg hover:shadow-xl"
                >
                  Buscar profesionales gratis
                </Button>
              </div>

              {/* Mobile: Vertical stack for better readability */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center lg:justify-start gap-3 sm:gap-6 text-sm sm:text-base text-gray-700">
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <CheckIcon />
                  <span className="font-medium">Sin costo</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <CheckIcon />
                  <span className="font-medium">Verificados</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <CheckIcon />
                  <span className="font-medium">Pago protegido</span>
                </div>
              </div>
            </div>

            {/* Mascot - Smaller on mobile */}
            <div className="relative flex justify-center order-1 lg:order-2">
              <div className="relative group w-48 sm:w-64 lg:w-full max-w-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-blue-500 rounded-3xl transform rotate-3 transition-transform duration-300"></div>
                <div className="relative bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl transform -rotate-3 transition-transform duration-300">
                  <img src="/brand/Trosmi.png" alt="Trosmi" className="w-full h-auto" />
                  <div className="mt-3 sm:mt-4 lg:mt-6 text-center">
                    <h3 className="font-bold text-gray-900 text-lg sm:text-xl lg:text-2xl">¡Hola! Soy Trosmi</h3>
                    <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Te ayudo a encontrar profesionales</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Meta-style 2-column Grid */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
              ¿Qué necesitas arreglar?
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Encuentra expertos verificados
            </p>
          </div>

          {/* 2-column grid on mobile like Meta UI */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {[
              { icon: <PlumbingIcon />, name: 'Plomería', desc: 'Fugas y reparaciones' },
              { icon: <ElectricalIcon />, name: 'Electricidad', desc: 'Instalación y arreglos' },
              { icon: <PaintingIcon />, name: 'Pintura', desc: 'Interiores y exteriores' },
              { icon: <PlumbingIcon />, name: 'Electrodomésticos', desc: 'Instalación' },
              { icon: <ElectricalIcon />, name: 'Muebles', desc: 'Ensamblado' },
              { icon: <PaintingIcon />, name: 'Más servicios', desc: 'Construcción y más' },
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 active:scale-95 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col shadow-sm"
                onClick={() => navigate('/register?role=client')}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white mb-3 sm:mb-4 shadow-sm">
                  {service.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-sm sm:text-base lg:text-lg mb-1">{service.name}</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-snug">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Mobile Simplified */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Cómo funciona
            </h2>
            <p className="text-base sm:text-lg text-gray-600">Simple, rápido y gratis</p>
          </div>

          {/* Mobile: Vertical list, Desktop: 4 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { num: '1', icon: <SearchIcon />, title: 'Describe tu proyecto', desc: 'Cuéntanos qué necesitas arreglar o instalar' },
              { num: '2', icon: <StarIcon />, title: 'Compara profesionales', desc: 'Revisa perfiles, portfolios verificados y opiniones' },
              { num: '3', icon: <ShieldIcon />, title: 'Chatea y elige', desc: 'Habla con los interesados y selecciona el mejor' },
              { num: '4', icon: <MoneyIcon />, title: 'Paga protegido', desc: 'Tu dinero seguro con garantía de 5 días' },
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    {step.icon}
                  </div>
                  <div className="absolute top-2 right-0 w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                    {step.num}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-sky-300 to-transparent -ml-8"></div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/register?role=client')}
            >
              Empezar ahora - Es gratis
            </Button>
          </div>
        </div>
      </section>

      {/* Why Free Section */}
      <section className="py-16 bg-gradient-to-br from-sky-500 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            ¿Por qué es gratis para ti?
          </h2>
          <p className="text-xl text-sky-100 mb-8 leading-relaxed">
            Los profesionales pagan por recibir tus solicitudes de servicio.
            Tú nunca pagas nada por usar la plataforma, comparar perfiles o chatear.
          </p>
          <div className="grid sm:grid-cols-3 gap-8 mt-12">
            <div>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckIcon />
              </div>
              <h3 className="font-bold text-lg mb-2">Sin costos ocultos</h3>
              <p className="text-sky-100 text-sm">Nunca pagas por buscar o contactar profesionales</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckIcon />
              </div>
              <h3 className="font-bold text-lg mb-2">Pago protegido</h3>
              <p className="text-sky-100 text-sm">Tu dinero seguro con garantía de 5 días</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckIcon />
              </div>
              <h3 className="font-bold text-lg mb-2">Sin comisiones</h3>
              <p className="text-sky-100 text-sm">Pagas directamente al profesional</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Por qué elegir TrustMe
              </h2>
              <ul className="space-y-4">
                {[
                  'Profesionales verificados manualmente por nuestro equipo',
                  'Portfolios con trabajos confirmados por clientes reales',
                  'Opiniones detalladas con fotos de trabajos terminados',
                  'Compara múltiples opciones antes de decidir',
                  'Chat directo con los profesionales interesados',
                  'Pago con protección de 5 días después del servicio',
                ].map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/register?role=client')}
                className="mt-8"
              >
                Publicar mi proyecto gratis
              </Button>
            </div>

            <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-3xl p-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <img src="/brand/MrHandy.png" alt="MrHandy" className="w-12 h-12 rounded-full" />
                  <div>
                    <div className="font-bold text-gray-900">Juan Pérez</div>
                    <div className="text-sm text-gray-600">Plomería • 8 años exp.</div>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <StarIcon />
                    <span className="font-bold">4.9</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  "Reparé la fuga en el baño y cambié la llave de la cocina.
                  Trabajo muy profesional y limpio."
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <CheckIcon />
                  <span>María R. • Polanco • Hace 2 días</span>
                </div>
              </div>

              <div className="text-center text-gray-600">
                <p className="text-sm">Opiniones reales de clientes verificados</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            ¿Listo para comenzar?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-10 px-4">
            Publica tu proyecto gratis y recibe propuestas de profesionales verificados
          </p>

          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/register?role=client')}
            className="text-lg sm:text-xl px-8 sm:px-10 py-5 min-h-[56px] font-semibold shadow-lg"
          >
            Publicar proyecto gratis
          </Button>

          <p className="text-sm text-gray-500 mt-8">
            ¿Eres profesional?{' '}
            <button
              onClick={() => navigate('/para-profesionales')}
              className="text-sky-600 hover:text-sky-700 font-semibold"
            >
              Conoce TrustMe para profesionales
            </button>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <img src="/brand/Logo-blue.png" alt="TrustMe" className="h-8 mb-4 brightness-0 invert" />
              <p className="text-sm text-gray-400">
                Conectando clientes con profesionales verificados en la Ciudad de México.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Para clientes</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigate('/register?role=client')} className="hover:text-white transition-colors">Publicar proyecto</button></li>
                <li><a href="#" className="hover:text-white transition-colors">Cómo funciona</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Servicios</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Para profesionales</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigate('/para-profesionales')} className="hover:text-white transition-colors">Información</button></li>
                <li><button onClick={() => navigate('/register?role=worker')} className="hover:text-white transition-colors">Registrarse</button></li>
                <li><a href="#" className="hover:text-white transition-colors">Precios</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Términos y condiciones</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Soporte</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 TrustMe. Todos los derechos reservados. Ciudad de México, México.</p>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Bottom CTA - Only shows when hero CTA scrolls out of view */}
      <div
        className={`lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-40 transition-transform duration-300 ${
          showStickyButton ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <Button
          variant="primary"
          fullWidth
          size="lg"
          onClick={() => navigate('/register?role=client')}
          className="text-base font-semibold py-4 min-h-[56px] shadow-lg"
        >
          Buscar profesionales gratis
        </Button>
      </div>
    </div>
  );
};
