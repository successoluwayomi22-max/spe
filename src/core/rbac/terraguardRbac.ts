import type { UserRole, RolePermission } from '../../types/terraguard';

export interface RoleMetadata {
  role: UserRole;
  title: string;
  badge: string;
  color: string;
  icon: string;
  description: string;
  permissions: RolePermission;
}

export const ROLE_DEFINITIONS: Record<UserRole, RoleMetadata> = {
  ceo_admin: {
    role: 'ceo_admin',
    title: 'Chief Executive Officer',
    badge: 'CEO / FOUNDER',
    color: '#8B5CF6', // Royal violet
    icon: 'ShieldAlert',
    description: 'Full administrative authority. Real-time revenue analytics, pricing controls, profit margin metrics, and security audit logs.',
    permissions: {
      canViewRevenue: true,
      canEditPricing: true,
      canOverrideRiskScore: true,
      canVerifyBeacons: true,
      canDownloadPdf: true,
      canAccessApiKeys: true,
      canViewFullAuditDetails: true,
    },
  },
  lead_auditor: {
    role: 'lead_auditor',
    title: 'Chief Legal & Risk Auditor',
    badge: 'LEAD AUDITOR',
    color: '#3B82F6', // Cobalt blue
    icon: 'FileSearch',
    description: 'Oversees gazette acquisition matching, title clause red-flag reviews, and compliance stamp approvals.',
    permissions: {
      canViewRevenue: false,
      canEditPricing: false,
      canOverrideRiskScore: true,
      canVerifyBeacons: true,
      canDownloadPdf: true,
      canAccessApiKeys: false,
      canViewFullAuditDetails: true,
    },
  },
  licensed_surveyor: {
    role: 'licensed_surveyor',
    title: 'SURCON Licensed Surveyor',
    badge: 'LICENSED SURVEYOR',
    color: '#10B981', // Emerald green
    icon: 'Compass',
    description: 'Inspects beacon coordinate closure errors, GPS bearing tolerances, and official surveyor seal validation.',
    permissions: {
      canViewRevenue: false,
      canEditPricing: false,
      canOverrideRiskScore: false,
      canVerifyBeacons: true,
      canDownloadPdf: true,
      canAccessApiKeys: false,
      canViewFullAuditDetails: true,
    },
  },
  diaspora_investor: {
    role: 'diaspora_investor',
    title: 'Diaspora Property Investor',
    badge: 'DIASPORA INVESTOR',
    color: '#F59E0B', // Amber gold
    icon: 'Building2',
    description: 'Client account managing property due-diligence scans, unlocked audit certificates, and scam warning alerts.',
    permissions: {
      canViewRevenue: false,
      canEditPricing: false,
      canOverrideRiskScore: false,
      canVerifyBeacons: false,
      canDownloadPdf: true,
      canAccessApiKeys: false,
      canViewFullAuditDetails: true,
    },
  },
  public_viewer: {
    role: 'public_viewer',
    title: 'Public Property Buyer',
    badge: 'PUBLIC VIEWER',
    color: '#94A3B8', // Slate grey
    icon: 'Eye',
    description: 'General public visitor. Accesses free teaser scans, scam loss calculator, and demo property reports.',
    permissions: {
      canViewRevenue: false,
      canEditPricing: false,
      canOverrideRiskScore: false,
      canVerifyBeacons: false,
      canDownloadPdf: false,
      canAccessApiKeys: false,
      canViewFullAuditDetails: false,
    },
  },
};
