import type { PersonData } from './schema'
import peopleData from '../../data/people.json'

export function getAllPeople(): PersonData[] {
  return peopleData as PersonData[]
}

export function getPersonById(id: string): PersonData | undefined {
  return (peopleData as PersonData[]).find((p) => p.id === id)
}
