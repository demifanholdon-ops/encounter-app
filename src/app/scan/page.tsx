'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { PeopleList, type PeopleListItem } from '@/components/PeopleList'
import { getScannedPeople } from '@/lib/storage'
import type { PersonData, EncounterCard } from '@/lib/schema'

// Static import of preset people — their precomputedCard is embedded
import peopleJson from '../../../data/people.json'

type PersonWithCard = PersonData & { precomputedCard?: EncounterCard }

export default function ScanPage() {
  const [scanned, setScanned] = useState<ReturnType<typeof getScannedPeople>>({})

  useEffect(() => {
    setScanned(getScannedPeople())
  }, [])

  const merged = useMemo(() => {
    const presetItems: PeopleListItem[] = (peopleJson as PersonWithCard[]).map((p) => ({
      person: p,
      card: p.precomputedCard!,
    }))

    // Override precomputed cards with scanned results where available
    for (const id of Object.keys(scanned)) {
      const existing = presetItems.findIndex((pi) => pi.person.id === id)
      if (existing >= 0) {
        presetItems[existing] = { person: presetItems[existing].person, card: scanned[id].card }
      } else {
        presetItems.push({ person: scanned[id].person, card: scanned[id].card })
      }
    }

    // Sort by totalScore descending
    return presetItems.sort((a, b) => b.card.totalScore - a.card.totalScore)
  }, [scanned])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">遇见的人</h1>
            <p className="text-xs text-slate-500">{merged.length} 人 · 按匹配分排序</p>
          </div>
          <Link
            href="/"
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors border border-slate-700/50"
          >
            我的诉求
          </Link>
        </div>

        <PeopleList items={merged} />
      </div>
    </div>
  )
}
