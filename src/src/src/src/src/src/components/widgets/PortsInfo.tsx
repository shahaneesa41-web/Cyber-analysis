import { Radio, Wifi, WifiOff, Shield } from 'lucide-react';
import type { PortInfo } from '../../types';

interface PortsInfoProps {
  ports: PortInfo[];
}

export default function PortsInfoWidget({ ports }: PortsInfoProps) {
  const openPorts = ports.filter(p => p.state === 'open');
  const filteredPorts = ports.filter(p => p.state === 'filtered');

  return (
    <div className="card p-0 overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Radio className="w-5 h-5 text-secondary" />
          <h3 className="font-semibold text-foreground text-sm">Open Ports</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-0.5 rounded-full bg-success/10 text-success font-medium">
            {openPorts.length} open
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-surface-alt text-muted font-medium">
            {filteredPorts.length} filtered
          </span>
        </div>
      </div>
      <div className="divide-y divide-border">
        {ports.map((port, i) => (
          <div key={i} className="px-5 py-3 flex items-center justify-between hover:bg-surface/30 transition-colors">
            <div className="flex items-center gap-3">
              {port.state === 'open' ? (
                <Wifi className="w-4 h-4 text-success" />
              ) : port.state === 'filtered' ? (
                <Shield className="w-4 h-4 text-accent" />
              ) : (
                <WifiOff className="w-4 h-4 text-muted" />
              )}
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono font-semibold text-foreground">{port.port}</span>
                  <span className="text-xs text-muted">/ {port.protocol.toUpperCase()}</span>
                </div>
                <span className="text-xs text-muted">{port.service}</span>
              </div>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded font-medium ${
              port.state === 'open'
                ? 'bg-success/10 text-success'
                : port.state === 'filtered'
                ? 'bg-amber-500/10 text-accent'
                : 'bg-surface-alt text-muted'
            }`}>
              {port.state}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
