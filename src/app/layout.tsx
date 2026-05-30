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
    <html lang="zh-CN">
      <body className={`${geist.className} antialiased min-h-screen bg-[#f5f3f0] text-[#1d1d1f] relative`}>
        {/* Background glowing orbs — the 'stuff' behind the glass */}
        <div className="bg-orb w-[320px] h-[320px] bg-blue-200/50 top-[-80px] left-[-60px]" />
        <div className="bg-orb w-[280px] h-[280px] bg-violet-200/40 top-[40%] right-[-100px]" />
        <div className="bg-orb w-[240px] h-[240px] bg-rose-200/30 bottom-[-60px] left-[20%]" />
        <div className="bg-orb w-[200px] h-[200px] bg-amber-200/30 top-[60%] left-[-40px]" />

        {/* Content — sits above the orbs, z-10 so glass cards float over */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}
