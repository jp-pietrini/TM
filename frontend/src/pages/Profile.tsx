import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Phone, MapPin, Edit } from 'lucide-react';
import { Button, Card } from '../components/ui';
import { LevelBadge } from '../components/gamification/LevelBadge';
import { XPProgressBar } from '../components/gamification/XPProgressBar';
import { StatsGrid } from '../components/gamification/StatsGrid';
import { BadgeGrid } from '../components/gamification/BadgeGrid';
import { NextAchievements } from '../components/gamification/NextAchievements';

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

  // Mock gamification data
  const gameData = {
    level: 'oro' as const,
    xp: 2450,
    nextLevelXP: 3000,
    nextLevelName: 'Platino',
    stats: [
      { label: 'Proyectos', value: '12', icon: '📋' },
      { label: 'Completados', value: '8', icon: '✅' },
      { label: 'Reseñas', value: '6', icon: '✍️' },
      { label: 'Tasa Final.', value: '67%', icon: '🎯' },
    ],
    badges: [
      { id: '1', name: 'Primer Proyecto', emoji: '🎉', description: 'Publicaste tu primer proyecto', unlocked: true, unlockedAt: new Date('2025-03-01') },
      { id: '2', name: 'Primera Victoria', emoji: '✔️', description: 'Completaste tu primer proyecto', unlocked: true, unlockedAt: new Date('2025-03-08') },
      { id: '3', name: 'Primera Opinión', emoji: '🌱', description: 'Publicaste tu primera reseña', unlocked: true, unlockedAt: new Date('2025-03-15') },
      { id: '4', name: 'Lanzador', emoji: '🚀', description: 'Publicaste 5 proyectos', unlocked: true, unlockedAt: new Date('2025-03-10') },
      { id: '5', name: 'En la Meta', emoji: '🎯', description: 'Completaste 5 proyectos', unlocked: true, unlockedAt: new Date('2025-04-05') },
      { id: '6', name: 'Comunicador', emoji: '💬', description: 'Publicaste 5 reseñas', unlocked: true, unlockedAt: new Date('2025-04-20') },
      { id: '7', name: 'Soñador', emoji: '💭', description: 'Creaste tu primera wishlist', unlocked: true, unlockedAt: new Date('2025-03-12') },
      { id: '8', name: 'Hacedor', emoji: '🎬', description: 'Convertiste 3 wishlist items', unlocked: true, unlockedAt: new Date('2025-04-15') },
      { id: '9', name: 'Super Activo', emoji: '⚡', description: 'Publicaste 10 proyectos', unlocked: false },
      { id: '10', name: 'Completador', emoji: '🏅', description: 'Completaste 10 proyectos', unlocked: false },
      { id: '11', name: 'Voz de la Comunidad', emoji: '🗣️', description: 'Publicaste 10 reseñas', unlocked: false },
      { id: '12', name: 'Cliente Fiel', emoji: '🔄', description: 'Recontrataste al mismo trabajador 3 veces', unlocked: false },
    ],
    nextAchievements: [
      {
        id: 'a1',
        name: 'Voz de la Comunidad',
        emoji: '🗣️',
        description: 'Publica 4 reseñas más',
        progress: 6,
        target: 10,
        reward: '+75 XP + Insignia',
      },
      {
        id: 'a2',
        name: 'Completador',
        emoji: '🏅',
        description: 'Completa 2 proyectos más',
        progress: 8,
        target: 10,
        reward: '+150 XP + Insignia',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
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
            <p className="text-gray-500 capitalize mb-4">{user?.role || 'cliente'}</p>

            {/* Level Badge */}
            <div className="flex justify-center">
              <LevelBadge level={gameData.level} size="large" />
            </div>
          </div>

          {/* XP Progress */}
          <XPProgressBar
            current={gameData.xp}
            target={gameData.nextLevelXP}
            nextLevel={gameData.nextLevelName}
            className="mb-6"
          />

          <div className="border-t border-gray-200 my-6" />

          {/* Stats Grid */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Mis Estadísticas</h3>
            <StatsGrid stats={gameData.stats} />
          </div>

          <div className="border-t border-gray-200 my-6" />

          {/* Badge Grid */}
          <BadgeGrid
            badges={gameData.badges}
            limit={10}
            onBadgeClick={(badge) => {
              console.log('Badge clicked:', badge);
              // TODO: Open badge detail modal
            }}
            onViewAll={() => {
              console.log('View all badges');
              // TODO: Open all badges modal
            }}
          />

          <div className="border-t border-gray-200 my-6" />

          {/* Next Achievements */}
          <NextAchievements achievements={gameData.nextAchievements} className="mb-6" />

          <div className="border-t border-gray-200 my-6" />

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
