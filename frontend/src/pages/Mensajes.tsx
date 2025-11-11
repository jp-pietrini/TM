import { MessageCircle, Sparkles } from 'lucide-react';

export function Mensajes() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <MessageCircle className="w-10 h-10 text-sky-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Mensajes</h1>
        <p className="text-gray-600 mb-6">
          Chatea con profesionales y gestiona tus conversaciones.
        </p>
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <Sparkles className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
          <p className="text-sm text-gray-500">
            Esta funcionalidad estará disponible próximamente. Aquí podrás chatear en tiempo
            real con los profesionales.
          </p>
        </div>
      </div>
    </div>
  );
}
