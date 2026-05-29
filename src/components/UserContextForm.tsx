'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { saveUserContext } from '@/lib/storage'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const FIELDS = [
  { key: 'longTerm', label: '长期目标', placeholder: '例：AI 硬件出海创业', hint: '你 3-5 年的职业或创业方向' },
  { key: 'midTerm', label: '中期目标', placeholder: '例：扩展人脉、提升认知', hint: '未来 6-12 个月想达成的事' },
  { key: 'shortTerm', label: '短期目标（本场活动）', placeholder: '例：找 AI 硬件方向的人合作', hint: '今天这 8 小时你最想找到什么样的人' },
  { key: 'background', label: '能力背景', placeholder: '例：全栈工程师、擅长 React 和 Python', hint: '你能做什么，有什么可交换的技能' },
  { key: 'activityContext', label: '当前活动场景', placeholder: '例：武汉 Rebase Web3 黑客松 2026', hint: '这场活动叫什么、在哪里、什么性质' },
]

export function UserContextForm() {
  const router = useRouter()
  const [form, setForm] = useState<Record<string, string>>({})
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
    <Card className="w-full max-w-lg mx-auto glass-surface border-0">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl text-white">开始使用 Encounter</CardTitle>
        <CardDescription className="text-slate-400">
          告诉我你的三层面诉求，AI 帮你在现场找到最适合的人
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {FIELDS.map((field) => (
            <div key={field.key} className="space-y-1">
              <label className="text-sm font-medium text-slate-300">{field.label}</label>
              <Input
                value={form[field.key] || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                className="bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
              />
              <p className="text-[11px] text-slate-500">{field.hint}</p>
            </div>
          ))}
          {error && <p className="text-sm text-red-400">{error}</p>}
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold shadow-lg shadow-blue-500/20"
          >
            开始碰一碰
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
