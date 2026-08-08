import { Globe, Calendar, MapPin, Building2 } from 'lucide-react';
import type { DomainInfo } from '../../types';

interface DomainInfoProps {
  info: DomainInfo;
  domain: string;
}

export default function DomainInfoWidget({ info, domain }: DomainInfoProps) {
  const rows = [
    { label: 'Domain', value: domain, icon: <Globe className="w-4 h-4" /> },
    { label: 'Registrar', value: info.registrar, icon: <Building2 className="w-4 h-4" /> },
    { label: 'Created', value: new Date(info.creationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), icon: <Calendar className="w-4 h-4" /> },
    { label: 'Expires', value: new Date(info.expiryDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), icon: <Calendar className="w-4 h-4" /> },
    { label: 'Organization', value: info.orgName, icon: <Building2 className="w-4 h-4" /> },
    { label: 'Country', value: info.country, icon: <MapPin className="w-4 h-4" /> },
  ];

  return (
    <div className="card p-0 overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center gap-2">
        <Globe className="w-5 h-5 text-secondary" />
        <h3 className="font-semibold text-foreground text-sm">Domain & WHOIS</h3>
      </div>
      <div className="divide-y divide-border">
        {rows.map((row, i) => (
          <div key={i} className="px-5 py-2.5 flex items-center gap-3 hover:bg-surface/30 transition-colors">
            <span className="text-muted shrink-0">{row.icon}</span>
            <span className="text-xs text-muted w-24 shrink-0">{row.label}</span>
            <span className="text-sm text-foreground font-medium truncate">{row.value}</span>
          </div>
        ))}
      </div>
      {info.nameServers.length > 0 && (
        <div className="px-5 py-3 border-t border-border">
          <div className="text-xs text-muted mb-2">Name Servers</div>
          <div className="flex flex-wrap gap-2">
            {info.nameServers.map((ns, i) => (
              <span key={i} className="text-xs px-2 py-1 rounded bg-surface-alt text-muted font-mono">
                {ns}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
