'use client'

import Link from 'next/link'
import type { PersonData, EncounterCard } from '@/lib/schema'

function LevelBadge({ level }: { level: string }) {
  const cls = level === 'S' ? 'level-S' : level === 'A' ? 'level-A' : 'level-B'
  return (
    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-[10px] text-[10px] font-bold flex-shrink-0 ${cls}`}>
      {level}
    </span>
  )
}

function LevelDot({ level }: { level: string }) {
  const bg = level === 'S' ? 'bg-[#E0A95E]' : level === 'A' ? 'bg-[#8B7CF6]' : 'bg-[#9CA3AF]'
  return <span className={`inline-block w-2 h-2 rounded-full ${bg} mr-1.5`} />
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
    { level: 'S', label: 'S 级 · 强互补', color: 'text-[#E0A95E]', data: grouped.S },
    { level: 'A', label: 'A 级 · 高价值', color: 'text-[#8B7CF6]', data: grouped.A },
    { level: 'B', label: 'B 级 · 其他', color: 'text-[#9A9A9A]', data: grouped.B },
  ]

  return (
    <div className="space-y-8 pb-20">
      {groups.map((group) => {
        if (group.data.length === 0) return null
        return (
          <section key={group.level}>
            <h3 className={`text-sm font-semibold uppercase tracking-wider mb-3.5 px-1 flex items-center ${group.color}`}>
              <LevelDot level={group.level} />
              {group.label} · {group.data.length}
            </h3>
            <div className="space-y-3">
              {group.data.map((item) => (
                <Link
                  key={item.person.id}
                  href={`/encounter/${item.person.id}`}
                  className="flex items-center gap-3 p-3.5 card-sm card-sm-hover"
                >
                  <img
                    src={item.person.avatar || `https://api.dicebear.com/9.x/thumbs/png?seed=${item.person.id}&size=80&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
                    alt={item.person.name}
                    className="flex-shrink-0 w-11 h-11 rounded-full object-cover ring-2 ring-white/50"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#1C1C1E] truncate">{item.person.name}</span>
                      <span className="text-[10px] text-[#9A9A9A] truncate">{item.person.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      <span className="text-xs font-bold text-[#4A4A4A]">{item.card.totalScore.toFixed(1)}</span>
                      <LevelBadge level={item.card.level} />
                      {item.person.skills.slice(0, 3).map((skill) => (
                        <span key={skill} className="text-[10px] px-1.5 py-0.5 rounded-[12px] bg-black/[0.04] text-[#9A9A9A]">
                          {skill}
                        </span>
                      ))}
                      {item.card.dimensions.strategic.isReserve && (
                        <span className="badge-reserve">战略储备</span>
                      )}
                    </div>
                  </div>

                  <div className="flex-shrink-0 text-[#C7C7CC]">
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
