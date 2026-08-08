import { useState } from 'react';
import { Globe, Loader2, ArrowRight } from 'lucide-react';

interface LandingProps {
  onAnalyze: (url: string) => void;
  isAnalyzing: boolean;
}

export default function Landing({ onAnalyze, isAnalyzing }: LandingProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const isValidUrl = (value: string) => {
    try {
      const u = new URL(value.startsWith('http') ? value : `https://${value}`);
      return u.hostname.includes('.');
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) {
      setError('Please enter a website URL');
      return;
    }
    const fullUrl = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
    if (!isValidUrl(trimmed)) {
      setError('Please enter a valid URL (e.g., example.com)');
      return;
    }
    setError('');
    onAnalyze(fullUrl);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-[#0F1A2E] to-[#0B1120]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.08)_0%,transparent_60%)]" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-3xl w-full text-center">
        {/* Logo / Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-surface/60 mb-8">
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted font-medium">Cyber Analysis Platform</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground leading-tight mb-5">
          Analyze any{' '}
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            website
          </span>{' '}
          for threats
        </h1>

        <p className="text-lg text-muted max-w-xl mx-auto mb-10 leading-relaxed">
          Enter a URL to get a comprehensive security analysis — tech stack, vulnerabilities,
          domain info, SSL validation, and more.
        </p>

        {/* URL Input */}
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <div className="relative flex items-center gap-0">
            <div className="relative flex-1">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="text"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError('');
                }}
                placeholder="Enter website URL (e.g., example.com)"
                className="w-full pl-12 pr-4 py-4 bg-surface border border-border rounded-l-xl text-foreground text-base placeholder:text-muted/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                disabled={isAnalyzing}
              />
            </div>
            <button
              type="submit"
              disabled={isAnalyzing}
              className="px-6 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-r-xl flex items-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  Analyze
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
          {error && <p className="text-destructive text-sm mt-2 text-left">{error}</p>}
        </form>

        {/* Features preview */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          {features.map((f) => (
            <div
              key={f.label}
              className="p-3 rounded-lg border border-border bg-surface/40 hover:bg-surface/60 transition-colors"
            >
              <div className="text-primary mb-1">{f.icon}</div>
              <div className="text-xs font-semibold text-foreground">{f.label}</div>
              <div className="text-[10px] text-muted mt-0.5">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const Shield = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const features = [
  { icon: '🛡️', label: 'Threat Detection', desc: 'Malware & vulnerabilities' },
  { icon: '📋', label: 'Tech Stack', desc: 'Frameworks & CMS detection' },
  { icon: '🌐', label: 'DNS & SSL', desc: 'Certificate & records' },
  { icon: '📊', label: 'Risk Score', desc: 'Overall security rating' },
];
