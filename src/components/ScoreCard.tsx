'use client'

import type { EncounterCard } from '@/lib/schema'

interface ScoreCardProps {
  card: EncounterCard
  personName?: string
  personRole?: string
  personAvatar?: string
}

function LevelBadge({ level }: { level: string }) {
  const cls = level === 'S' ? 'level-S' : level === 'A' ? 'level-A' : 'level-B'
  return (
    <span className={`inline-flex items-center justify-center w-9 h-9 rounded-[14px] text-sm font-bold ${cls}`}>
      {level}
    </span>
  )
}

function StatBar({ label, score, reason }: { label: string; score: number; reason: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <span className="text-[11px] font-medium text-[#9A9A9A] uppercase tracking-wider">{label}</span>
        <span className="text-lg font-bold text-[#1C1C1E]">{score.toFixed(1)}</span>
      </div>
      <div className="h-1.5 rounded-full bg-black/[0.04] overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-400 to-violet-400 transition-all duration-700"
          style={{ width: `${score * 10}%` }}
        />
      </div>
      <p className="text-[11px] text-[#9A9A9A] leading-relaxed">{reason}</p>
    </div>
  )
}

export function ScoreCard({ card, personName, personRole, personAvatar }: ScoreCardProps) {
  const { totalScore, level, dimensions, credibility, tags, card: body } = card

  return (
    <div className="w-full max-w-md mx-auto card-lg overflow-hidden">
      {/* === Person header === */}
      {personName && (
        <div className="px-6 pt-5 pb-3 flex items-center gap-3">
          <img
            src={personAvatar || ''}
            alt={personName}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-white/60 flex-shrink-0"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none'
            }}
          />
          <div className="min-w-0">
            <h3 className="text-base font-bold text-[#1C1C1E] truncate">{personName}</h3>
            {personRole && (
              <p className="text-xs text-[#9A9A9A] truncate">{personRole}</p>
            )}
          </div>
        </div>
      )}

      {/* Score header */}
      <div className="px-6 pt-1 pb-3">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] font-medium text-[#9A9A9A] uppercase tracking-widest">匹配指数</p>
            <span className="text-[56px] font-extrabold text-[#1C1C1E] tabular-nums leading-none">
              {totalScore.toFixed(1)}
            </span>
          </div>
          <LevelBadge level={level} />
        </div>
      </div>

      {/* Tags */}
      <div className="px-6 pb-4 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>

      {/* Dimensions — tint-blue background */}
      <div className="mx-5 mb-3 p-4 rounded-[20px] tint-blue space-y-4">
        <StatBar label="合作匹配度" score={dimensions.collaboration.score} reason={dimensions.collaboration.reason} />
        <StatBar label="认知获取" score={dimensions.cognitive.score} reason={dimensions.cognitive.reason} />
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-medium text-[#9A9A9A] uppercase tracking-wider">战略储备</span>
            {dimensions.strategic.isReserve && (
              <span className="badge-reserve">战略储备</span>
            )}
          </div>
          <p className="text-[11px] text-[#9A9A9A] leading-relaxed">{dimensions.strategic.reason}</p>
        </div>
      </div>

      {/* Credibility */}
      <div className="mx-5 mb-3 flex items-center gap-2 px-3 py-2 rounded-[20px] bg-black/[0.02]">
        <span className="text-[10px] font-medium text-[#9A9A9A] uppercase">可信度</span>
        <span className={credibility.hasPublicWork ? 'text-emerald-500' : 'text-amber-400'}>
          {credibility.hasPublicWork ? '●' : '○'}
        </span>
        <span className="text-[11px] text-[#4A4A4A]">{credibility.note}</span>
      </div>

      {/* Three sections — each in a tinted card */}
      <div className="px-5 pb-5 space-y-3">
        {/* Why TA — tint-purple */}
        <div className="tint-purple rounded-[20px] p-3.5">
          <h4 className="text-xs font-semibold text-violet-500 uppercase tracking-wider mb-1.5">
            为什么是 TA
          </h4>
          <p className="text-sm text-[#4A4A4A] leading-relaxed">{body.whyTa}</p>
        </div>

        {/* Collision — tint-blue */}
        <div className="tint-blue rounded-[20px] p-3.5">
          <h4 className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-1.5">
            你们能碰撞什么
          </h4>
          <p className="text-sm text-[#4A4A4A] leading-relaxed">{body.collision}</p>
        </div>

        {/* Opening Questions — tint-rose */}
        <div className="tint-rose rounded-[20px] p-3.5">
          <h4 className="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-2">
            开口问这 3 句
          </h4>
          <ul className="space-y-2">
            {body.openingQuestions.map((q, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-[#4A4A4A]">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-400/15 text-rose-500 text-[10px] font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                {q}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
