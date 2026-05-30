'use client'

import type { EncounterCard } from '@/lib/schema'

function LevelBadge({ level }: { level: string }) {
  const cls =
    level === 'S'
      ? 'bg-amber-500 text-white'
      : level === 'A'
        ? 'bg-violet-500 text-white'
        : 'bg-slate-400 text-white'
  return (
    <span className={`inline-flex items-center justify-center w-9 h-9 rounded-xl text-sm font-bold ${cls}`}>
      {level}
    </span>
  )
}

function StatBar({ label, score, reason }: { label: string; score: number; reason: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-[11px] font-medium text-[#aeaeb2] uppercase tracking-wider">{label}</span>
        <span className="text-sm font-semibold text-[#1d1d1f]">{score.toFixed(1)}</span>
      </div>
      <div className="h-1 rounded-full bg-[#f0f0f0] overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-400 to-violet-400 transition-all duration-700"
          style={{ width: `${score * 10}%` }}
        />
      </div>
      <p className="text-[11px] text-[#aeaeb2] leading-relaxed">{reason}</p>
    </div>
  )
}

export function ScoreCard({ card }: { card: EncounterCard }) {
  const { totalScore, level, dimensions, credibility, tags, card: body } = card

  return (
    <div className="w-full max-w-md mx-auto card-surface overflow-hidden">
      {/* Header: Total Score + Level */}
      <div className="px-6 pt-6 pb-3">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] font-medium text-[#aeaeb2] uppercase tracking-widest">匹配指数</p>
            <div className="flex items-baseline gap-0.5 mt-0.5">
              <span className="text-[56px] font-extrabold text-[#1d1d1f] tabular-nums leading-none">
                {totalScore.toFixed(1)}
              </span>
            </div>
          </div>
          <LevelBadge level={level} />
        </div>
      </div>

      {/* Tags */}
      <div className="px-6 pb-4 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-[#f5f3f0] text-[#6e6e73]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Dimensions */}
      <div className="px-6 pb-4 space-y-4">
        <StatBar label="合作匹配度" score={dimensions.collaboration.score} reason={dimensions.collaboration.reason} />
        <StatBar label="认知获取" score={dimensions.cognitive.score} reason={dimensions.cognitive.reason} />
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-medium text-[#aeaeb2] uppercase tracking-wider">战略储备</span>
            {dimensions.strategic.isReserve && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-amber-50 text-amber-600 border border-amber-200">
                战略储备
              </span>
            )}
          </div>
          <p className="text-[11px] text-[#aeaeb2] leading-relaxed">{dimensions.strategic.reason}</p>
        </div>
      </div>

      {/* Credibility */}
      <div className="mx-6 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#f5f3f0]">
        <span className="text-[10px] font-medium text-[#aeaeb2] uppercase">可信度</span>
        <span className={credibility.hasPublicWork ? 'text-emerald-500' : 'text-amber-400'}>
          {credibility.hasPublicWork ? '●' : '○'}
        </span>
        <span className="text-[11px] text-[#6e6e73]">{credibility.note}</span>
      </div>

      {/* Divider */}
      <div className="mx-6 my-5 border-t border-[#f0f0f0]" />

      {/* Three sections */}
      <div className="px-6 pb-6 space-y-5">
        {/* Why TA */}
        <div>
          <h4 className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-1.5">
            为什么是 TA
          </h4>
          <p className="text-sm text-[#1d1d1f] leading-relaxed">{body.whyTa}</p>
        </div>

        {/* Collision */}
        <div>
          <h4 className="text-xs font-semibold text-violet-500 uppercase tracking-wider mb-1.5">
            你们能碰撞什么
          </h4>
          <p className="text-sm text-[#1d1d1f] leading-relaxed">{body.collision}</p>
        </div>

        {/* Opening Questions */}
        <div>
          <h4 className="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-1.5">
            开口问这 3 句
          </h4>
          <ul className="space-y-2">
            {body.openingQuestions.map((q, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-[#1d1d1f]">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#f5f3f0] text-[#6e6e73] text-[10px] font-semibold flex items-center justify-center mt-0.5">
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
