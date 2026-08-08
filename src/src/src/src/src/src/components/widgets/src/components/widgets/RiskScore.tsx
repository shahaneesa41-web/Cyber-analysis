import { Gauge, AlertTriangle, Shield } from 'lucide-react';

interface RiskScoreProps {
  score: number;
}

export default function RiskScoreWidget({ score }: RiskScoreProps) {
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  const getGrade = (s: number) => {
    if (s >= 80) return { label: 'High Risk', color: 'text-destructive', glow: 'glow-critical', stopColor: '#EF4444' };
    if (s >= 50) return { label: 'Medium Risk', color: 'text-accent', glow: 'glow-warning', stopColor: '#F59E0B' };
    return { label: 'Low Risk', color: 'text-success', glow: '', stopColor: '#22C55E' };
  };

  const grade = getGrade(score);

  return (
    <div className="card flex flex-col items-center justify-center py-6">
      <div className="flex items-center gap-2 mb-4">
        <Gauge className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground text-sm">Risk Score</h3>
      </div>
      <div className={`relative ${score >= 80 ? grade.glow : ''}`}>
        <svg width="140" height="140" className="transform -rotate-90">
          <circle
            cx="70"
            cy="70"
            r="54"
            fill="none"
            stroke="var(--color-surface-alt)"
            strokeWidth="10"
          />
          <circle
            cx="70"
            cy="70"
            r="54"
            fill="none"
            stroke={grade.stopColor}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-foreground">{score}</span>
          <span className="text-[10px] text-muted mt-0.5">/ 100</span>
        </div>
      </div>
      <div className={`flex items-center gap-1.5 mt-3 text-sm font-semibold ${grade.color}`}>
        {score >= 50 ? <AlertTriangle className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
        {grade.label}
      </div>
    </div>
  );
}
