'use client'

import Link from 'next/link'
import type { PersonData, EncounterCard } from '@/lib/schema'

function LevelBadge({ level }: { level: string }) {
  const cls =
    level === 'S'
      ? 'bg-amber-500 text-white'
      : level === 'A'
        ? 'bg-violet-500 text-white'
        : 'bg-slate-400 text-white'
  return (
    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-lg text-[10px] font-bold flex-shrink-0 ${cls}`}>
      {level}
    </span>
  )
}

export interface PeopleListItem {
  person: PersonData
  card: EncounterCard
}

export function PeopleList({ items }: { items: PeopleListItem[] }) {
  const grouped = {
    S: items.filter((i) => i.card.level === 'S'),
    A: items.filter((i) => i.card.level === 'A'),
    B: items.filter((i) => i.card.level === 'B'),
  }

  const groups = [
    { level: 'S', label: 'S 级 · 强互补', color: 'text-amber-500', data: grouped.S },
    { level: 'A', label: 'A 级 · 高价值', color: 'text-violet-500', data: grouped.A },
    { level: 'B', label: 'B 级 · 其他', color: 'text-[#aeaeb2]', data: grouped.B },
  ]

  return (
    <div className="space-y-6">
      {groups.map((group) => {
        if (group.data.length === 0) return null
        return (
          <section key={group.level}>
            <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 px-1 ${group.color}`}>
              {group.label} · {group.data.length}
            </h3>
            <div className="space-y-2">
              {group.data.map((item) => (
                <Link
                  key={item.person.id}
                  href={`/encounter/${item.person.id}`}
                  className="flex items-center gap-3 p-3.5 rounded-[18px] card-surface card-hover"
                >
                  {/* Avatar */}
                  <img
                    src={item.person.avatar || `https://api.dicebear.com/9.x/thumbs/png?seed=${item.person.id}&size=80&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
                    alt={item.person.name}
                    className="flex-shrink-0 w-11 h-11 rounded-full object-cover ring-2 ring-[#f0f0f0]"
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#1d1d1f] truncate">{item.person.name}</span>
                      <span className="text-[10px] text-[#aeaeb2] truncate">{item.person.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      <span className="text-xs font-bold text-[#6e6e73]">{item.card.totalScore.toFixed(1)}</span>
                      <LevelBadge level={item.card.level} />
                      {item.person.skills.slice(0, 3).map((skill) => (
                        <span key={skill} className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#f5f3f0] text-[#aeaeb2]">
                          {skill}
                        </span>
                      ))}
                      {item.card.dimensions.strategic.isReserve && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-600 border border-amber-200">
                          战略储备
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 text-[#d1d1d6]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
