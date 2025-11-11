interface XPProgressBarProps {
  current: number;
  target: number;
  nextLevel: string;
  className?: string;
}

export function XPProgressBar({ current, target, nextLevel, className = '' }: XPProgressBarProps) {
  const percentage = Math.min((current / target) * 100, 100);
  const remaining = Math.max(target - current, 0);

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-gray-900">🎯 Progreso a {nextLevel}</span>
        <span className="text-gray-600">
          {current.toLocaleString()} / {target.toLocaleString()} XP ({Math.round(percentage)}%)
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-sky-400 to-sky-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {remaining > 0 && (
        <p className="text-xs text-gray-500">
          Faltan <span className="font-semibold text-sky-600">{remaining.toLocaleString()} XP</span>
        </p>
      )}
    </div>
  );
}
