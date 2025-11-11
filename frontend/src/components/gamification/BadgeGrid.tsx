interface Badge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

interface BadgeGridProps {
  badges: Badge[];
  limit?: number;
  onBadgeClick?: (badge: Badge) => void;
  onViewAll?: () => void;
  className?: string;
}

export function BadgeGrid({
  badges,
  limit,
  onBadgeClick,
  onViewAll,
  className = ''
}: BadgeGridProps) {
  const displayBadges = limit ? badges.slice(0, limit) : badges;
  const unlockedCount = badges.filter(b => b.unlocked).length;

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          🏅 Insignias ({unlockedCount}/{badges.length})
        </h3>
      </div>

      {/* Badge Grid */}
      <div className="grid grid-cols-5 gap-3">
        {displayBadges.map((badge) => (
          <button
            key={badge.id}
            onClick={() => onBadgeClick?.(badge)}
            className={`
              relative aspect-square rounded-lg flex items-center justify-center text-3xl
              transition-all duration-200
              ${
                badge.unlocked
                  ? 'bg-gradient-to-br from-sky-100 to-sky-200 hover:scale-110 hover:shadow-lg'
                  : 'bg-gray-100 opacity-40 cursor-default'
              }
            `}
            title={badge.name}
          >
            {badge.unlocked ? (
              <span>{badge.emoji}</span>
            ) : (
              <span className="text-gray-400">🔒</span>
            )}

            {/* Unlock indicator */}
            {badge.unlocked && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
            )}
          </button>
        ))}
      </div>

      {/* View All Button */}
      {limit && badges.length > limit && onViewAll && (
        <button
          onClick={onViewAll}
          className="mt-4 w-full py-2 text-sm font-medium text-sky-600 hover:text-sky-700 hover:bg-sky-50 rounded-lg transition-colors"
        >
          Ver Todas las Insignias →
        </button>
      )}
    </div>
  );
}
