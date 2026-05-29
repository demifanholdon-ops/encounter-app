import type { UserContext, EncounterCard, PersonData } from './schema'

const USER_KEY = 'encounter:user'
const SCANNED_KEY = 'encounter:scanned'

export interface ScannedRecord {
  person: PersonData
  card: EncounterCard
  scannedAt: number
}

export function getUserContext(): UserContext | null {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function saveUserContext(ctx: UserContext): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(USER_KEY, JSON.stringify(ctx))
}

export function hasUserContext(): boolean {
  return getUserContext() !== null
}

export function getScannedPeople(): Record<string, ScannedRecord> {
  if (typeof window === 'undefined') return {}
  const raw = localStorage.getItem(SCANNED_KEY)
  if (!raw) return {}
  try {
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

export function addScannedPerson(id: string, person: PersonData, card: EncounterCard): void {
  if (typeof window === 'undefined') return
  const all = getScannedPeople()
  all[id] = { person, card, scannedAt: Date.now() }
  localStorage.setItem(SCANNED_KEY, JSON.stringify(all))
}

export function isPersonScanned(id: string): boolean {
  return id in getScannedPeople()
}
