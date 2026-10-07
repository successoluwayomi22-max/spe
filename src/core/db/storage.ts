import type {
  ObjectEntity,
  Place,
  Device,
  EventRecord,
  RepairDiagnostic,
  ReceiptDNAData,
  Person,
} from '../../types';

// Simple fast SHA-256 equivalent for tamper-evident digital proof in client
export async function generateCryptographicHash(payload: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(payload);
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  // Fallback hash simulation
  let hash = 0;
  for (let i = 0; i < payload.length; i++) {
    hash = (hash << 5) - hash + payload.charCodeAt(i);
    hash |= 0;
  }
  return 'xrx_' + Math.abs(hash).toString(16) + 'fd8199ac2b34';
}

const STORAGE_KEYS = {
  OBJECTS: 'xerxes_objects_v1',
  PLACES: 'xerxes_places_v1',
  DEVICES: 'xerxes_devices_v1',
  EVENTS: 'xerxes_events_v1',
  REPAIRS: 'xerxes_repairs_v1',
  RECEIPTS: 'xerxes_receipts_v1',
  PERSON: 'xerxes_person_v1',
  SETTINGS: 'xerxes_settings_v1',
};

// Seed Data
const SEED_PERSON: Person = {
  id: 'usr_owner_01',
  name: 'Tunde Adeleke',
  email: 'tunde@xerxes.world',
  role: 'Facility Engineer & Asset Custodian',
  skills: ['Solar Inverter Maintenance', 'IoT Sensor Diagnostics', 'Preventive Maintenance'],
  preferences: {
    language: 'en',
    currency: 'NGN',
    theme: 'dark',
    privacyLevel: 'strict',
  },
};

const SEED_PLACES: Place[] = [
  { id: 'plc_01', name: 'Main Workshop & Lab', type: 'workshop', itemCount: 4 },
  { id: 'plc_02', name: 'Power Utility Room', type: 'facility', itemCount: 2 },
  { id: 'plc_03', name: 'Office Workstation B', type: 'room', itemCount: 3 },
  { id: 'plc_04', name: 'Service Van #4', type: 'vehicle', itemCount: 1 },
];

const SEED_DEVICES: Device[] = [
  { id: 'dev_01', name: 'Pixel Vision Sensor 8', type: 'phone_camera', status: 'online', lastSeen: 'Just now', batteryLevel: 94 },
  { id: 'dev_02', name: 'Grid Telemetry Node A1', type: 'smart_meter', status: 'online', lastSeen: '1m ago' },
  { id: 'dev_03', name: 'Vibration Acoustic Probe', type: 'diagnostic_tool', status: 'standby', lastSeen: '15m ago', batteryLevel: 82 },
];

const SEED_OBJECTS: ObjectEntity[] = [
  {
    id: 'obj_solar_5kva',
    name: 'Felicity 5kVA Hybrid Solar Inverter',
    category: 'appliances',
    brand: 'Felicity Solar',
    model: 'IVR-5048-HY',
    serialNumber: 'FLC-8842-NG-2025',
    location: 'Power Utility Room',
    placeId: 'plc_02',
    currentCondition: 'good',
    purchaseDate: '2025-04-12',
    warrantyExpiry: '2027-04-12',
    purchasePrice: 1250000,
    purchaseCurrency: 'NGN',
    cryptographicProof: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80',
    notes: 'Installed with 4x 48V Lithium-iron phosphate battery banks.',
    createdAt: '2025-04-12T10:00:00Z',
    updatedAt: '2026-09-08T14:30:00Z',
  },
  {
    id: 'obj_generator_honda',
    name: 'Honda EU30is Inverter Generator',
    category: 'equipment' as any,
    brand: 'Honda',
    model: 'EU30is Silent',
    serialNumber: 'HND-3001-JP-994',
    location: 'Main Workshop & Lab',
    placeId: 'plc_01',
    currentCondition: 'fair',
    purchaseDate: '2024-11-20',
    warrantyExpiry: '2026-11-20',
    purchasePrice: 2100000,
    purchaseCurrency: 'NGN',
    cryptographicProof: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
    notes: 'Last serviced at 180 running hours. Spark plug replaced.',
    createdAt: '2024-11-20T08:00:00Z',
    updatedAt: '2026-09-01T11:00:00Z',
  },
  {
    id: 'obj_macbook_pro',
    name: 'MacBook Pro 16" M3 Max',
    category: 'electronics',
    brand: 'Apple',
    model: 'A2991',
    serialNumber: 'C02G87LKMD6T',
    location: 'Office Workstation B',
    placeId: 'plc_03',
    currentCondition: 'excellent',
    purchaseDate: '2025-01-15',
    warrantyExpiry: '2027-01-15',
    purchasePrice: 4800000,
    purchaseCurrency: 'NGN',
    cryptographicProof: 'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
    notes: 'Primary diagnostic workstation and field terminal.',
    createdAt: '2025-01-15T12:00:00Z',
    updatedAt: '2026-09-10T09:15:00Z',
  },
  {
    id: 'obj_fluke_multimeter',
    name: 'Fluke 87V Industrial True-RMS Multimeter',
    category: 'tools',
    brand: 'Fluke',
    model: '87V',
    serialNumber: 'FLK-992140-US',
    location: 'Main Workshop & Lab',
    placeId: 'plc_01',
    currentCondition: 'excellent',
    purchaseDate: '2025-06-10',
    warrantyExpiry: '2028-06-10',
    purchasePrice: 750000,
    purchaseCurrency: 'NGN',
    cryptographicProof: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=600&auto=format&fit=crop&q=80',
    notes: 'Calibrated July 2026. NIST traceable certificate on file.',
    createdAt: '2025-06-10T14:20:00Z',
    updatedAt: '2026-07-22T16:00:00Z',
  },
];

const SEED_REPAIRS: RepairDiagnostic[] = [
  {
    id: 'rep_001',
    objectId: 'obj_generator_honda',
    objectName: 'Honda EU30is Inverter Generator',
    symptom: 'Engine hunting at idle and irregular voltage ripple under 1.5kW load',
    defectType: 'mechanical',
    severity: 'medium',
    confidence: 0.93,
    estimatedCost: { amount: 35000, currency: 'NGN' },
    safetyWarning: 'Allow engine block to cool completely. Disconnect negative battery lead and fuel shut-off valve before opening carburetor bowl.',
    stepByStepGuide: [
      'Isolate fuel petcock and remove air cleaner box assembly.',
      'Check stepper motor governor linkage for carbon grime or stickiness.',
      'Remove carburetor float bowl and clear main jet with non-abrasive brass probe and solvent.',
      'Verify fuel strainer cup is free of water droplets or rust sediments.',
      'Reassemble with new gasket and verify idle stability under eco-throttle mode.',
    ],
    toolsRequired: ['10mm Socket Wrench', 'Carburetor Cleaner Spray', 'Brass Jet Probe', 'Digital Multimeter'],
    timestamp: '2026-09-08T16:40:00Z',
    status: 'in_progress',
  },
];

const SEED_RECEIPTS: ReceiptDNAData[] = [
  {
    id: 'rcp_001',
    merchant: 'MegaPlaza Electronics & Tools Ltd, Victoria Island',
    date: '2026-08-20',
    category: 'Equipment Maintenance',
    currency: 'NGN',
    items: [
      { name: 'Fluke TL175 TwistGuard Test Leads', quantity: 1, price: 42000, category: 'Tools', warrantyEligible: true },
      { name: 'DeoxIT D5 Contact Cleaner Aerosol', quantity: 2, price: 28000, category: 'Chemicals', warrantyEligible: false },
      { name: '100A DC Circuit Breaker for Solar PV', quantity: 2, price: 65000, category: 'Solar', warrantyEligible: true },
    ],
    subtotal: 135000,
    tax: 10125,
    total: 145125,
    confidence: 0.96,
    warrantyDetected: {
      durationMonths: 24,
      itemName: '100A DC Circuit Breaker for Solar PV',
    },
    rawText: 'MEGAPLAZA ELEC LTD\nTEL: +234-1-2700000\nDATE: 20/08/2026\n1x FLUKE TEST LEADS 42,000\n2x DEOXIT D5 CLEANER 28,000\n2x DC BREAKER 100A 65,000\nSUBTOTAL: 135,000\nVAT 7.5%: 10,125\nTOTAL: NGN 145,125\nWARRANTY: 2 YEARS ON DC BREAKERS',
  },
];

const SEED_EVENTS: EventRecord[] = [
  {
    id: 'evt_init_1',
    type: 'OBJECT_SEEN',
    source: 'Pixel Vision Sensor 8',
    timestamp: '2026-09-10T16:20:00Z',
    objectId: 'obj_solar_5kva',
    placeId: 'plc_02',
    description: 'Solar Inverter status display verified: Normal 230V AC output, 0 errors.',
    confidence: 0.98,
  },
  {
    id: 'evt_init_2',
    type: 'REPAIR_DIAGNOSED',
    source: 'RepairVision Diagnostic Engine',
    timestamp: '2026-09-08T16:40:00Z',
    objectId: 'obj_generator_honda',
    placeId: 'plc_01',
    description: 'Honda Generator carburetor idle fluctuation flagged. Protocol guide generated.',
    confidence: 0.93,
  },
  {
    id: 'evt_init_3',
    type: 'RECEIPT_SCANNED',
    source: 'Receipt DNA OCR Engine',
    timestamp: '2026-08-20T14:10:00Z',
    description: 'Parsed MegaPlaza Victoria Island receipt (Total: ₦145,125). 2-year warranty tagged.',
    confidence: 0.96,
  },
];

class StorageService {
  private get<T>(key: string, fallback: T): T {
    try {
      const data = localStorage.getItem(key);
      if (!data) return fallback;
      return JSON.parse(data) as T;
    } catch (e) {
      console.warn(`[Storage] Failed to read ${key}, using fallback`, e);
      return fallback;
    }
  }

  private set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`[Storage] Failed to write ${key}`, e);
    }
  }

  // Objects
  public async getObjects(): Promise<ObjectEntity[]> {
    return this.get<ObjectEntity[]>(STORAGE_KEYS.OBJECTS, SEED_OBJECTS);
  }

  public async saveObject(object: ObjectEntity): Promise<void> {
    const list = await this.getObjects();
    const index = list.findIndex((o) => o.id === object.id);
    if (index >= 0) {
      list[index] = { ...object, updatedAt: new Date().toISOString() };
    } else {
      list.unshift(object);
    }
    this.set(STORAGE_KEYS.OBJECTS, list);
  }

  public async deleteObject(id: string): Promise<void> {
    const list = await this.getObjects();
    this.set(
      STORAGE_KEYS.OBJECTS,
      list.filter((o) => o.id !== id)
    );
  }

  // Places
  public async getPlaces(): Promise<Place[]> {
    return this.get<Place[]>(STORAGE_KEYS.PLACES, SEED_PLACES);
  }

  // Devices
  public async getDevices(): Promise<Device[]> {
    return this.get<Device[]>(STORAGE_KEYS.DEVICES, SEED_DEVICES);
  }

  // Events
  public async getEvents(): Promise<EventRecord[]> {
    return this.get<EventRecord[]>(STORAGE_KEYS.EVENTS, SEED_EVENTS);
  }

  public async addEvent(event: EventRecord): Promise<void> {
    const events = await this.getEvents();
    events.unshift(event);
    // Keep last 100 events
    this.set(STORAGE_KEYS.EVENTS, events.slice(0, 100));
  }

  // Repairs
  public async getRepairs(): Promise<RepairDiagnostic[]> {
    return this.get<RepairDiagnostic[]>(STORAGE_KEYS.REPAIRS, SEED_REPAIRS);
  }

  public async saveRepair(repair: RepairDiagnostic): Promise<void> {
    const list = await this.getRepairs();
    const index = list.findIndex((r) => r.id === repair.id);
    if (index >= 0) {
      list[index] = repair;
    } else {
      list.unshift(repair);
    }
    this.set(STORAGE_KEYS.REPAIRS, list);
  }

  // Receipts
  public async getReceipts(): Promise<ReceiptDNAData[]> {
    return this.get<ReceiptDNAData[]>(STORAGE_KEYS.RECEIPTS, SEED_RECEIPTS);
  }

  public async saveReceipt(receipt: ReceiptDNAData): Promise<void> {
    const list = await this.getReceipts();
    list.unshift(receipt);
    this.set(STORAGE_KEYS.RECEIPTS, list);
  }

  // Person & User Preferences
  public async getPerson(): Promise<Person> {
    return this.get<Person>(STORAGE_KEYS.PERSON, SEED_PERSON);
  }

  public async updatePersonPreferences(prefs: Partial<Person['preferences']>): Promise<Person> {
    const person = await this.getPerson();
    const updated = {
      ...person,
      preferences: { ...person.preferences, ...prefs },
    };
    this.set(STORAGE_KEYS.PERSON, updated);
    return updated;
  }

  // Custom API Key (for Gemini)
  public getGeminiApiKey(): string | null {
    return localStorage.getItem('xerxes_gemini_api_key') || null;
  }

  public setGeminiApiKey(key: string): void {
    if (key.trim()) {
      localStorage.setItem('xerxes_gemini_api_key', key.trim());
    } else {
      localStorage.removeItem('xerxes_gemini_api_key');
    }
  }

  // Reset to seed data
  public resetToDefaults(): void {
    localStorage.clear();
  }
}

export const db = new StorageService();
