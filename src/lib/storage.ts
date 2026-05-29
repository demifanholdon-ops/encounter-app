import type { UserContext, EncounterCard, PersonData } from './schema'

const USER_KEY = 'encounter:user'
const SCANNED_KEY = 'encounter:scanned'

export interface ScannedRecord {
  person: PersonData
  card: EncounterCard
  scannedAt: number
}

function safeGetItem(key: string): string | null {
  try {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function safeSetItem(key: string, value: string): void {
  try {
    if (typeof window === 'undefined') return
    localStorage.setItem(key, value)
  } catch {
    // Safari private mode or storage full — silently fail
  }
}

export function getUserContext(): UserContext | null {
  const raw = safeGetItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function saveUserContext(ctx: UserContext): void {
  safeSetItem(USER_KEY, JSON.stringify(ctx))
}

export function hasUserContext(): boolean {
  return getUserContext() !== null
}

export function getScannedPeople(): Record<string, ScannedRecord> {
  const raw = safeGetItem(SCANNED_KEY)
  if (!raw) return {}
  try {
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

export function addScannedPerson(id: string, person: PersonData, card: EncounterCard): void {
  const all = getScannedPeople()
  all[id] = { person, card, scannedAt: Date.now() }
  safeSetItem(SCANNED_KEY, JSON.stringify(all))
}

export function isPersonScanned(id: string): boolean {
  return id in getScannedPeople()
}
