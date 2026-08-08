import { Zap, Clock } from 'lucide-react';
import type { PerformanceMetric } from '../../types';

interface PerformanceProps {
  metrics: PerformanceMetric[];
}

const gradeColors: Record<string, string> = {
  A: 'text-success',
  B: 'text-blue-400',
  C: 'text-accent',
  D: 'text-orange-500',
  F: 'text-destructive',
};

const gradeBg: Record<string, string> = {
  A: 'bg-success/10',
  B: 'bg-blue-500/10',
  C: 'bg-amber-500/10',
  D: 'bg-orange-500/10',
  F: 'bg-destructive/10',
};

export default function PerformanceWidget({ metrics }: PerformanceProps) {
  return (
    <div className="card p-0 overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center gap-2">
        <Zap className="w-5 h-5 text-accent" />
        <h3 className="font-semibold text-foreground text-sm">Performance</h3>
      </div>
      <div className="divide-y divide-border">
        {metrics.map((metric, i) => (
          <div key={i} className="px-5 py-3 flex items-center justify-between hover:bg-surface/30 transition-colors">
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-muted" />
              <div>
                <span className="text-sm text-foreground">{metric.name}</span>
                <p className="text-xs text-muted">{metric.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">{metric.value}</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${gradeColors[metric.grade]} ${gradeBg[metric.grade]}`}>
                {metric.grade}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
