// XERXES Core Platform Types

export type LanguageCode = 'en' | 'pcm' | 'yo' | 'ha' | 'ig';
export type CurrencyCode = 'NGN' | 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD';
export type ThemeMode = 'dark' | 'light' | 'system';

export type ActiveTab = 'home' | 'scanner' | 'passport' | 'repair' | 'receipt' | 'memory' | 'automation' | 'power' | 'architecture';

// Five Fundamental Entities
export interface Person {
  id: string;
  name: string;
  email: string;
  role: string;
  skills: string[];
  preferences: {
    language: LanguageCode;
    currency: CurrencyCode;
    theme: ThemeMode;
    privacyLevel: 'strict' | 'standard';
  };
}

export interface ObjectEntity {
  id: string;
  name: string;
  category: 'electronics' | 'tools' | 'appliances' | 'vehicles' | 'documents' | 'furniture' | 'other';
  brand?: string;
  model?: string;
  serialNumber?: string;
  location: string;
  placeId: string;
  currentCondition: 'excellent' | 'good' | 'fair' | 'damaged' | 'in_repair';
  purchaseDate?: string;
  warrantyExpiry?: string;
  purchasePrice?: number;
  purchaseCurrency?: CurrencyCode;
  cryptographicProof: string; // SHA-256 seal
  imageUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Place {
  id: string;
  name: string;
  type: 'home' | 'room' | 'office' | 'workshop' | 'facility' | 'vehicle';
  parentPlaceId?: string;
  address?: string;
  itemCount: number;
}

export interface Device {
  id: string;
  name: string;
  type: 'phone_camera' | 'iot_sensor' | 'smart_meter' | 'wearable' | 'diagnostic_tool';
  status: 'online' | 'standby' | 'offline';
  lastSeen: string;
  batteryLevel?: number;
}

export type EventType =
  | 'OBJECT_SEEN'
  | 'OBJECT_MOVED'
  | 'OBJECT_REGISTERED'
  | 'RECEIPT_SCANNED'
  | 'REPAIR_DIAGNOSED'
  | 'REPAIR_COMPLETED'
  | 'WARRANTY_LINKED'
  | 'POWER_ANOMALY'
  | 'WATER_ANOMALY'
  | 'AI_MEMORY_QUERIED'
  | 'RULE_TRIGGERED'
  | 'DEVICE_COMMAND';

export interface EventRecord {
  id: string;
  type: EventType;
  source: string;
  timestamp: string;
  objectId?: string;
  placeId?: string;
  description: string;
  confidence: number;
  metadata?: Record<string, any>;
}

// Module Specific Types
export interface DetectedBoundingBox {
  id: string;
  label: string;
  category: string;
  confidence: number;
  x: number; // percentage 0 - 100
  y: number;
  width: number;
  height: number;
  suggestedAction?: string;
  extractedText?: string;
}

export interface ScanAnalysisResult {
  id: string;
  timestamp: string;
  primaryObject: string;
  category: string;
  confidence: number;
  summary: string;
  detectedFeatures: string[];
  boundingBoxes: DetectedBoundingBox[];
  estimatedDimensions?: string;
  suggestedModule: 'passport' | 'repair' | 'receipt' | 'memory';
  imageUrl: string;
}

export interface RepairDiagnostic {
  id: string;
  objectId?: string;
  objectName: string;
  symptom: string;
  defectType: 'mechanical' | 'electrical' | 'wear_and_tear' | 'thermal' | 'structural';
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  estimatedCost: {
    amount: number;
    currency: CurrencyCode;
  };
  safetyWarning: string;
  stepByStepGuide: string[];
  toolsRequired: string[];
  timestamp: string;
  status: 'pending' | 'in_progress' | 'resolved';
}

export interface ReceiptItem {
  name: string;
  quantity: number;
  price: number;
  category: string;
  warrantyEligible: boolean;
}

export interface ReceiptDNAData {
  id: string;
  merchant: string;
  date: string;
  category: string;
  currency: CurrencyCode;
  items: ReceiptItem[];
  subtotal: number;
  tax: number;
  total: number;
  confidence: number;
  warrantyDetected?: {
    durationMonths: number;
    itemName: string;
  };
  rawText?: string;
}

export interface MemorySearchResult {
  id: string;
  type: 'object' | 'place' | 'receipt' | 'repair' | 'event';
  title: string;
  snippet: string;
  confidence: number;
  timestamp: string;
  entityId: string;
  badge: string;
}
