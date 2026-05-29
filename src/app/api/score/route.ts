export const maxDuration = 30

import { generateObject } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'

const deepseek = createOpenAI({
  baseURL: 'https://api.deepseek.com/v1',
  apiKey: process.env.DEEPSEEK_API_KEY,
})
import { EncounterCardSchema } from '@/lib/schema'
import { SYSTEM_PROMPT, buildUserPrompt } from '@/lib/prompts'
import peopleData from '../../../../data/people.json'

export async function POST(req: Request) {
  const { user, target } = await req.json()

  try {
    const { object } = await generateObject({
      model: deepseek('deepseek-v4-pro'),
      schema: EncounterCardSchema,
      system: SYSTEM_PROMPT,
      prompt: buildUserPrompt(user, target),
      temperature: 0.3,
    })
    return Response.json(object)
  } catch (e) {
    console.error('AI scoring failed, using fallback:', e)
    // Try precomputed card from people.json
    const person = (peopleData as any[]).find((p) => p.id === target.id)
    if (person?.precomputedCard) {
      return Response.json(person.precomputedCard)
    }
    // Generic fallback
    return Response.json({
      totalScore: 6.0,
      level: 'B',
      dimensions: {
        collaboration: { score: 5.0, reason: '暂无法评估，请稍后重试' },
        cognitive: { score: 5.0, reason: '暂无法评估，请稍后重试' },
        strategic: { isReserve: false, reason: '暂无法评估，请稍后重试' },
      },
      credibility: { hasPublicWork: false, note: '信息不完整' },
      tags: ['待评估'],
      card: {
        whyTa: 'AI 暂时无法给出评分，请稍后重试或查看预置案例',
        collision: '网络或 API 出现临时故障，已为你展示兜底卡片',
        openingQuestions: ['你的项目目前最需要什么帮助？', '你本场活动最想找到什么样的人？', '能给我讲讲你最近在做什么吗？'],
      },
    })
  }
}
