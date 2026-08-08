export interface TechStackItem {
  name: string;
  category: 'framework' | 'cms' | 'analytics' | 'cdn' | 'hosting' | 'javascript' | 'css' | 'other';
  version?: string;
  icon: string;
}

export interface SecurityThreat {
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  status: 'found' | 'not-found' | 'warning';
  description: string;
}

export interface DomainInfo {
  registrar: string;
  creationDate: string;
  expiryDate: string;
  nameServers: string[];
  orgName: string;
  country: string;
}

export interface PortInfo {
  port: number;
  service: string;
  state: 'open' | 'closed' | 'filtered';
  protocol: 'tcp' | 'udp';
}

export interface PerformanceMetric {
  name: string;
  value: string;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  description: string;
}

export interface DnsSslInfo {
  sslValid: boolean;
  sslIssuer: string;
  sslExpiry: string;
  protocol: string;
  dnsRecords: { type: string; value: string; ttl: string }[];
}

export interface AnalysisResult {
  url: string;
  domain: string;
  riskScore: number; // 0-100
  analyzedAt: string;
  techStack: TechStackItem[];
  securityThreats: SecurityThreat[];
  domainInfo: DomainInfo;
  ports: PortInfo[];
  performance: PerformanceMetric[];
  dnsSsl: DnsSslInfo;
  summary: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export type AppView = 'landing' | 'analyzing' | 'dashboard';
