'use client'

import Link from 'next/link'
import type { PersonData, EncounterCard } from '@/lib/schema'

function LevelBadge({ level }: { level: string }) {
  const cls = level === 'S' ? 'level-S' : level === 'A' ? 'level-A' : 'level-B'
  return (
    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-black flex-shrink-0 ${cls}`}>
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
    { level: 'S', label: 'S 级 · 强互补', color: 'text-yellow-400', data: grouped.S },
    { level: 'A', label: 'A 级 · 高价值', color: 'text-purple-400', data: grouped.A },
    { level: 'B', label: 'B 级 · 其他', color: 'text-slate-400', data: grouped.B },
  ]

  return (
    <div className="space-y-6">
      {groups.map((group) => {
        if (group.data.length === 0) return null
        return (
          <section key={group.level}>
            <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${group.color}`}>
              {group.label} ({group.data.length})
            </h3>
            <div className="space-y-2">
              {group.data.map((item) => (
                <Link
                  key={item.person.id}
                  href={`/encounter/${item.person.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl glass-surface glass-hover transition-all block"
                >
                  {/* 3D 数字头像 */}
                  <img
                    src={`https://api.dicebear.com/9.x/thumbs/png?seed=${item.person.id}&size=80&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
                    alt={item.person.name}
                    className="flex-shrink-0 w-11 h-11 rounded-full border-2 border-slate-600/50"
                  />

                  {/* 内容区 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white truncate">{item.person.name}</span>
                      <span className="text-[10px] text-slate-500 truncate">{item.person.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      <span className="text-xs font-bold text-slate-300">{item.card.totalScore.toFixed(1)}</span>
                      <LevelBadge level={item.card.level} />
                      {item.person.skills.slice(0, 3).map((skill) => (
                        <span key={skill} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/40">
                          {skill}
                        </span>
                      ))}
                      {item.card.dimensions.strategic.isReserve && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                          战略储备
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 箭头 */}
                  <div className="flex-shrink-0 text-slate-600">
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
