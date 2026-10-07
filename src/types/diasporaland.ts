// DiasporaLand AI — Master Product & Domain Types
// "Know the Risk Before You Buy."

export type UserRole = 
  | 'ceo_admin'          // Administrative / Executive oversight
  | 'lead_auditor'       // Lead Risk Auditor: cross-check approval, risk override
  | 'licensed_surveyor'  // Licensed Surveyor: coordinate math, beacon closure
  | 'diaspora_investor'  // Diaspora Investor / Buyer: case owner, report viewer
  | 'public_viewer';     // Public Preview / Guest

export type CaseLifecycleState = 
  | 'DRAFT'
  | 'DOCUMENTS_UPLOADED'
  | 'ANALYZING'
  | 'ANALYSIS_COMPLETE'
  | 'VERIFICATION_REQUIRED'
  | 'UNDER_REVIEW'
  | 'REPORT_GENERATED'
  | 'COMPLETED';

export type DocumentCategory = 
  | 'Survey Plan'
  | 'Deed of Assignment'
  | 'Certificate of Occupancy'
  | 'Governor\'s Consent'
  | 'Allocation Letter'
  | 'Official Gazette'
  | 'Excision Document'
  | 'Power of Attorney'
  | 'Contract of Sale'
  | 'Family Receipt'
  | 'Tax Clearance Certificate'
  | 'Planning & Zoning Approval'
  | 'Site Photographs'
  | 'Other Supporting Document';

export type MatchStatus = 'MATCH' | 'MISMATCH' | 'MISSING' | 'UNCERTAIN';

export type SeverityLevel = 'LOW' | 'MODERATE' | 'ELEVATED' | 'HIGH' | 'CRITICAL';

export interface ExtractedEntity {
  field: string;
  value: string;
  sourceDocId: string;
  sourceDocName: string;
  pageNumber: number;
  confidence: number; // 0 - 100
}

export interface ExtractedDocumentData {
  documentId: string;
  documentName: string;
  category: DocumentCategory;
  version: number;
  uploadDate: string;
  ocrConfidence: number;
  plotNumber?: string;
  parcelNumber?: string;
  surveyPlanNumber?: string;
  claimedOwnerName?: string;
  sellerName?: string;
  areaSqm?: number;
  locationAddress?: string;
  state?: string;
  lga?: string;
  executionDate?: string;
  registrationNumber?: string;
  issuingAuthority?: string;
  signatories?: string[];
  rawTextPreview?: string;
}

export interface CrossCheckMismatch {
  id: string;
  parameter: 'Plot Number' | 'Parcel Area' | 'Coordinates' | 'Parties / Names' | 'Dates' | 'Document References' | 'Land Use / Zoning';
  status: MatchStatus;
  severity: SeverityLevel;
  findingDescription: string;
  docA: { name: string; page: number; value: string };
  docB: { name: string; page: number; value: string };
  whyItMatters: string;
  recommendedAction: string;
}

export interface RiskFactor {
  id: string;
  title: string;
  category: 
    | 'Documentation Risk'
    | 'Ownership Risk'
    | 'Geographic Risk'
    | 'Planning/Zoning Risk'
    | 'Acquisition Risk'
    | 'Transaction Risk'
    | 'Deadline Risk'
    | 'Evidence Risk';
  severity: SeverityLevel;
  scoreImpact: number;
  description: string;
  evidence: string;
  sourceDocument: string;
  page: number;
  confidence: number;
  whyItMatters: string;
  recommendedAction: string;
}

export interface RiskCategoryBreakdown {
  category: string;
  weightPercent: number;
  score: number; // 0 - 100
  status: 'Low' | 'Moderate' | 'Elevated' | 'High' | 'Critical';
  summary: string;
}

export interface VerificationTaskItem {
  id: string;
  title: string;
  category: 'Seller' | 'Property' | 'Documents' | 'Government Authority' | 'Physical Verification' | 'Legal';
  verificationGroup: 'AI Verified' | 'User Verified' | 'Professional Review Required' | 'Official Verification Required';
  status: 'Pending' | 'In Progress' | 'Verified' | 'Flagged';
  owner: string;
  evidenceRequired: string;
  notes: string;
  dueDate?: string;
  assignedProfessional?: string;
}

export interface EvidenceVaultFile {
  id: string;
  name: string;
  category: DocumentCategory;
  fileSizeMb: number;
  fileType: string;
  uploadDate: string;
  version: number;
  uploaderName: string;
  accessLevel: 'Owner Only' | 'Case Team' | 'Auditor/Surveyor' | 'Public Shared';
  sha256Seal: string;
  verificationStatus: 'Pending OCR' | 'Extracted' | 'Cross-Checked' | 'Flagged Discrepancy' | 'Verified Authenticated';
  downloadUrl?: string;
}

export interface PropertyCase {
  id: string;
  caseNumber: string; // e.g. "DL-2026-089"
  name: string;
  address: string;
  state: string;
  lga: string;
  country: string;
  propertyType: 'Residential Land' | 'Commercial Land' | 'Agricultural Estate' | 'Mixed Use';
  purchasePrice: number;
  currency: string;
  sellerName: string;
  sellerPhone: string;
  agentName: string;
  coordinates: {
    lat: number;
    lng: number;
    formattedDMS?: string;
    coordinateStatus: 'Valid' | 'Potential Issue' | 'Invalid' | 'Requires Verification';
  };
  lifecycle: CaseLifecycleState;
  riskIndicatorScore: number; // 0 - 100
  riskLevel: SeverityLevel;
  evidenceCompletenessPercent: number; // 0 - 100
  documentsCount: number;
  lastUpdated: string;
  assignedTeam: string[];
  documents: ExtractedDocumentData[];
  crossChecks: CrossCheckMismatch[];
  risks: RiskFactor[];
  riskCategories: RiskCategoryBreakdown[];
  verificationTasks: VerificationTaskItem[];
  vaultFiles: EvidenceVaultFile[];
}

export interface DueDiligenceReport {
  reportId: string;
  caseNumber: string;
  generatedDate: string;
  reportVersion: string;
  executiveSummary: string;
  keyFindings: string[];
  riskIndicatorScore: number;
  riskLevel: SeverityLevel;
  evidenceCompleteness: number;
  questionsForSeller: string[];
  questionsForSurveyor: string[];
  questionsForLawyer: string[];
  disclaimer: string;
}

export interface InvestigationMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  finding?: string;
  evidenceDoc?: string;
  evidencePage?: number;
  confidence?: 'High' | 'Moderate' | 'Caution';
  recommendedAction?: string;
}
