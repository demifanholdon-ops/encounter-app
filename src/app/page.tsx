'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getUserContext } from '@/lib/storage'
import { UserContextForm } from '@/components/UserContextForm'
import { ScanLine } from 'lucide-react'

export default function Home() {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const existingCtx = getUserContext()

  // Already configured
  if (existingCtx && !showForm) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md text-center space-y-6">
          <h1 className="text-3xl font-bold text-[#1C1C1E]">Encounter</h1>

          <div className="card-lg p-6 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-black/[0.04] flex items-center justify-center">
              <ScanLine className="w-8 h-8 text-[#6e6e73]" />
            </div>
            <h2 className="text-lg font-semibold text-[#1C1C1E]">准备就绪</h2>
            <p className="text-sm text-[#9A9A9A]">
              你的三层诉求已录入，可以开始碰一碰 NFC 贴纸了
            </p>

            {/* Show short-term goal as summary */}
            {existingCtx.shortTerm && (
              <div className="inline-block px-4 py-2 rounded-[20px] tint-blue text-xs text-[#4A4A4A]">
                🎯 {existingCtx.shortTerm}
              </div>
            )}

            <div className="flex flex-col gap-2.5 pt-1">
              <button
                onClick={() => router.push('/scan')}
                className="w-full py-3.5 btn-primary text-sm font-semibold"
              >
                查看遇见的人
              </button>
              <button
                className="text-[#9A9A9A] text-sm hover:text-[#4A4A4A] transition-colors py-1"
                onClick={() => setShowForm(true)}
              >
                重新编辑诉求
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show form
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-[#1C1C1E]">Encounter</h1>
          <p className="text-sm text-[#9A9A9A]">碰一下 NFC，AI 替你找到最适合的人</p>
        </div>
        <UserContextForm />
      </div>
    </div>
  )
}
