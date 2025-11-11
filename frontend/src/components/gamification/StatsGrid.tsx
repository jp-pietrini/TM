interface Stat {
  label: string;
  value: string | number;
  icon?: string;
}

interface StatsGridProps {
  stats: Stat[];
  className?: string;
}

export function StatsGrid({ stats, className = '' }: StatsGridProps) {
  return (
    <div className={`grid grid-cols-2 gap-4 ${className}`}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200"
        >
          {stat.icon && (
            <div className="text-2xl mb-2">{stat.icon}</div>
          )}
          <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
          <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
