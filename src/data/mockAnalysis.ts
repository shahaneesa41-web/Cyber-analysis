import type { AnalysisResult } from '../types';
export function generateMockAnalysis(url: string): AnalysisResult {
  const domain = new URL(url).hostname;

  return {
    url,
    domain,
    riskScore: 72,
    analyzedAt: new Date().toISOString(),
    summary: `${domain} is running a modern web stack with React frontend hosted on Cloudflare. The site has a valid SSL certificate with strong encryption. We detected 2 medium-severity security concerns related to missing security headers and one outdated library version.`,
    techStack: [
      { name: 'React', category: 'framework', version: '18.2.0', icon: '⚛️' },
      { name: 'Next.js', category: 'framework', version: '14.0.4', icon: '▲' },
      { name: 'Tailwind CSS', category: 'css', version: '3.4.0', icon: '🌊' },
      { name: 'TypeScript', category: 'javascript', version: '5.3.3', icon: 'TS' },
      { name: 'Cloudflare', category: 'cdn', icon: '☁️' },
      { name: 'Vercel', category: 'hosting', icon: '▲' },
      { name: 'Google Analytics', category: 'analytics', icon: '📊' },
    ],
    securityThreats: [
      {
        type: 'Missing X-Frame-Options Header',
        severity: 'medium',
        status: 'found',
        description: 'The X-Frame-Options header is not set, leaving the site vulnerable to clickjacking attacks.',
      },
      {
        type: 'Outdated jQuery',
        severity: 'medium',
        status: 'found',
        description: 'jQuery 1.12.4 is outdated and has known CVEs. Upgrade to 3.7.1+.',
      },
      {
        type: 'HTTPS Enforcement',
        severity: 'low',
        status: 'warning',
        description: 'Strict-Transport-Security header is set but with a short max-age.',
      },
      {
        type: 'Malware Detection',
        severity: 'critical',
        status: 'not-found',
        description: 'No malware signatures detected on any scanned pages.',
      },
      {
        type: 'SQL Injection',
        severity: 'critical',
        status: 'not-found',
        description: 'No SQL injection vulnerabilities detected in form endpoints.',
      },
      {
        type: 'Open Redirect',
        severity: 'high',
        status: 'not-found',
        description: 'No open redirect vulnerabilities found.',
      },
    ],
    domainInfo: {
      registrar: 'Namecheap, Inc.',
      creationDate: '2015-03-15',
      expiryDate: '2026-03-15',
      nameServers: ['dave.ns.cloudflare.com', 'sarah.ns.cloudflare.com'],
      orgName: 'Example Corp',
      country: 'US',
    },
    ports: [
      { port: 80, service: 'HTTP', state: 'open', protocol: 'tcp' },
      { port: 443, service: 'HTTPS', state: 'open', protocol: 'tcp' },
      { port: 22, service: 'SSH', state: 'filtered', protocol: 'tcp' },
      { port: 3306, service: 'MySQL', state: 'closed', protocol: 'tcp' },
      { port: 8443, service: 'HTTPS-Alt', state: 'closed', protocol: 'tcp' },
    ],
    performance: [
      { name: 'Time to First Byte', value: '245ms', grade: 'A', description: 'Server response time' },
      { name: 'First Contentful Paint', value: '1.2s', grade: 'A', description: 'Time to first content render' },
      { name: 'Largest Contentful Paint', value: '2.8s', grade: 'B', description: 'Time to largest content render' },
      { name: 'Cumulative Layout Shift', value: '0.05', grade: 'A', description: 'Visual stability score' },
      { name: 'Total Page Size', value: '1.8MB', grade: 'C', description: 'Total page weight' },
      { name: 'Requests', value: '42', grade: 'B', description: 'Total HTTP requests' },
    ],
    dnsSsl: {
      sslValid: true,
      sslIssuer: 'Cloudflare, Inc. ECC',
      sslExpiry: '2026-02-14',
      protocol: 'TLS 1.3',
      dnsRecords: [
        { type: 'A', value: '104.21.16.1', ttl: '300' },
        { type: 'AAAA', value: '2606:4700::6815:1001', ttl: '300' },
        { type: 'CNAME', value: 'proxy.example.com', ttl: '3600' },
        { type: 'MX', value: 'mail.example.com (priority 10)', ttl: '3600' },
        { type: 'TXT', value: 'v=spf1 include:_spf.google.com ~all', ttl: '3600' },
        { type: 'NS', value: 'dave.ns.cloudflare.com', ttl: '86400' },
      ],
    },
  };
}
