interface LevelBadgeProps {
  level: 'bronce' | 'plata' | 'oro' | 'platino' | 'elite';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const levelConfig = {
  bronce: {
    name: 'Cliente Bronce',
    emoji: '🥉',
    gradient: 'from-[#CD7F32] to-[#8B5A00]',
    textColor: 'text-amber-900',
  },
  plata: {
    name: 'Cliente Plata',
    emoji: '🥈',
    gradient: 'from-gray-300 to-gray-500',
    textColor: 'text-gray-700',
  },
  oro: {
    name: 'Cliente Oro',
    emoji: '🥇',
    gradient: 'from-yellow-400 to-orange-500',
    textColor: 'text-yellow-900',
  },
  platino: {
    name: 'Cliente Platino',
    emoji: '💎',
    gradient: 'from-gray-200 to-gray-400',
    textColor: 'text-gray-800',
  },
  elite: {
    name: 'Cliente Elite',
    emoji: '👑',
    gradient: 'from-purple-500 to-yellow-400',
    textColor: 'text-purple-900',
  },
};

export function LevelBadge({ level, size = 'medium', className = '' }: LevelBadgeProps) {
  const config = levelConfig[level];

  const sizeClasses = {
    small: 'py-1 px-3 text-xs',
    medium: 'py-2 px-4 text-sm',
    large: 'py-3 px-6 text-base',
  };

  return (
    <div
      className={`
        inline-flex items-center justify-center gap-2
        bg-gradient-to-r ${config.gradient}
        text-white font-bold rounded-lg shadow-lg
        ${sizeClasses[size]}
        ${className}
      `}
    >
      <span className="text-xl">{config.emoji}</span>
      <span>{config.name}</span>
    </div>
  );
}
