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

  // Already configured — show ready state
  if (existingCtx && !showForm) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md text-center space-y-6 relative z-10">
          <h1 className="text-3xl font-bold text-[#1d1d1f]">Encounter</h1>

          <div className="glass-card p-6 space-y-5">
            <div className="w-16 h-16 mx-auto rounded-full bg-black/5 flex items-center justify-center">
              <ScanLine className="w-8 h-8 text-[#6e6e73]" />
            </div>
            <h2 className="text-lg font-semibold text-[#1d1d1f]">准备就绪</h2>
            <p className="text-sm text-[#8e8e93]">
              你的三层面诉求已录入，可以开始碰一碰 NFC 贴纸了
            </p>
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => router.push('/scan')}
                className="w-full py-3 rounded-[16px] bg-[#1d1d1f]/90 backdrop-blur-sm text-white font-semibold text-sm hover:bg-[#1d1d1f] transition-all active:scale-[0.98] shadow-lg shadow-black/10"
              >
                查看遇见的人
              </button>
              <button
                className="text-[#8e8e93] text-sm hover:text-[#6e6e73] transition-colors py-1"
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
      <div className="w-full max-w-lg space-y-8 relative z-10">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-[#1d1d1f]">Encounter</h1>
          <p className="text-sm text-[#8e8e93]">碰一下 NFC，AI 替你找到最适合的人</p>
        </div>
        <UserContextForm />
      </div>
    </div>
  )
}
