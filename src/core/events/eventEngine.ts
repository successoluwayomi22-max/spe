// XERXES Structured Event Engine
import type { EventRecord, EventType } from '../../types';
import { db } from '../db/storage';

type EventListener = (event: EventRecord) => void;

class EventEngine {
  private listeners: Map<EventType | '*', Set<EventListener>> = new Map();

  constructor() {
    this.listeners.set('*', new Set());
  }

  public subscribe(type: EventType | '*', callback: EventListener): () => void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)!.add(callback);

    return () => {
      this.listeners.get(type)?.delete(callback);
    };
  }

  public async emit(params: {
    type: EventType;
    source: string;
    description: string;
    confidence: number;
    objectId?: string;
    placeId?: string;
    metadata?: Record<string, any>;
  }): Promise<EventRecord> {
    const event: EventRecord = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      type: params.type,
      source: params.source,
      timestamp: new Date().toISOString(),
      objectId: params.objectId,
      placeId: params.placeId,
      description: params.description,
      confidence: Math.max(0, Math.min(1, params.confidence)),
      metadata: params.metadata,
    };

    // Persist event in database
    await db.addEvent(event);

    // Trigger specific listeners
    const specific = this.listeners.get(params.type);
    if (specific) {
      specific.forEach((cb) => {
        try {
          cb(event);
        } catch (err) {
          console.error('[EventEngine] Error in listener callback', err);
        }
      });
    }

    // Trigger wildcard listeners
    const wildcards = this.listeners.get('*');
    if (wildcards) {
      wildcards.forEach((cb) => {
        try {
          cb(event);
        } catch (err) {
          console.error('[EventEngine] Error in wildcard callback', err);
        }
      });
    }

    return event;
  }
}

export const eventEngine = new EventEngine();
