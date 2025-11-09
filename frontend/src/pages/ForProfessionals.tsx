import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui';
import { PublicHeader } from '../components/PublicHeader';

const CheckIcon = () => (
  <svg className="w-5 h-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

const MoneyIcon = () => (
  <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const GiftIcon = () => (
  <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

export const ForProfessionals: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white pb-20 lg:pb-0">
      <PublicHeader />

      {/* Hero Section - Mobile Optimized */}
      <section className="relative bg-gradient-to-br from-blue-600 via-sky-600 to-sky-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-5 py-2.5 mb-4 sm:mb-6">
                <span className="text-sm sm:text-base font-bold">🎉 Primera semana GRATIS</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 sm:mb-6">
                Consigue más clientes. Haz crecer tu negocio.
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-sky-100 mb-6 sm:mb-8 leading-relaxed">
                Accede a clientes verificados buscando tus servicios en CDMX.
                <span className="block mt-2 font-bold text-white text-lg sm:text-xl">Solo pagas por los proyectos que te interesan.</span>
              </p>

              {/* CTA - Larger for mobile */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-6 sm:mb-8">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/register?role=worker')}
                  className="text-lg sm:text-xl px-8 py-5 sm:py-4 bg-white text-sky-600 hover:bg-gray-50 min-h-[56px] font-bold shadow-xl"
                >
                  Empezar gratis - 7 días
                </Button>
              </div>

              {/* Trust Signals - Vertical on mobile */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center lg:justify-start gap-3 sm:gap-6 text-sm sm:text-base">
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <CheckIcon />
                  <span className="font-medium">Primera semana gratis</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <CheckIcon />
                  <span className="font-medium">100 MXN por proyecto</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <CheckIcon />
                  <span className="font-medium">0% comisión</span>
                </div>
              </div>
            </div>

            {/* Mascot - Smaller on mobile */}
            <div className="relative flex justify-center order-1 lg:order-2">
              <div className="relative group w-48 sm:w-64 lg:w-full max-w-sm">
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-3xl transform -rotate-3 transition-transform duration-300"></div>
                <div className="relative bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl transform rotate-3 transition-transform duration-300">
                  <img src="/brand/MrHandy.png" alt="MrHandy" className="w-full h-auto" />
                  <div className="mt-3 sm:mt-4 lg:mt-6 text-center">
                    <h3 className="font-bold text-gray-900 text-lg sm:text-xl lg:text-2xl">Bienvenido, profesional</h3>
                    <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Construye tu reputación</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué TrustMe?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Un modelo de negocio justo que te ayuda a crecer sin comisiones
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <GiftIcon />,
                title: 'Primera semana gratis',
                desc: 'Recibe todos los proyectos que quieras durante 7 días sin costo',
                highlight: '300 MXN de crédito',
              },
              {
                icon: <MoneyIcon />,
                title: '100 MXN por oportunidad',
                desc: 'Después de la primera semana, solo pagas 100 MXN por cada proyecto que te interese',
                highlight: 'Precio fijo',
              },
              {
                icon: <ShieldIcon />,
                title: '0% de comisión',
                desc: 'Te quedas con el 100% del pago del cliente. Sin comisiones sobre tus servicios',
                highlight: 'Todo para ti',
              },
              {
                icon: <TrendingUpIcon />,
                title: 'Reembolso garantizado',
                desc: 'Si el cliente no responde en 48 horas, te devolvemos automáticamente tu dinero',
                highlight: 'Sin riesgo',
              },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-6 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="w-20 h-20 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    {item.icon}
                  </div>
                  <div className="inline-block bg-sky-100 text-sky-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {item.highlight}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Cómo funciona
            </h2>
            <p className="text-lg text-gray-600">De registro a primer cliente en minutos</p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              { num: '1', title: 'Regístrate gratis', desc: 'Crea tu cuenta y completa tu perfil profesional' },
              { num: '2', title: 'Agrega tu portfolio', desc: 'Muestra tus mejores trabajos y gana confianza' },
              { num: '3', title: 'Recibe proyectos', desc: 'Ve los detalles completos antes de pagar' },
              { num: '4', title: 'Compra los que quieras', desc: 'Solo 100 MXN por oportunidad después de la primera semana' },
              { num: '5', title: 'Chatea y cierra', desc: 'Habla con el cliente y acuerda el precio' },
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white rounded-xl p-6 shadow-md h-full">
                  <div className="w-12 h-12 bg-sky-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 shadow-md">
                    {step.num}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
                {idx < 4 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-6 h-0.5 bg-sky-300 -ml-3"></div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/register?role=worker')}
            >
              Comenzar gratis ahora
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Precios simples y transparentes
            </h2>
            <p className="text-lg text-gray-600">Sin sorpresas. Sin comisiones. Sin permanencia.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* First Week */}
            <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                🎉 GRATIS
              </div>
              <h3 className="text-2xl font-bold mb-2">Primera semana</h3>
              <div className="text-5xl font-bold mb-6">
                0 MXN
                <span className="text-lg font-normal text-sky-100 block mt-2">Por 7 días</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>Proyectos ilimitados gratis</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>300 MXN de crédito</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>Acceso completo a la plataforma</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span>Portfolio verificado</span>
                </li>
              </ul>
              <p className="text-sky-100 text-sm">
                Perfecto para probar la plataforma sin riesgo
              </p>
            </div>

            {/* After First Week */}
            <div className="bg-white border-2 border-sky-500 rounded-3xl p-8 relative">
              <div className="absolute top-4 right-4 bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm font-semibold">
                Popular
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Después de la primera semana</h3>
              <div className="text-5xl font-bold text-gray-900 mb-6">
                100 MXN
                <span className="text-lg font-normal text-gray-600 block mt-2">Por proyecto</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span className="text-gray-700">Ve los detalles completos antes de pagar</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span className="text-gray-700">Reembolso si no responden en 48h</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span className="text-gray-700">0% comisión sobre tus servicios</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  <span className="text-gray-700">Control total de tu presupuesto semanal</span>
                </li>
              </ul>
              <p className="text-gray-600 text-sm">
                Solo pagas por los proyectos que realmente te interesan
              </p>
            </div>
          </div>

          <div className="mt-12 bg-sky-50 rounded-2xl p-6 max-w-2xl mx-auto">
            <h4 className="font-bold text-gray-900 mb-3 text-center">💡 Ejemplo práctico:</h4>
            <p className="text-gray-700 text-sm text-center">
              Compras 3 proyectos en una semana (300 MXN). Cierras 1 proyecto por 1,500 MXN.
              <span className="block mt-2 font-semibold text-sky-700">
                Tu ganancia neta: 1,200 MXN (80% de margen)
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Beneficios exclusivos para profesionales
              </h2>
              <ul className="space-y-4">
                {[
                  'Control total: Define tu presupuesto semanal y cantidad de proyectos',
                  'Sin riesgo: Reembolso automático si el cliente no responde en 48 horas',
                  'Portfolio verificado: Clientes confirman tus trabajos anteriores',
                  'Chat directo: Comunícate fácilmente con clientes potenciales',
                  'Pago protegido: Escrow de 5 días para seguridad de ambas partes',
                  'Construye reputación: Sistema de opiniones que te ayuda a destacar',
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
                onClick={() => navigate('/register?role=worker')}
                className="mt-8"
              >
                Registrarme gratis
              </Button>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-sky-500">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0 text-2xl">
                    📊
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Control de presupuesto</h4>
                    <p className="text-gray-600 text-sm">
                      Define un presupuesto semanal mínimo de 300 MXN. La plataforma se pausa automáticamente
                      cuando alcanzas tu límite. Tú decides cuánto invertir.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-500">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-2xl">
                    ✅
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Ve todo antes de pagar</h4>
                    <p className="text-gray-600 text-sm">
                      Descripción completa del proyecto, fotos, ubicación (zona), presupuesto estimado
                      y urgencia. Toma decisiones informadas sobre qué proyectos comprar.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-2xl">
                    🔒
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Pago seguro con escrow</h4>
                    <p className="text-gray-600 text-sm">
                      El cliente paga antes del servicio. El dinero se guarda de forma segura durante 5 días
                      después de completar el trabajo, protegiéndote de fraudes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-sky-500 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6">
            Únete a TrustMe hoy
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-sky-100 mb-8 sm:mb-10 leading-relaxed px-4">
            Regístrate gratis y recibe tu primera semana sin costo.
          </p>

          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/register?role=worker')}
            className="text-lg sm:text-xl px-8 sm:px-10 py-5 bg-white text-sky-600 hover:bg-gray-50 shadow-xl min-h-[56px] font-bold"
          >
            Empezar gratis ahora
          </Button>

          <p className="text-sm text-sky-100 mt-8">
            ¿Tienes preguntas? Contáctanos y te ayudamos a empezar
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
                Conectando profesionales con clientes en la Ciudad de México.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Para clientes</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigate('/')} className="hover:text-white transition-colors">Página principal</button></li>
                <li><button onClick={() => navigate('/register?role=client')} className="hover:text-white transition-colors">Publicar proyecto</button></li>
                <li><a href="#" className="hover:text-white transition-colors">Cómo funciona</a></li>
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

      {/* Mobile Sticky Bottom CTA - Only on small screens */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-40">
        <Button
          variant="primary"
          fullWidth
          size="lg"
          onClick={() => navigate('/register?role=worker')}
          className="text-base font-semibold py-4 min-h-[56px] shadow-lg"
        >
          Empezar gratis - 7 días
        </Button>
      </div>
    </div>
  );
};
