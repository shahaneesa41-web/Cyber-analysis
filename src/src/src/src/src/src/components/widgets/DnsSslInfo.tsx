import { Lock, Shield, Server } from 'lucide-react';
import type { DnsSslInfo } from '../../types';

interface DnsSslProps {
  info: DnsSslInfo;
}

export default function DnsSslWidget({ info }: DnsSslProps) {
  return (
    <div className="card p-0 overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center gap-2">
        <Lock className="w-5 h-5 text-success" />
        <h3 className="font-semibold text-foreground text-sm">DNS & SSL</h3>
      </div>

      {/* SSL Status */}
      <div className="px-5 py-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-muted">SSL Certificate</span>
          {info.sslValid ? (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-success">
              <Shield className="w-3.5 h-3.5" />
              Valid
            </span>
          ) : (
            <span className="text-xs font-semibold text-destructive">Invalid / Expired</span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-[10px] text-muted mb-0.5">Issuer</div>
            <div className="text-xs text-foreground font-medium">{info.sslIssuer}</div>
          </div>
          <div>
            <div className="text-[10px] text-muted mb-0.5">Expires</div>
            <div className="text-xs text-foreground font-medium">
              {new Date(info.sslExpiry).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
            </div>
          </div>
          <div className="col-span-2">
            <div className="text-[10px] text-muted mb-0.5">Protocol</div>
            <div className="text-xs text-foreground font-mono font-medium">{info.protocol}</div>
          </div>
        </div>
      </div>

      {/* DNS Records */}
      <div className="px-5 py-3">
        <div className="flex items-center gap-2 mb-3">
          <Server className="w-4 h-4 text-secondary" />
          <span className="text-xs font-semibold text-foreground">DNS Records</span>
          <span className="text-[10px] text-muted ml-auto">{info.dnsRecords.length} records</span>
        </div>
        <div className="space-y-1.5">
          {info.dnsRecords.map((record, i) => (
            <div key={i} className="flex items-center gap-2 text-xs py-1">
              <span className="w-10 px-1.5 py-0.5 rounded bg-surface-alt text-secondary font-mono font-semibold text-center">
                {record.type}
              </span>
              <span className="text-foreground font-mono truncate">{record.value}</span>
              <span className="text-muted shrink-0">{record.ttl}s</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
