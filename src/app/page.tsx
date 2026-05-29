'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getUserContext, saveUserContext } from '@/lib/storage'
import { UserContextForm } from '@/components/UserContextForm'
import { Button } from '@/components/ui/button'
import { Sparkles, ScanLine } from 'lucide-react'

export default function Home() {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const existingCtx = getUserContext()

  // Already configured — show ready state
  if (existingCtx && !showForm) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="w-full max-w-md text-center space-y-6">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-blue-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Encounter
            </h1>
          </div>

          <div className="glass-surface rounded-2xl p-6 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <ScanLine className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-white">准备就绪</h2>
            <p className="text-sm text-slate-400">
              你的三层面诉求已录入，可以开始碰一碰 NFC 贴纸了
            </p>
            <div className="flex flex-col gap-2">
              <Button
                onClick={() => router.push('/scan')}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold shadow-lg shadow-blue-500/20"
              >
                查看遇见的人
              </Button>
              <Button
                variant="ghost"
                className="text-slate-400 hover:text-white"
                onClick={() => setShowForm(true)}
              >
                重新编辑诉求
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show form
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Encounter
          </h1>
          <p className="text-sm text-slate-500">碰一下 NFC，AI 替你找到最适合的人</p>
        </div>
        <UserContextForm />
      </div>
    </div>
  )
}
