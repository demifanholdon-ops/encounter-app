'use client'

interface MatchLoadingProps {
  targetName: string
  targetId: string
  onComplete?: () => void
}

export function MatchLoading({ targetName, targetId }: MatchLoadingProps) {
  return (
    <div className="relative flex flex-col items-center justify-center py-16 px-4 overflow-hidden">
      {/* Floating particles background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-violet-300 animate-float-particle"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2.5 + Math.random() * 2}s`,
              opacity: 0.2 + Math.random() * 0.3,
            }}
          />
        ))}
      </div>

      {/* Avatars + Connection */}
      <div className="relative flex items-center gap-5 z-10">
        {/* User avatar */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="avatar-glow-blue">
            <img
              src="/avatars/me.jpg"
              alt="你"
              className="w-14 h-14 rounded-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://api.dicebear.com/9.x/thumbs/png?seed=encounter-me&size=80&backgroundColor=b6e3f4,c0aede'
              }}
            />
          </div>
          <span className="text-[11px] text-[#aeaeb2] font-medium">你</span>
        </div>

        {/* Connection beam with particles */}
        <div className="relative flex items-center -mt-5">
          <div className="w-12 h-0.5 rounded-full connection-beam" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-violet-400 connection-dot" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 connection-dot" style={{ animationDelay: '0.7s', animationDuration: '1.6s' }} />
          </div>
        </div>

        {/* Target avatar */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="avatar-glow-purple">
            <img
              src={`/avatars/头像${targetId.replace('user_', '')}.jpg`}
              alt={targetName}
              className="w-14 h-14 rounded-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://api.dicebear.com/9.x/thumbs/png?seed=${targetId}&size=80&backgroundColor=ffd5dc,ffdfbf,d1d4f9`
              }}
            />
          </div>
          <span className="text-[11px] text-[#aeaeb2] font-medium">{targetName}</span>
        </div>
      </div>

      {/* Thinking text */}
      <div className="mt-12 text-center z-10">
        <p className="text-base font-semibold text-[#1d1d1f] flex items-center justify-center gap-1.5">
          AI 正在分析匹配度
          <span className="inline-flex gap-0.5 ml-0.5">
            <span className="w-1 h-1 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1 h-1 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '200ms' }} />
            <span className="w-1 h-1 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '400ms' }} />
          </span>
        </p>
        <p className="text-xs text-[#aeaeb2] mt-2.5">
          <span className="thinking-step" style={{ animationDelay: '0s' }}>解析诉求</span>
          {' · '}
          <span className="thinking-step" style={{ animationDelay: '0.8s' }}>扫描技能</span>
          {' · '}
          <span className="thinking-step" style={{ animationDelay: '1.6s' }}>生成匹配</span>
        </p>
      </div>
    </div>
  )
}
