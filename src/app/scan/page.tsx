'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { PeopleList, type PeopleListItem } from '@/components/PeopleList'
import { getScannedPeople } from '@/lib/storage'
import { Sparkles } from 'lucide-react'

export default function ScanPage() {
  const [items, setItems] = useState<PeopleListItem[]>([])

  useEffect(() => {
    const scanned = getScannedPeople()
    const list: PeopleListItem[] = Object.values(scanned).map((r) => ({
      person: r.person,
      card: r.card,
    }))
    list.sort((a, b) => b.card.totalScore - a.card.totalScore)
    setItems(list)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-lg mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">遇见的人</h1>
            <p className="text-xs text-slate-500">
              {items.length > 0 ? `${items.length} 人 · 按匹配分排序` : '碰一碰 NFC 贴纸，认识新的人'}
            </p>
          </div>
          <Link
            href="/"
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors border border-slate-700/50"
          >
            我的诉求
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="glass-surface rounded-2xl p-10 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-slate-800 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-slate-500" />
            </div>
            <h2 className="text-lg font-semibold text-slate-300">还没有碰过任何人</h2>
            <p className="text-sm text-slate-500">去现场碰一碰别人的 NFC 贴纸，AI 为你算出最佳匹配</p>
          </div>
        ) : (
          <PeopleList items={items} />
        )}
      </div>
    </div>
  )
}
