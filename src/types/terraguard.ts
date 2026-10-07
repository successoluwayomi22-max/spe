// TerraGuard AI — Enterprise Land Due-Diligence & Fraud Auditor Types

export type UserRole = 
  | 'ceo_admin'          // CEO / Founder: Revenue analytics, pricing, global logs
  | 'lead_auditor'       // Lead Risk Auditor: Gazette matching, risk overrides
  | 'licensed_surveyor'  // Licensed Surveyor: Beacon closure math, SURCON verification
  | 'diaspora_investor'  // Diaspora Investor: Unlocked reports, portfolio, scam alerts
  | 'public_viewer';     // Public Viewer: Free preview, scam calculator, sample audits

export type CurrencyCode = 'USD' | 'GBP' | 'EUR' | 'CAD' | 'NGN' | 'AED' | 'CNY' | 'CHF';
export type LanguageCode = 'en' | 'fr' | 'es' | 'de' | 'ar' | 'zh' | 'pcm';

export interface ExchangeRateInfo {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateToUSD: number; // 1 USD = rate units of currency
  change24h: number; // percentage change in 24 hours e.g. +0.42 or -1.15
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization?: string;
  surconLicense?: string;
  sessionToken: string;
  lastLogin: string;
  twoFactorEnabled: boolean;
}

export interface GazetteRecord {
  id: string;
  noticeNumber: string;
  state: string;
  lga: string;
  title: string;
  purpose: string;
  gazetteDate: string;
  status: 'Committed' | 'Excision Revoked' | 'Highway Right-of-Way' | 'Forestry Reserve';
  boundaryZone: string;
}

export interface BeaconPoint {
  id: string; // e.g. "SC/2021/BK01"
  easting: number;
  northing: number;
  lat: number;
  lng: number;
}

export type AcquisitionStatus = 
  | 'Free / Gazetted Excision'
  | 'Committed Government Acquisition'
  | 'Coastal Highway / Pipeline Right-of-Way'
  | 'Agricultural Green Belt Reserve'
  | 'Under Active Litigation';

export type RiskLevel = 'safe' | 'caution' | 'high_risk' | 'critical_fraud';

export interface RiskFactor {
  id: string;
  code: string; // e.g. "GOV-ACQ-01"
  title: string;
  category: 'acquisition' | 'boundary_math' | 'title_chain' | 'surveyor_license' | 'topography_flood';
  severity: 'safe' | 'warning' | 'critical';
  scoreImpact: number; // e.g. -35
  description: string;
  evidence: string;
  legalRecommendation: string;
}

export interface PropertyAuditRecord {
  id: string;
  propertyTitle: string;
  location: {
    address: string;
    state: string;
    lga: string;
    country: string;
  };
  surveyPlanNumber: string;
  surveyorName: string;
  surveyorRegNumber: string;
  surveyDate: string;
  claimedTitleType: 'Governor Consent' | 'C of O' | 'Gazetted Excision' | 'Deed of Assignment' | 'Family Receipt';
  beacons: BeaconPoint[];
  closureErrorMetres: number;
  closureRatio: string; // e.g. "1:14,200" (acceptable > 1:5,000)
  isClosureValid: boolean;
  areaSqm: number;
  estimatedMarketValueUSD: number;
  acquisitionStatus: AcquisitionStatus;
  overallTrustScore: number; // 0 - 100
  riskLevel: RiskLevel;
  riskFactors: RiskFactor[];
  cryptographicHash: string; // SHA-256 seal
  isUnlocked: boolean; // paywall state
  scannedAt: string;
  verifiedBy?: string;
  notes?: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  type: 'AUDIT_INITIATED' | 'BEACONS_EXTRACTED' | 'CLOSURE_CALCULATED' | 'ACQUISITION_FLAGGED' | 'PAYMENT_CONFIRMED' | 'CERTIFICATE_GENERATED';
  summary: string;
  actorRole: UserRole;
  propertyId?: string;
  metadata?: Record<string, any>;
}

export interface PaymentTransaction {
  id: string;
  auditId: string;
  clientName: string;
  clientEmail: string;
  clientLocation: string; // e.g. "London, UK", "Houston, TX"
  amountUSD: number;
  currency: CurrencyCode;
  localAmount: number;
  tier: 'Quick Audit' | 'Investor Comprehensive' | 'Enterprise Surveyor Pack';
  gateway: 'Stripe' | 'Paystack';
  status: 'completed' | 'processing';
  date: string;
}

export interface RolePermission {
  canViewRevenue: boolean;
  canEditPricing: boolean;
  canOverrideRiskScore: boolean;
  canVerifyBeacons: boolean;
  canDownloadPdf: boolean;
  canAccessApiKeys: boolean;
  canViewFullAuditDetails: boolean;
}
