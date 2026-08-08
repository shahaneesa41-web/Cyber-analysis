import { useState, useEffect } from 'react';
import { Bot, X } from 'lucide-react';
import type { AnalysisResult } from '../types';
import Chatbot from './Chatbot';

interface FloatingChatboxProps {
  analysis?: AnalysisResult | null;
}

export default function FloatingChatbox({ analysis }: FloatingChatboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close chat when switching between mobile/desktop
  useEffect(() => {
    if (isMobile) setIsOpen(false);
  }, [isMobile]);

  return (
    <>
      {/* Chat popup panel */}
      {isMobile ? (
        <Chatbot
          analysis={analysis}
          isMobile
          isOpen={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
        />
      ) : (
        <Chatbot
          analysis={analysis}
          isMobile={false}
          isOpen={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
          standalone
        />
      )}

      {/* Floating action button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 sm:right-6 z-50 p-3.5 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg transition-all duration-200 active:scale-90 cursor-pointer group"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X className="w-5 h-5 transition-transform duration-200 group-hover:rotate-90" />
        ) : (
          <Bot className="w-5 h-5" />
        )}
      </button>
    </>
  );
}
