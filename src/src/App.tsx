import { useState, useCallback } from 'react';
import type { AnalysisResult } from './types';
import { generateMockAnalysis } from './data/mockAnalysis';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import FloatingChatbox from './components/FloatingChatbox';

export default function App() {
  const [view, setView] = useState<'landing' | 'analyzing' | 'dashboard'>('landing');
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = useCallback((url: string) => {
    setView('analyzing');
    // Simulate analysis delay
    setTimeout(() => {
      const analysis = generateMockAnalysis(url);
      setResult(analysis);
      setView('dashboard');
    }, 2500);
  }, []);

  const handleNewAnalysis = useCallback(() => {
    setResult(null);
    setView('landing');
  }, []);

  return (
    <>
      {view === 'landing' && (
        <Landing onAnalyze={handleAnalyze} isAnalyzing={false} />
      )}
      {(view === 'analyzing' || view === 'dashboard') && (
        <Dashboard
          result={result}
          isAnalyzing={view === 'analyzing'}
          onNewAnalysis={handleNewAnalysis}
        />
      )}
      <FloatingChatbox analysis={result} />
    </>
  );
}
