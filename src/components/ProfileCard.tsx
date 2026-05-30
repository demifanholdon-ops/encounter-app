'use client'

import type { PersonData } from '@/lib/schema'
import { MapPin, Target } from 'lucide-react'

export function ProfileCard({ person }: { person: PersonData }) {
  return (
    <div className="w-full max-w-md mx-auto glass-card overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center gap-4">
          <img
            src={person.avatar || `https://api.dicebear.com/9.x/thumbs/png?seed=${person.id}&size=80&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
            alt={person.name}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-white/50"
          />
          <div>
            <h2 className="text-xl font-bold text-[#1d1d1f]">{person.name}</h2>
            <div className="flex items-center gap-1 text-xs text-[#8e8e93] mt-0.5">
              <MapPin className="w-3 h-3" />
              {person.location}
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="px-6 pb-4">
        <p className="text-sm text-[#6e6e73] leading-relaxed">{person.bio}</p>
      </div>

      {/* Skills */}
      <div className="px-6 pb-4 flex flex-wrap gap-1.5">
        {person.skills.map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-black/5 text-[#6e6e73]"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Divider */}
      <div className="mx-6 border-t border-black/5" />

      {/* Goals */}
      <div className="px-6 py-5 space-y-3">
        <h3 className="text-xs font-semibold text-[#8e8e93] uppercase tracking-wider flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5" />
          三层目标
        </h3>
        <GoalRow label="短期" goal={person.shortTermGoal} />
        <GoalRow label="中期" goal={person.midTermGoal} />
        <GoalRow label="长期" goal={person.longTermGoal} />
      </div>
    </div>
  )
}

function GoalRow({ label, goal }: { label: string; goal: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="flex-shrink-0 w-10 text-[10px] font-semibold text-[#8e8e93] uppercase mt-0.5">
        {label}
      </span>
      <p className="text-sm text-[#6e6e73]">{goal}</p>
    </div>
  )
}
