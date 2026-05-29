import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Encounter — 碰一下，AI 替你找到最适合的人',
  description: '线下科技活动现场社交匹配工具',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="dark">
      <body className={`${geist.className} antialiased min-h-screen bg-slate-950 text-slate-50`}>
        {children}
      </body>
    </html>
  )
}
