import { FileDown, Shield } from 'lucide-react';
import type { AnalysisResult } from '../types';

interface HeaderProps {
  result: AnalysisResult | null;
  onExport: () => void;
  onNewAnalysis: () => void;
}

export default function Header({ result, onExport, onNewAnalysis }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="flex items-center justify-between px-4 sm:px-6 h-16">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-primary" />
          <span className="font-semibold text-foreground text-lg hidden sm:block">
            Cyber Analysis
          </span>
          {result && (
            <>
              <span className="text-muted hidden sm:block">/</span>
              <span className="text-sm text-muted hidden sm:block truncate max-w-[200px]">
                {result.domain}
              </span>
              <span className="text-muted sm:hidden">/</span>
              <span className="text-sm text-muted sm:hidden truncate max-w-[120px]">
                {result.domain}
              </span>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onNewAnalysis}
            className="px-4 py-2 text-sm text-muted hover:text-foreground border border-border rounded-lg hover:bg-surface transition-all duration-200 cursor-pointer"
          >
            New Analysis
          </button>
          <button
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer active:scale-[0.98]"
          >
            <FileDown className="w-4 h-4" />
            <span className="hidden sm:inline">Save as PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
}
