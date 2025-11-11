import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Phone, MapPin, Edit } from 'lucide-react';
import { Button, Card } from '../components/ui';

export function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock profile data - will be replaced with API call
  const profile = {
    firstName: 'Pedro',
    lastName: 'Pica',
    email: user?.email || 'pedro@pica.com',
    phone: user?.phone || '+52 55 1234 5678',
    zipCode: '03100',
    profilePhotoUrl: null,
    completionPercentage: 75,
    missingFields: ['Foto de perfil'],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8">
          {/* Profile Photo */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {profile.profilePhotoUrl ? (
                <img
                  src={profile.profilePhotoUrl}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-sky-100 flex items-center justify-center border-4 border-white shadow-lg">
                  <User className="w-16 h-16 text-sky-500" />
                </div>
              )}
            </div>
          </div>

          {/* Name */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {profile.firstName} {profile.lastName}
            </h2>
            <p className="text-gray-500 capitalize">{user?.role || 'cliente'}</p>
          </div>

          {/* Profile Info */}
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Correo electrónico</p>
                <p className="text-gray-900">{profile.email}</p>
                {user?.emailVerified && (
                  <p className="text-xs text-green-600 mt-1">✓ Verificado</p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <Phone className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Teléfono</p>
                <p className="text-gray-900">{profile.phone}</p>
                {user?.phoneVerified && (
                  <p className="text-xs text-green-600 mt-1">✓ Verificado</p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Código Postal</p>
                <p className="text-gray-900">{profile.zipCode}</p>
              </div>
            </div>
          </div>

          {/* Profile Completion */}
          <div className="bg-sky-50 border border-sky-200 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">
                Completitud de Perfil
              </h3>
              <span className="text-2xl font-bold text-sky-600">
                {profile.completionPercentage}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div
                className="bg-sky-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${profile.completionPercentage}%` }}
              />
            </div>

            {/* Missing Fields Checklist */}
            {profile.missingFields.length > 0 && (
              <div>
                <p className="text-sm text-gray-700 font-medium mb-2">
                  Faltan:
                </p>
                <ul className="space-y-1">
                  {profile.missingFields.map((field) => (
                    <li key={field} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-2 h-2 bg-gray-400 rounded-full" />
                      {field}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {profile.completionPercentage === 100 && (
              <div className="flex items-center gap-2 text-green-600">
                <span className="text-lg">✓</span>
                <p className="text-sm font-medium">Perfil completo</p>
              </div>
            )}
          </div>

          {/* Edit Button */}
          <Button
            onClick={() => navigate('/perfil/editar')}
            fullWidth
            className="flex items-center justify-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Editar Perfil
          </Button>
        </Card>
      </div>
    </div>
  );
}
