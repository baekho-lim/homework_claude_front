export interface Goal {
  title: string;
}

export interface Session {
  goal: string;
  durationMinutes: number;
  remainingSeconds: number;
  status: 'running' | 'paused';
  startedAt: number; // Timestamp when session was created
  lastTick: number; // Timestamp of the last update to handle backgrounding
}

export interface Proof {
  id: string;
  goal: string;
  date: string; // ISO String
  durationMinutes: number;
  reflection?: string;
  templateId?: 'A' | 'B';
  status?: 'success' | 'abandoned';
}

export const STORAGE_KEYS = {
  SESSION: 'hw_session',
  PROOFS: 'hw_proofs',
};