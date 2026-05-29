'use client'

import { useEffect, useState, use } from 'react'
import Link from 'next/link'
import { ScoreCard } from '@/components/ScoreCard'
import { getUserContext, saveUserContext, addScannedPerson } from '@/lib/storage'
import { getPersonById } from '@/lib/people'
import type { EncounterCard, UserContext } from '@/lib/schema'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft, AlertCircle, Info } from 'lucide-react'

const DEFAULT_USER: UserContext = {
  longTerm: 'AI 硬件出海创业',
  midTerm: '扩展认知和人脉',
  shortTerm: '本场找 AI 硬件 / Web3 方向的人合作',
  background: '全栈工程师，擅长 AI 和前端',
  activityContext: '武汉 Rebase Web3 黑客松 2026',
}

export default function EncounterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  const [card, setCard] = useState<EncounterCard | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isDefaultUser, setIsDefaultUser] = useState(false)

  useEffect(() => {
    const user = getUserContext()
    const target = getPersonById(id)

    if (!target) {
      setError('未找到该用户信息')
      setLoading(false)
      return
    }

    // If user hasn't filled in profile, use default context + precomputed card
    if (!user) {
      setIsDefaultUser(true)
      const precomputed = (target as any).precomputedCard as EncounterCard | undefined
      if (precomputed) {
        setCard(precomputed)
        addScannedPerson(id, target, precomputed)
        setLoading(false)
        return
      }
      // Use default + try API as fallback
      saveUserContext(DEFAULT_USER)
    }

    const ctx = user || DEFAULT_USER
    setIsDefaultUser(!user)

    setLoading(true)
    fetch('/api/score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: ctx, target }),
    })
      .then((res) => res.json())
      .then((data: EncounterCard) => {
        setCard(data)
        addScannedPerson(id, target, data)
      })
      .catch(() => {
        const precomputed = (target as any).precomputedCard
        if (precomputed) {
          setCard(precomputed)
        } else {
          setError('加载失败，请稍后重试')
        }
      })
      .finally(() => setLoading(false))
  }, [id])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-lg mx-auto px-4 py-6">
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
        {isDefaultUser && card && (
          <div className="mb-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <Info className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <p className="text-xs text-blue-300">
              正在使用默认诉求。点右上角「我的诉求」填写你自己的信息，获得精准匹配
            </p>
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && (
          <div className="glass-surface rounded-2xl p-6 space-y-4">
            <div className="flex items-end justify-between">
              <div>
                <Skeleton className="h-4 w-16 bg-slate-800" />
                <Skeleton className="h-12 w-24 mt-2 bg-slate-800" />
              </div>
              <Skeleton className="h-10 w-10 rounded-xl bg-slate-800" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-md bg-slate-800" />
              <Skeleton className="h-6 w-20 rounded-md bg-slate-800" />
              <Skeleton className="h-6 w-14 rounded-md bg-slate-800" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-12 w-full bg-slate-800" />
              <Skeleton className="h-12 w-full bg-slate-800" />
              <Skeleton className="h-12 w-full bg-slate-800" />
            </div>
            <div className="space-y-3 pt-2">
              <Skeleton className="h-16 w-full bg-slate-800" />
              <Skeleton className="h-20 w-full bg-slate-800" />
              <Skeleton className="h-24 w-full bg-slate-800" />
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

        {/* Card */}
        {card && !loading && <ScoreCard card={card} />}
      </div>
    </div>
  )
}
