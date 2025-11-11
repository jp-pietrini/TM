interface Achievement {
  id: string;
  name: string;
  emoji: string;
  description: string;
  progress: number;
  target: number;
  reward: string;
}

interface NextAchievementsProps {
  achievements: Achievement[];
  className?: string;
}

export function NextAchievements({ achievements, className = '' }: NextAchievementsProps) {
  if (achievements.length === 0) return null;

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        🎯 Próximos Logros
      </h3>

      <div className="space-y-3">
        {achievements.map((achievement) => {
          const percentage = Math.min((achievement.progress / achievement.target) * 100, 100);

          return (
            <div
              key={achievement.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl flex-shrink-0">{achievement.emoji}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {achievement.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {achievement.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>
                        {achievement.progress} / {achievement.target}
                      </span>
                      <span className="font-semibold">{Math.round(percentage)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-sky-400 to-sky-600 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Reward */}
                  <p className="text-xs text-sky-600 mt-2 font-medium">
                    Recompensa: {achievement.reward}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
