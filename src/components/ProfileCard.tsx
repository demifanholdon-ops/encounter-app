'use client'

import type { PersonData } from '@/lib/schema'
import { MapPin, Target } from 'lucide-react'

export function ProfileCard({ person }: { person: PersonData }) {
  return (
    <div className="w-full max-w-md mx-auto card-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center gap-4">
          <img
            src={person.avatar || `https://api.dicebear.com/9.x/thumbs/png?seed=${person.id}&size=80&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
            alt={person.name}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-white/60"
          />
          <div>
            <h2 className="text-xl font-bold text-[#1C1C1E]">{person.name}</h2>
            <div className="flex items-center gap-1 text-xs text-[#9A9A9A] mt-0.5">
              <MapPin className="w-3 h-3" />
              {person.location}
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="px-6 pb-4">
        <p className="text-sm text-[#4A4A4A] leading-relaxed">{person.bio}</p>
      </div>

      {/* Skills */}
      <div className="px-6 pb-4 flex flex-wrap gap-1.5">
        {person.skills.map((skill) => (
          <span key={skill} className="tag">{skill}</span>
        ))}
      </div>

      {/* Divider */}
      <div className="mx-6 border-t border-black/[0.04]" />

      {/* Goals */}
      <div className="px-6 py-5 space-y-3">
        <h3 className="text-xs font-semibold text-[#9A9A9A] uppercase tracking-wider flex items-center gap-1.5">
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
      <span className="flex-shrink-0 w-10 text-[10px] font-semibold text-[#9A9A9A] uppercase mt-0.5">
        {label}
      </span>
      <p className="text-sm text-[#4A4A4A]">{goal}</p>
    </div>
  )
}
