import { Code } from 'lucide-react';
import type { TechStackItem } from '../../types';

interface TechStackProps {
  items: TechStackItem[];
}

const categoryLabels: Record<string, string> = {
  framework: 'Framework',
  cms: 'CMS',
  analytics: 'Analytics',
  cdn: 'CDN',
  hosting: 'Hosting',
  javascript: 'JavaScript',
  css: 'CSS Framework',
  other: 'Other',
};

export default function TechStackWidget({ items }: TechStackProps) {
  return (
    <div className="card p-0 overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center gap-2">
        <Code className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground text-sm">Tech Stack</h3>
        <span className="text-xs text-muted ml-auto">{items.length} technologies</span>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 p-2.5 rounded-lg border border-border bg-surface/40"
            >
              <span className="w-7 h-7 rounded-md bg-surface-alt flex items-center justify-center text-xs shrink-0 font-bold text-primary">
                {item.name.charAt(0)}
              </span>
              <div className="min-w-0">
                <div className="text-sm font-medium text-foreground truncate">{item.name}</div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-muted">{categoryLabels[item.category]}</span>
                  {item.version && (
                    <>
                      <span className="text-muted">·</span>
                      <span className="text-[10px] text-muted">v{item.version}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
