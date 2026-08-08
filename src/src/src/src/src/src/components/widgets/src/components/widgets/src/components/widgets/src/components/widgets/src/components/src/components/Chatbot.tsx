import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, MessageSquare, Sparkles } from 'lucide-react';
import type { ChatMessage, AnalysisResult } from '../types';

interface ChatbotProps {
  analysis?: AnalysisResult | null;
  onClose?: () => void;
  isMobile: boolean;
  isOpen: boolean;
  onToggle: () => void;
  standalone?: boolean;
}

const predefinedResponses: Record<string, string> = {
  'risk': 'The overall risk score is **{score}** out of 100, which indicates **{level}**. Key concerns include missing security headers and an outdated jQuery library. I recommend addressing these medium-severity issues first.',
  'ssl': 'Yes, the SSL certificate is **valid**! It was issued by {issuer} and expires on {expiry}. The site uses {protocol}, which is the latest and most secure TLS version.',
  'tech': 'The site is built with **React** (v18.2.0) using **Next.js** (v14.0.4) as the framework. It\'s styled with **Tailwind CSS** (v3.4.0), written in **TypeScript** (v5.3.3), and hosted on **Vercel** behind **Cloudflare** CDN.',
  'threat': 'We scanned for common web vulnerabilities and found **{found} issue(s)** that need attention, primarily around missing security headers and an outdated JavaScript library. No malware or SQL injection vulnerabilities were detected.',
  'ports': 'We found **{open} open port(s)** — standard HTTP (80) and HTTPS (443). SSH port 22 is filtered but not directly accessible. No unusual or high-risk ports are exposed.',
  'dns': 'The site has **{records} DNS records** including A, AAAA, CNAME, MX, TXT, and NS records. It\'s using Cloudflare\'s nameservers.',
  'performance': 'Performance is generally good — **{grade}** ratings across most metrics. TTFB is {ttfb}, FCP is {fcp}. The main area for improvement is page size ({size}) which impacts load time.',
  'save': 'You can export the full analysis report as a PDF by clicking the **"Save as PDF"** button in the top-right corner of the page.',
};

function getBotResponse(message: string, analysis?: AnalysisResult | null): string {
  const lower = message.toLowerCase();

  if (!analysis) {
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
      return "Hello! 👋 Welcome to the **Cyber Analysis Platform**. I'm here to help you understand website security. Enter a URL above to get started, or ask me what I can do!";
    }
    if (lower.includes('what') || lower.includes('do') || lower.includes('help') || lower.includes('can')) {
      return "I can help you analyze any website for:\n\n- 🛡️ **Security threats** — malware, vulnerabilities, missing headers\n- 📋 **Tech stack** — frameworks, CMS, libraries\n- 🌐 **DNS & SSL** — certificate validity, DNS records\n- 📊 **Risk score** — overall security rating\n- 🔌 **Open ports** — exposed services\n- ⚡ **Performance** — speed metrics\n\nJust enter a URL above and click **Analyze** to get started!";
    }
    if (lower.includes('thank') || lower.includes('thanks')) {
      return "You're welcome! Enter a website URL above to get started with an analysis. Let me know if you have any questions!";
    }
    return `I can help you analyze websites for security threats, tech stacks, and more. Try entering a URL above, or ask me about:
- What I can do
- How the analysis works
- Types of security checks we perform

How can I assist you?`;
  }

  if (lower.includes('risk') || lower.includes('score') || lower.includes('safe')) {
    const level = analysis.riskScore >= 80 ? 'High Risk' : analysis.riskScore >= 50 ? 'Medium Risk' : 'Low Risk';
    return predefinedResponses['risk'].replace('{score}', String(analysis.riskScore)).replace('{level}', level);
  }
  if (lower.includes('ssl') || lower.includes('certificate') || lower.includes('https') || lower.includes('secure')) {
    return predefinedResponses['ssl'].replace('{issuer}', analysis.dnsSsl.sslIssuer).replace('{expiry}', analysis.dnsSsl.sslExpiry).replace('{protocol}', analysis.dnsSsl.protocol);
  }
  if (lower.includes('tech') || lower.includes('framework') || lower.includes('stack') || lower.includes('built')) {
    return predefinedResponses['tech'];
  }
  if (lower.includes('threat') || lower.includes('vulnerability') || lower.includes('malware') || lower.includes('hack') || lower.includes('security')) {
    const found = analysis.securityThreats.filter(t => t.status === 'found').length;
    return predefinedResponses['threat'].replace('{found}', String(found));
  }
  if (lower.includes('port')) {
    const open = analysis.ports.filter(p => p.state === 'open').length;
    return predefinedResponses['ports'].replace('{open}', String(open));
  }
  if (lower.includes('dns') || lower.includes('record')) {
    return predefinedResponses['dns'].replace('{records}', String(analysis.dnsSsl.dnsRecords.length));
  }
  if (lower.includes('perform') || lower.includes('speed') || lower.includes('fast') || lower.includes('slow') || lower.includes('load')) {
    const ttf = analysis.performance.find(p => p.name === 'Time to First Byte')?.value || 'N/A';
    const fcp = analysis.performance.find(p => p.name === 'First Contentful Paint')?.value || 'N/A';
    const size = analysis.performance.find(p => p.name === 'Total Page Size')?.value || 'N/A';
    const grade = analysis.performance.filter(p => p.grade === 'A').length;
    return predefinedResponses['performance'].replace('{grade}', `${grade}/6 A`).replace('{ttfb}', ttf).replace('{fcp}', fcp).replace('{size}', size);
  }
  if (lower.includes('pdf') || lower.includes('export') || lower.includes('save') || lower.includes('download')) {
    return predefinedResponses['save'];
  }
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return `Hello! I'm your analysis assistant for **${analysis.domain}**. Ask me anything about the security analysis — risks, tech stack, SSL, ports, threats, or performance.`;
  }
  if (lower.includes('thank') || lower.includes('thanks')) {
    return "You're welcome! If you have any more questions about the analysis, feel free to ask. You can also export the report as a PDF using the button at the top.";
  }

  return `I can help you understand the analysis of **${analysis.domain}**. Try asking about:
- **Risk score** — overall security rating
- **Threats & vulnerabilities** — security issues found
- **Tech stack** — technologies powering the site
- **SSL certificate** — encryption status
- **DNS records** — domain configuration
- **Open ports** — exposed services
- **Performance** — speed and optimization
- **Export** — how to save the report as PDF`;
}

const analysisSuggestions = [
  'What\'s the risk score?',
  'Any security threats?',
  'What tech stack?',
  'Tell me about SSL',
  'How to export?',
];

const standaloneSuggestions = [
  'What can you do?',
  'How does it work?',
  'Tell me about security checks',
];

export default function Chatbot({ analysis, isMobile, isOpen, onToggle, standalone }: ChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (messages.length === 0) {
      const welcome = analysis
        ? `👋 Analysis complete! I've analyzed **${analysis.domain}**. Ask me anything about the results — risks, tech stack, threats, or anything else.`
        : '👋 Welcome to the **Cyber Analysis Platform**! I\'m your security assistant. Enter a URL to analyze a website, or ask me what I can do!';
      setMessages([
        {
          id: '0',
          role: 'assistant',
          content: welcome,
          timestamp: new Date(),
        },
      ]);
    }
  }, [analysis]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    await new Promise(r => setTimeout(r, 600 + Math.random() * 400));

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: getBotResponse(trimmed, analysis),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestions = analysis ? analysisSuggestions : standaloneSuggestions;

  const panelContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">
            {analysis ? 'Analysis Chat' : 'Cyber Assistant'}
          </span>
          <Sparkles className="w-3.5 h-3.5 text-accent" />
        </div>
        {isMobile && (
          <button onClick={onToggle} className="p-1 hover:bg-surface-alt rounded-md transition-colors cursor-pointer">
            <X className="w-4 h-4 text-muted" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === 'user' ? 'bg-primary/20' : 'bg-surface-alt'
            }`}>
              {msg.role === 'user' ? (
                <User className="w-3.5 h-3.5 text-primary" />
              ) : (
                <Bot className="w-3.5 h-3.5 text-secondary" />
              )}
            </div>
            <div className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-primary text-white rounded-tr-sm'
                : 'bg-surface-alt text-foreground rounded-tl-sm'
            }`}>
              <div className="whitespace-pre-wrap">
                {msg.content.split(/(\*\*[^*]+\*\*|__[^_]+__)/).map((part, i) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
                  }
                  if (part.startsWith('__') && part.endsWith('__')) {
                    return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
                  }
                  if (part.includes('\n- ')) {
                    const lines = part.split('\n');
                    return (
                      <span key={i}>
                        {lines.map((line, j) => {
                          if (line.startsWith('- ')) {
                            return (
                              <span key={j} className="block ml-2">
                                <span className="text-primary mr-1">•</span>{line.slice(2)}
                              </span>
                            );
                          }
                          return <span key={j}>{line}{j < lines.length - 1 ? <br /> : ''}</span>;
                        })}
                      </span>
                    );
                  }
                  return <span key={i}>{part}</span>;
                })}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-2.5">
            <div className="w-7 h-7 rounded-full bg-surface-alt flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5 text-secondary" />
            </div>
            <div className="bg-surface-alt rounded-xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 2 && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-1.5">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => setInput(s)}
                className="text-xs px-2.5 py-1.5 rounded-full border border-border bg-surface/40 text-muted hover:text-foreground hover:border-primary/40 transition-colors cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-border shrink-0">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={analysis ? "Ask about the analysis..." : "Ask me anything..."}
            className="flex-1 bg-surface border border-border rounded-lg px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="p-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer active:scale-[0.95]"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  // Standalone (floating widget) rendering
  if (standalone) {
    if (!isOpen) return null;
    return (
      <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[360px] sm:w-[400px] h-[520px] bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden">
        {panelContent}
      </div>
    );
  }

  // Mobile: overlay panel
  if (isMobile) {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm">
        <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-surface border-l border-border">
          {panelContent}
        </div>
      </div>
    );
  }

  // Desktop: inline sidebar
  return (
    <div className="h-full border-l border-border bg-surface" style={{ width: '340px', minWidth: '340px' }}>
      {panelContent}
    </div>
  );
}
