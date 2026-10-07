// Cryptographic tamper-evident hash generator for TerraGuard certificates

export async function generateSha256Seal(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const buffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}

export function generateSyncHash(propertyId: string, timestamp: string, score: number): string {
  // Synchronous pseudo-hash for rapid mock/preview sealing
  const raw = `TERRAGUARD:${propertyId}:${timestamp}:${score}:SURCON_VERIFIED`;
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    hash = (hash << 5) - hash + raw.charCodeAt(i);
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return `TG-SHA256-${hex.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
}
