import type { AuditEvent } from '../../types/terraguard';

type EventCallback = (event: AuditEvent) => void;

class TerraGuardEventBus {
  private listeners: EventCallback[] = [];
  private history: AuditEvent[] = [
    {
      id: 'EV-1001',
      timestamp: 'Just now',
      type: 'AUDIT_INITIATED',
      summary: 'Diaspora investor from London, UK initiated Survey Plan scan for Ibeju-Lekki parcel.',
      actorRole: 'diaspora_investor',
    },
    {
      id: 'EV-1002',
      timestamp: '2 mins ago',
      type: 'ACQUISITION_FLAGGED',
      summary: 'CRITICAL ALERT: Plot SC/2021/BK04 detected inside Lagos Coastal Highway 100m Right-of-Way.',
      actorRole: 'lead_auditor',
    },
    {
      id: 'EV-1003',
      timestamp: '14 mins ago',
      type: 'PAYMENT_CONFIRMED',
      summary: 'Payment of $69 (₦106,260) received via Stripe for Comprehensive Investor Audit Pack.',
      actorRole: 'ceo_admin',
    },
    {
      id: 'EV-1004',
      timestamp: '32 mins ago',
      type: 'CERTIFICATE_GENERATED',
      summary: 'Cryptographic SHA-256 certificate TG-SHA256-4AF8-9210 issued for Katampe Extension, Abuja.',
      actorRole: 'licensed_surveyor',
    },
  ];

  public subscribe(callback: EventCallback): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  public emit(event: Omit<AuditEvent, 'id' | 'timestamp'>): AuditEvent {
    const fullEvent: AuditEvent = {
      ...event,
      id: `EV-${Date.now().toString().slice(-4)}`,
      timestamp: 'Just now',
    };
    this.history.unshift(fullEvent);
    if (this.history.length > 50) this.history.pop();
    this.listeners.forEach((cb) => cb(fullEvent));
    return fullEvent;
  }

  public getRecentEvents(): AuditEvent[] {
    return [...this.history];
  }
}

export const eventBus = new TerraGuardEventBus();
