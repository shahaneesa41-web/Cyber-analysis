import { Shield, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import type { SecurityThreat } from '../../types';

interface SecurityThreatsProps {
  threats: SecurityThreat[];
}

const severityConfig = {
  critical: { color: 'text-destructive', bg: 'bg-red-500/10', border: 'border-red-500/20', label: 'Critical' },
  high: { color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20', label: 'High' },
  medium: { color: 'text-accent', bg: 'bg-amber-500/10', border: 'border-amber-500/20', label: 'Medium' },
  low: { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', label: 'Low' },
  info: { color: 'text-muted', bg: 'bg-surface-alt', border: 'border-border', label: 'Info' },
};

export default function SecurityThreatsWidget({ threats }: SecurityThreatsProps) {
  const found = threats.filter(t => t.status === 'found');

  return (
    <div className="card p-0 overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-accent" />
          <h3 className="font-semibold text-foreground text-sm">Security Threats</h3>
        </div>
        {found.length > 0 && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-destructive/10 text-destructive font-medium">
            {found.length} issue{found.length > 1 ? 's' : ''} found
          </span>
        )}
      </div>
      <div className="divide-y divide-border">
        {threats.map((threat, i) => {
          const cfg = severityConfig[threat.severity];
          return (
            <div key={i} className="px-5 py-3.5 hover:bg-surface/40 transition-colors">
              <div className="flex items-start gap-3">
                {threat.status === 'found' ? (
                  <AlertTriangle className={`w-4 h-4 mt-0.5 shrink-0 ${cfg.color}`} />
                ) : threat.status === 'not-found' ? (
                  <CheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-success" />
                ) : (
                  <Info className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-foreground">{threat.type}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${cfg.bg} ${cfg.color}`}>
                      {cfg.label}
                    </span>
                    {threat.status === 'not-found' && (
                      <span className="text-[10px] text-success">✓ Clean</span>
                    )}
                  </div>
                  <p className="text-xs text-muted mt-1">{threat.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
