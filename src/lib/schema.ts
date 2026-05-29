import { z } from 'zod'

export const UserContextSchema = z.object({
  longTerm: z.string().min(1, '请填写长期目标'),
  midTerm: z.string().min(1, '请填写中期目标'),
  shortTerm: z.string().min(1, '请填写本场活动目标'),
  background: z.string().min(1, '请填写你的能力背景'),
  activityContext: z.string().min(1, '请填写当前活动场景'),
})

export type UserContext = z.infer<typeof UserContextSchema>

export const PersonDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  bio: z.string(),
  skills: z.array(z.string()),
  location: z.string(),
  shortTermGoal: z.string(),
  midTermGoal: z.string(),
  longTermGoal: z.string(),
  nfcId: z.string().optional(),
  avatar: z.string().optional(),
  precomputedCard: z.any().optional(),
})

export type PersonData = z.infer<typeof PersonDataSchema>

export const EncounterCardSchema = z.object({
  totalScore: z.number().min(0).max(10),
  level: z.enum(['S', 'A', 'B']),

  dimensions: z.object({
    collaboration: z.object({
      score: z.number().min(0).max(10),
      reason: z.string().max(80),
    }),
    cognitive: z.object({
      score: z.number().min(0).max(10),
      reason: z.string().max(80),
    }),
    strategic: z.object({
      isReserve: z.boolean(),
      reason: z.string().max(80),
    }),
  }),

  credibility: z.object({
    hasPublicWork: z.boolean(),
    note: z.string().max(60),
  }),

  tags: z.array(z.string()).max(5),

  card: z.object({
    whyTa: z.string().max(120),
    collision: z.string().max(150),
    openingQuestions: z.array(z.string()).length(3),
  }),
})

export type EncounterCard = z.infer<typeof EncounterCardSchema>
