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
      <div className="max-w-lg mx-auto px-5 pt-8 pb-24 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1C1C1E]">遇见的人</h1>
            <p className="text-xs text-[#9A9A9A] mt-0.5">
              {items.length > 0 ? `${items.length} 人 · 按匹配分排序` : '碰一碰 NFC 贴纸，认识新的人'}
            </p>
          </div>
          <Link href="/" className="nav-pill px-4 py-2 text-xs font-medium text-[#4A4A4A] hover:text-[#1C1C1E] transition-colors">
            我的诉求
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="card-lg p-10 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-black/[0.04] flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-[#9A9A9A]" />
            </div>
            <h2 className="text-lg font-semibold text-[#1C1C1E]">还没有碰过任何人</h2>
            <p className="text-sm text-[#9A9A9A]">去现场碰一碰别人的 NFC 贴纸，AI 为你算出最佳匹配</p>
          </div>
        ) : (
          <PeopleList items={items} />
        )}
      </div>
    </div>
  )
}
