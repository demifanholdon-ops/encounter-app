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
    <div className="min-h-screen">
      <div className="max-w-lg mx-auto px-5 py-8 relative z-10">

        {/* === WELCOME === */}
        {showWelcome && (
          <div className="text-center space-y-6 pt-12">
            <div className="w-20 h-20 mx-auto rounded-full bg-black/5 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-[#6e6e73]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1d1d1f]">你碰了 {getPersonById(id)?.name || 'TA'} 的贴纸</h1>
              <p className="text-sm text-[#8e8e93] mt-2">
                先告诉我你的诉求，AI 能给你更精准的匹配
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => router.push(`/?return=${id}`)}
                className="w-full py-3.5 rounded-[16px] bg-[#1d1d1f]/90 backdrop-blur-sm text-white font-semibold text-sm hover:bg-[#1d1d1f] transition-all active:scale-[0.98] shadow-lg shadow-black/10"
              >
                填写我的信息和诉求
              </button>
              <button
                onClick={() => {
                  setShowWelcome(false)
                  loadCard(null)
                }}
                className="w-full py-3.5 rounded-[16px] glass-card-light text-[#6e6e73] text-sm font-medium hover:text-[#1d1d1f] transition-all flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                我只是看看
              </button>
            </div>
            <p className="text-[11px] text-[#8e8e93]">
              选「我只是看看」先查看对方的基本资料，填写诉求后才有专属匹配
            </p>
          </div>
        )}

        {/* === MATCH LOADING === */}
        {showMatchAnim && (
          <>
            <div className="flex items-center justify-between mb-6">
              <Link
                href="/scan"
                className="flex items-center gap-1 text-sm text-[#8e8e93] hover:text-[#1d1d1f] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                遇见的人
              </Link>
              <Link
                href="/"
                className="nav-pill px-4 py-2 text-xs font-medium text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
              >
                我的诉求
              </Link>
            </div>

            <div className="glass-card">
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
            <div className="flex items-center justify-between mb-6">
              <Link
                href="/scan"
                className="flex items-center gap-1 text-sm text-[#8e8e93] hover:text-[#1d1d1f] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                遇见的人
              </Link>
              <Link
                href="/"
                className="nav-pill px-4 py-2 text-xs font-medium text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
              >
                我的诉求
              </Link>
            </div>

            {isDefaultUser && (
              <div className="mb-4 flex items-center gap-2 px-4 py-3 rounded-[16px] bg-blue-500/10 border border-blue-500/20">
                <Info className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <p className="text-xs text-blue-600">
                  这是 TA 的基本资料。点右上角「我的诉求」填写你的目标，AI 为你生成专属作战卡片
                </p>
              </div>
            )}

            {loading && (
              <div className="glass-card p-6 space-y-4">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="h-3 w-14 bg-black/5 rounded animate-pulse" />
                    <div className="h-10 w-20 mt-2 bg-black/5 rounded animate-pulse" />
                  </div>
                  <div className="h-9 w-9 rounded-xl bg-black/5 animate-pulse" />
                </div>
              </div>
            )}

            {error && !loading && (
              <div className="glass-card p-8 text-center space-y-3">
                <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
                <p className="text-[#6e6e73]">{error}</p>
                <Link
                  href="/scan"
                  className="inline-block px-4 py-2 rounded-[16px] glass-card-light text-[#6e6e73] text-sm hover:text-[#1d1d1f] transition-colors"
                >
                  返回遇见的人
                </Link>
              </div>
            )}

            {isDefaultUser && !loading && <ProfileCard person={getPersonById(id)!} />}

            {card && !loading && <ScoreCard card={card} />}
          </>
        )}
      </div>
    </div>
  )
}
