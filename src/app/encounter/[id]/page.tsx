'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ScoreCard } from '@/components/ScoreCard'
import { ProfileCard } from '@/components/ProfileCard'
import { MatchLoading } from '@/components/MatchLoading'
import { getUserContext, addScannedPerson } from '@/lib/storage'
import { getPersonById } from '@/lib/people'
import type { EncounterCard, UserContext } from '@/lib/schema'
import { ArrowLeft, AlertCircle, Info, Sparkles, Eye } from 'lucide-react'

const MIN_LOADING_MS = 2600

export default function EncounterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()

  const [card, setCard] = useState<EncounterCard | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isDefaultUser, setIsDefaultUser] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showMatchAnim, setShowMatchAnim] = useState(false)

  function loadCard(user: UserContext | null) {
    const target = getPersonById(id)
    if (!target) {
      setError('未找到该用户信息')
      setLoading(false)
      return
    }

    // just looking — show profile, no AI card
    if (!user) {
      setIsDefaultUser(true)
      setLoading(false)
      return
    }

    setIsDefaultUser(false)
    setShowMatchAnim(true)
    const startTime = Date.now()

    fetch('/api/score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, target }),
    })
      .then((res) => res.json())
      .then((data: EncounterCard) => {
        const elapsed = Date.now() - startTime
        const remaining = Math.max(0, MIN_LOADING_MS - elapsed)

        setTimeout(() => {
          setCard(data)
          addScannedPerson(id, target, data)
          setShowMatchAnim(false)
          setLoading(false)
        }, remaining)
      })
      .catch(() => {
        const elapsed = Date.now() - startTime
        const remaining = Math.max(0, MIN_LOADING_MS - elapsed)

        setTimeout(() => {
          const precomputed = (target as any).precomputedCard
          if (precomputed) setCard(precomputed)
          else setError('加载失败，请稍后重试')
          setShowMatchAnim(false)
          setLoading(false)
        }, remaining)
      })
  }

  useEffect(() => {
    const user = getUserContext()
    if (!user) {
      setShowWelcome(true)
      setLoading(false)
      return
    }
    loadCard(user)
  }, [id])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-lg mx-auto px-4 py-6">

        {/* === WELCOME: 首次碰，二选一 === */}
        {showWelcome && (
          <div className="text-center space-y-6 pt-12">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">你碰了 {getPersonById(id)?.name || 'TA'} 的贴纸</h1>
              <p className="text-sm text-slate-400 mt-2">
                先告诉我你的诉求，AI 能给你更精准的匹配
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => router.push(`/?return=${id}`)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-blue-500/20 hover:from-blue-500 hover:to-purple-500 transition-all"
              >
                填写我的信息和诉求
              </button>
              <button
                onClick={() => {
                  setShowWelcome(false)
                  loadCard(null)
                }}
                className="w-full py-3 rounded-xl glass-surface text-slate-300 text-sm font-medium hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                我只是看看
              </button>
            </div>
            <p className="text-[11px] text-slate-600">
              选「我只是看看」先查看对方的基本资料，填写诉求后才有专属匹配
            </p>
          </div>
        )}

        {/* === MATCH LOADING ANIMATION === */}
        {showMatchAnim && (
          <>
            {/* Top Nav */}
            <div className="flex items-center justify-between mb-6">
              <Link
                href="/scan"
                className="flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                遇见的人
              </Link>
              <Link
                href="/"
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors border border-slate-700/50"
              >
                我的诉求
              </Link>
            </div>

            <div className="glass-surface rounded-2xl">
              <MatchLoading
                targetName={getPersonById(id)?.name || 'TA'}
                targetId={id}
                onComplete={() => {}}
              />
            </div>
          </>
        )}

        {/* === CARD VIEW === */}
        {!showWelcome && !showMatchAnim && (
          <>
            {/* Top Nav */}
            <div className="flex items-center justify-between mb-6">
              <Link
                href="/scan"
                className="flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                遇见的人
              </Link>
              <Link
                href="/"
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors border border-slate-700/50"
              >
                我的诉求
              </Link>
            </div>

            {/* Default User Banner */}
            {isDefaultUser && (
              <div className="mb-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <Info className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <p className="text-xs text-blue-300">
                  这是 TA 的基本资料。点右上角「我的诉求」填写你的目标，AI 为你生成专属作战卡片
                </p>
              </div>
            )}

            {/* Loading Skeleton (non-match loading: checking state etc) */}
            {loading && (
              <div className="glass-surface rounded-2xl p-6 space-y-4">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="h-4 w-16 bg-slate-800 rounded animate-pulse" />
                    <div className="h-12 w-24 mt-2 bg-slate-800 rounded animate-pulse" />
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-slate-800 animate-pulse" />
                </div>
              </div>
            )}

            {/* Error */}
            {error && !loading && (
              <div className="glass-surface rounded-2xl p-8 text-center space-y-3">
                <AlertCircle className="w-10 h-10 text-yellow-400 mx-auto" />
                <p className="text-slate-300">{error}</p>
                <Link
                  href="/scan"
                  className="inline-block px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-sm hover:bg-slate-700 transition-colors border border-slate-700/50"
                >
                  返回遇见的人
                </Link>
              </div>
            )}

            {/* Profile Card (just looking) */}
            {isDefaultUser && !loading && <ProfileCard person={getPersonById(id)!} />}

            {/* Battle Card */}
            {card && !loading && <ScoreCard card={card} />}
          </>
        )}
      </div>
    </div>
  )
}
