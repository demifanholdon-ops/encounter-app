'use client'

import type { EncounterCard } from '@/lib/schema'

function LevelBadge({ level }: { level: string }) {
  const cls = level === 'S' ? 'level-S' : level === 'A' ? 'level-A' : 'level-B'
  return (
    <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-lg font-black ${cls}`}>
      {level}
    </span>
  )
}

function StatBar({ label, score, reason }: { label: string; score: number; reason: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</span>
        <span className="text-sm font-bold text-slate-200">{score.toFixed(1)}</span>
      </div>
      <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-700"
          style={{ width: `${score * 10}%` }}
        />
      </div>
      <p className="text-xs text-slate-500 leading-relaxed">{reason}</p>
    </div>
  )
}

export function ScoreCard({ card }: { card: EncounterCard }) {
  const { totalScore, level, dimensions, credibility, tags, card: body } = card

  return (
    <div className="w-full max-w-md mx-auto glass-surface rounded-2xl overflow-hidden">
      {/* Header: Total Score + Level */}
      <div className="p-6 pb-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">作战卡片</p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-5xl font-black text-white tabular-nums">
                {totalScore.toFixed(1)}
              </span>
              <span className="text-sm text-slate-500">/ 10</span>
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
            className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700/50"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Dimensions */}
      <div className="px-6 pb-4 space-y-3">
        <StatBar label="合作匹配度" score={dimensions.collaboration.score} reason={dimensions.collaboration.reason} />
        <StatBar label="认知获取" score={dimensions.cognitive.score} reason={dimensions.cognitive.reason} />
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">战略储备</span>
            {dimensions.strategic.isReserve && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                战略储备
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">{dimensions.strategic.reason}</p>
        </div>
      </div>

      {/* Credibility */}
      <div className="mx-6 flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700/30">
        <span className="text-[10px] font-medium text-slate-500 uppercase">可信度</span>
        <span className={credibility.hasPublicWork ? 'text-green-400' : 'text-yellow-400'}>
          {credibility.hasPublicWork ? '●' : '○'}
        </span>
        <span className="text-[11px] text-slate-400">{credibility.note}</span>
      </div>

      {/* Divider */}
      <div className="mx-6 my-4 border-t border-slate-800" />

      {/* Three sections */}
      <div className="px-6 pb-3 space-y-4">
        {/* Why TA */}
        <div>
          <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1.5">
            为什么是 TA
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed">{body.whyTa}</p>
        </div>

        {/* Collision */}
        <div>
          <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1.5">
            你们能碰撞什么
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed">{body.collision}</p>
        </div>

        {/* Opening Questions */}
        <div>
          <h4 className="text-xs font-semibold text-pink-400 uppercase tracking-wider mb-1.5">
            开口问这 3 句
          </h4>
          <ul className="space-y-1.5">
            {body.openingQuestions.map((q, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-pink-500/20 text-pink-400 text-[10px] font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                {q}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="h-4" />
    </div>
  )
}
