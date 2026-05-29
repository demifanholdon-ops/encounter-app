'use client'

import type { PersonData } from '@/lib/schema'
import { MapPin, Target } from 'lucide-react'

export function ProfileCard({ person }: { person: PersonData }) {
  return (
    <div className="w-full max-w-md mx-auto glass-surface rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-4">
          <img
            src={`https://api.dicebear.com/9.x/thumbs/png?seed=${person.id}&size=80&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
            alt={person.name}
            className="w-16 h-16 rounded-full border-2 border-slate-600/50"
          />
          <div>
            <h2 className="text-xl font-bold text-white">{person.name}</h2>
            <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
              <MapPin className="w-3 h-3" />
              {person.location}
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="px-6 pb-4">
        <p className="text-sm text-slate-300 leading-relaxed">{person.bio}</p>
      </div>

      {/* Skills */}
      <div className="px-6 pb-4 flex flex-wrap gap-1.5">
        {person.skills.map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700/50"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Divider */}
      <div className="mx-6 border-t border-slate-800" />

      {/* Goals */}
      <div className="px-6 py-4 space-y-3">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5" />
          三层目标
        </h3>
        <GoalRow label="短期" goal={person.shortTermGoal} />
        <GoalRow label="中期" goal={person.midTermGoal} />
        <GoalRow label="长期" goal={person.longTermGoal} />
      </div>

      <div className="h-4" />
    </div>
  )
}

function GoalRow({ label, goal }: { label: string; goal: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="flex-shrink-0 w-10 text-[10px] font-bold text-slate-500 uppercase mt-0.5">
        {label}
      </span>
      <p className="text-sm text-slate-300">{goal}</p>
    </div>
  )
}
