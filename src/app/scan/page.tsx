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
    <div className="min-h-screen">
      <div className="max-w-lg mx-auto px-5 py-8 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1d1d1f]">遇见的人</h1>
            <p className="text-xs text-[#8e8e93] mt-0.5">
              {items.length > 0 ? `${items.length} 人 · 按匹配分排序` : '碰一碰 NFC 贴纸，认识新的人'}
            </p>
          </div>
          <Link
            href="/"
            className="nav-pill px-4 py-2 text-xs font-medium text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
          >
            我的诉求
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="glass-card p-10 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-black/5 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-[#8e8e93]" />
            </div>
            <h2 className="text-lg font-semibold text-[#1d1d1f]">还没有碰过任何人</h2>
            <p className="text-sm text-[#8e8e93]">去现场碰一碰别人的 NFC 贴纸，AI 为你算出最佳匹配</p>
          </div>
        ) : (
          <PeopleList items={items} />
        )}
      </div>
    </div>
  )
}
