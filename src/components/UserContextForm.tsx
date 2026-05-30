'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getUserContext, saveUserContext } from '@/lib/storage'
import type { UserContext } from '@/lib/schema'

const FIELDS = [
  { key: 'longTerm', label: '长期目标', placeholder: '例：AI 硬件出海创业', hint: '你 3-5 年的职业或创业方向' },
  { key: 'midTerm', label: '中期目标', placeholder: '例：扩展人脉、提升认知', hint: '未来 6-12 个月想达成的事' },
  { key: 'shortTerm', label: '短期目标（本场活动）', placeholder: '例：找 AI 硬件方向的人合作', hint: '今天这 8 小时你最想找到什么样的人' },
  { key: 'background', label: '能力背景', placeholder: '例：全栈工程师、擅长 React 和 Python', hint: '你能做什么，有什么可交换的技能' },
  { key: 'activityContext', label: '当前活动场景', placeholder: '例：武汉 Rebase Web3 黑客松 2026', hint: '这场活动叫什么、在哪里、什么性质' },
]

function getInitialForm(existing: UserContext | null): Record<string, string> {
  if (!existing) return {}
  return {
    longTerm: existing.longTerm || '',
    midTerm: existing.midTerm || '',
    shortTerm: existing.shortTerm || '',
    background: existing.background || '',
    activityContext: existing.activityContext || '',
  }
}

export function UserContextForm() {
  const router = useRouter()
  const existing = getUserContext()
  const [form, setForm] = useState<Record<string, string>>(getInitialForm(existing))
  const [error, setError] = useState('')

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setError('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const missing = FIELDS.find((f) => !form[f.key]?.trim())
    if (missing) {
      setError(`请填写「${missing.label}」`)
      return
    }
    saveUserContext({
      longTerm: form.longTerm.trim(),
      midTerm: form.midTerm.trim(),
      shortTerm: form.shortTerm.trim(),
      background: form.background.trim(),
      activityContext: form.activityContext.trim(),
    })
    router.push('/scan')
  }

  return (
    <div className="w-full max-w-lg mx-auto card-lg p-6">
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-[#1C1C1E]">Encounter</h1>
        <p className="text-sm text-[#9A9A9A] mt-1">
          填写你的三层诉求，AI 帮你在现场找到最适合的人
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {FIELDS.map((field) => (
            <div key={field.key} className="space-y-2">
              <label className="text-sm font-medium text-[#1C1C1E]">{field.label}</label>
              <input
                value={form[field.key] || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                className="w-full px-4 py-3.5 input-glass text-[#1C1C1E] placeholder:text-[#C7C7CC] text-sm focus:outline-none focus:border-blue-400/40 focus:bg-white/80 transition-all"
              />
              <p className="text-[11px] text-[#9A9A9A]">{field.hint}</p>
            </div>
          ))}
          {error && <p className="text-sm text-rose-500">{error}</p>}
        </div>

        <button type="submit" className="w-full mt-7 py-3.5 btn-primary text-sm font-semibold">
          开始碰一碰
        </button>
      </form>
    </div>
  )
}
