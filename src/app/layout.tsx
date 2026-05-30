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
      <body className={`${geist.className} antialiased min-h-screen relative`}>
        {/* Base gradient */}
        <div className="bg-gradient-main" />

        {/* Radial gradient orbs — huge blur, very low opacity */}
        <div
          className="bg-orb"
          style={{
            width: 440,
            height: 440,
            background: 'radial-gradient(circle, rgba(59,130,246,0.10), transparent 70%)',
            top: -120,
            left: -80,
          }}
        />
        <div
          className="bg-orb"
          style={{
            width: 380,
            height: 380,
            background: 'radial-gradient(circle, rgba(139,92,246,0.09), transparent 70%)',
            top: '45%',
            right: -100,
          }}
        />
        <div
          className="bg-orb"
          style={{
            width: 320,
            height: 320,
            background: 'radial-gradient(circle, rgba(249,115,22,0.07), transparent 70%)',
            bottom: -80,
            left: '25%',
          }}
        />

        {/* Content layer */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}
