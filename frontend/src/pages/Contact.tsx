import { Mail, MessageSquare, Phone } from 'lucide-react';
import { Card, Button } from '../components/ui';

export function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contactar Soporte</h1>
          <p className="text-gray-600">
            ¿Necesitas ayuda? Nuestro equipo de soporte está aquí para ayudarte.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          <Card className="p-4 md:p-6 text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4">
              <Mail className="w-5 h-5 md:w-6 md:h-6 text-sky-600" />
            </div>
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 md:mb-2">Email</h3>
            <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-4">
              Respuesta en 24 horas
            </p>
            <a
              href="mailto:soporte@trustme.mx"
              className="text-sm md:text-base text-sky-600 hover:text-sky-700 font-medium"
            >
              soporte@trustme.mx
            </a>
          </Card>

          <Card className="p-4 md:p-6 text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4">
              <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
            </div>
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 md:mb-2">WhatsApp</h3>
            <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-4">
              Respuesta inmediata
            </p>
            <a
              href="https://wa.me/525512345678"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm md:text-base text-green-600 hover:text-green-700 font-medium"
            >
              +52 55 1234 5678
            </a>
          </Card>

          <Card className="p-4 md:p-6 text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4">
              <Phone className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
            </div>
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 md:mb-2">Teléfono</h3>
            <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-4">
              Lun - Vie, 9am - 6pm
            </p>
            <a
              href="tel:+525512345678"
              className="text-sm md:text-base text-purple-600 hover:text-purple-700 font-medium"
            >
              +52 55 1234 5678
            </a>
          </Card>
        </div>

        <Card className="p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Envíanos un mensaje</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre completo
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Asunto
              </label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                placeholder="¿En qué podemos ayudarte?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Mensaje
              </label>
              <textarea
                id="message"
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
                placeholder="Describe tu consulta o problema..."
              />
            </div>

            <Button type="submit" fullWidth className="flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              Enviar mensaje
            </Button>
          </form>
        </Card>

        <div className="mt-8 bg-sky-50 border border-sky-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">
            ¿Tienes una pregunta frecuente?
          </h3>
          <p className="text-gray-600 mb-4 text-center">
            Visita nuestro Centro de Ayuda donde encontrarás respuestas a las preguntas más comunes.
          </p>
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => window.location.href = '/help-center'}
            >
              Ir al Centro de Ayuda
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
