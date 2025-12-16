import { Session, Proof, STORAGE_KEYS } from '../types';

export const saveSession = (session: Session) => {
  localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
};

export const getSession = (): Session | null => {
  const data = localStorage.getItem(STORAGE_KEYS.SESSION);
  return data ? JSON.parse(data) : null;
};

export const clearSession = () => {
  localStorage.removeItem(STORAGE_KEYS.SESSION);
};

export const saveProof = (proof: Proof) => {
  const proofs = getProofs();
  proofs.unshift(proof); // Add to beginning
  localStorage.setItem(STORAGE_KEYS.PROOFS, JSON.stringify(proofs));
};

export const getProofs = (): Proof[] => {
  const data = localStorage.getItem(STORAGE_KEYS.PROOFS);
  return data ? JSON.parse(data) : [];
};

export const getProof = (id: string): Proof | undefined => {
  const proofs = getProofs();
  return proofs.find((p) => p.id === id);
};