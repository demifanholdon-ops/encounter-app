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
      <body className={`${geist.className} antialiased min-h-screen`}>
        {/* Background: z-index: -1 lets backdrop-filter on cards see through.
            V5: orbs are bigger + more saturated so the glass blur is clearly visible. */}
        <div className="bg-gradient-main" style={{ zIndex: -1 }} />
        <div
          className="bg-orb"
          style={{
            zIndex: -1,
            width: 520,
            height: 520,
            background: 'radial-gradient(circle, rgba(59,130,246,0.40), transparent 68%)',
            top: -140,
            left: -110,
            animationDelay: '0s',
          }}
        />
        <div
          className="bg-orb"
          style={{
            zIndex: -1,
            width: 460,
            height: 460,
            background: 'radial-gradient(circle, rgba(139,92,246,0.38), transparent 68%)',
            top: '40%',
            right: -130,
            animationDelay: '4s',
          }}
        />
        <div
          className="bg-orb"
          style={{
            zIndex: -1,
            width: 400,
            height: 400,
            background: 'radial-gradient(circle, rgba(249,115,22,0.30), transparent 68%)',
            bottom: -100,
            left: '20%',
            animationDelay: '8s',
          }}
        />
        <div
          className="bg-orb"
          style={{
            zIndex: -1,
            width: 360,
            height: 360,
            background: 'radial-gradient(circle, rgba(236,72,153,0.26), transparent 68%)',
            top: '8%',
            right: '12%',
            animationDelay: '11s',
          }}
        />

        {/* Content: no z-index wrapper, natural DOM flow sits above z-index: -1 backgrounds */}
        {children}
      </body>
    </html>
  )
}
