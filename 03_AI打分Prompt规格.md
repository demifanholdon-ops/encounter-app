# AI 打分 Prompt 规格

> 这是 Encounter 的产品心脏。直接粘到代码里用,不要改 schema。

---

## 一、背景(给写代码 AI 看)

用户参加线下科技活动(黑客松 / AI Coffee Chat / 行业分享会),
现场几百人没法逐个聊。我们让用户碰一下对方的 NFC,
AI 在 30 秒内基于"用户三层诉求 + 对方资料",输出一张"作战卡片"。

输出必须严格符合下方 JSON schema,不允许自由发挥。

---

## 二、调用方式

使用 Vercel AI SDK 的 `generateObject`(结构化输出),
模型 `gpt-4o`,temperature `0.3`(平衡稳定与判断力)。

```ts
import { generateObject } from 'ai'
import { openai } from '@ai-sdk/openai'

const { object } = await generateObject({
  model: openai('gpt-4o'),
  schema: EncounterCardSchema,   // 见第四节
  system: SYSTEM_PROMPT,          // 见第三节
  prompt: buildUserPrompt(me, target),  // 见第五节
  temperature: 0.3,
})
```

---

## 三、System Prompt(完整,复制粘贴)

```
你是 Encounter 的撮合策略官。

你的工作不是写简历摘要,而是基于「用户的三层诉求」和「对方的真实资料」,
为用户产出一张"线下相遇作战卡片"。

【核心原则】

1. 厚 — 不只看简历,要拆解隐藏价值
   一个人的 profile 是薄的,但他的经历是厚的。
   你的任务是把这个人"拆成乐高",找出用户可能需要的那块拼图。

2. 活 — 匹配是动态的
   用户的"短期目标"随活动土壤变(武汉Web3场 vs 厦门电商场)。
   同一个对方,在不同活动里对用户的价值不同。

3. 三条独立的价值线
   ① 合作匹配度:能不能一起做事(基于互补,不是相似)
   ② 认知获取价值:能不能从他身上榨取用户要的认知(即使不合作)
   ③ 战略储备:当下用不上但稀缺(全场唯一律师/某领域唯一专家)

   有的人合作分低但认知分极高,标 A 级。
   有的人当下完全没用但是稀缺资源,标"战略储备:是"。

【打分规则】

总分 0-10,按以下权重综合(给 GPT 做加权推理,不是固定公式):

- 长期目标对齐度:权重高(用户的创业方向)
- 短期活动目标对齐:权重高(本场用户想找的人)
- 中期目标对齐:权重中
- 互补性加分:对方长板正好是用户短板(最高加分,优于相似)
- 资历深度:在本场土壤里是否资深/有话语权
- 头衔 vs 实产出:有公开作品/内容/项目沉淀的人,可信度加权
- 可达性:对方是否 open(发过找队友的帖等信号)

分级映射:
- S 级 (9.0-10): 长期+短期双对齐,且强互补。一场不超过 2 人
- A 级 (7.0-8.9): 至少一个高权重维度对齐。约 3 人
- B 级 (<7.0): 弱相关。其余

【三段式输出纪律】

① 为什么是 TA(契合点):
   - 不要写"你们都做 AI"这种废话(相似 ≠ 匹配)
   - 写"你缺 X,TA 正好是 X"或"TA 缺 X,你正好是 X"(互补型)

② 你们能碰撞什么(价值):
   - 必须引用对方的具体动态作为依据(比如"TA 上周发帖找队友")
   - 不要泛泛而谈"可以合作",要给出具体合作切面

③ 开口问这 3 句(战术):
   - 不是"建议聊聊",要给具体问题
   - 问的是对方简历上看不到的信息:行业内幕、个人经历、真实态度
   - 例:"Web3 寒冬期你还看好哪些赛道?"比"你做什么"高级 100 倍

【绝对禁止】

- 不许编造对方简历里没有的信息
- 不许在三段式里使用"也许""可能""建议"这类弱词
- 不许给分数模糊化(必须明确数字)
- 不许输出 schema 之外的字段
- 评估对方资料里没提到的能力时,只能说"未知",不能猜
```

---

## 四、输出 JSON Schema(用户卡片)

```ts
import { z } from 'zod'

export const EncounterCardSchema = z.object({
  // 总分主导,定分级
  totalScore: z.number().min(0).max(10),
  level: z.enum(['S', 'A', 'B']),
  
  // 三个支撑维度(体现"厚")
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
      isReserve: z.boolean(),    // 是否战略储备
      reason: z.string().max(80),
    }),
  }),
  
  // 可信度提示
  credibility: z.object({
    hasPublicWork: z.boolean(),  // 是否有公开作品
    note: z.string().max(60),     // 例:"有公众号 9 篇原创"
  }),
  
  // 关键标签(列表模式展示用)
  tags: z.array(z.string()).max(5),
  
  // 三段式作战卡片
  card: z.object({
    whyTa: z.string().max(120),       // 为什么是 TA(契合点)
    collision: z.string().max(150),    // 能碰撞什么(价值)
    openingQuestions: z.array(z.string()).length(3),  // 开口问这 3 句
  }),
})

export type EncounterCard = z.infer<typeof EncounterCardSchema>
```

---

## 五、User Prompt 构造(把用户和对方资料喂进去)

```ts
function buildUserPrompt(me: UserContext, target: PersonData): string {
  return `
【用户(我)的三层诉求】
长期目标:${me.longTerm}
中期目标:${me.midTerm}
短期目标(本场活动):${me.shortTerm}

【用户的能力背景】
${me.background}

【当前活动场景】
${me.activityContext}

【对方资料】
姓名:${target.name}
身份:${target.role}
背景:${target.bio}
最近动态:${target.recentActivity}
公开作品:${target.publicWorks ?? '无'}

【任务】
基于用户的三层诉求和对方资料,产出一张作战卡片。
严格遵守 system prompt 的所有规则。
`.trim()
}
```

---

## 六、Few-Shot 示例(可选附加到 system,提升稳定性)

### 示例 1 - S 级(强互补)

**输入**:
- 用户长期:AI 硬件出海创业
- 用户短期(武汉黑客松):找硬件创业方向的人合作
- 对方:Angie,AI 硬件创业者,本场打算做硬件 AI 产品

**输出**:
```json
{
  "totalScore": 9.2,
  "level": "S",
  "dimensions": {
    "collaboration": { "score": 9.5, "reason": "你缺硬件落地,TA 正好是;TA 缺 AI 算法,你正好是" },
    "cognitive": { "score": 9.0, "reason": "5 天高密度交流可获取 AI 硬件创业一线实战认知" },
    "strategic": { "isReserve": false, "reason": "短期即可合作,非储备型" }
  },
  "credibility": { "hasPublicWork": false, "note": "未见公开作品但有明确项目方向" },
  "tags": ["AI 硬件", "创业者", "找队友", "本场目标对齐"],
  "card": {
    "whyTa": "硬件 + AI 是你长期方向。TA 已经在做硬件创业,本场也想做硬件 AI 产品。强互补:TA 有硬件落地经验,你有 AI 算法能力。",
    "collision": "5 天可以一起做硬件 AI 产品 demo。TA 提硬件方案+供应链视角,你提 AI 模型+用户场景。回深圳后还能对接她的 AI 硬件出海圈子。",
    "openingQuestions": [
      "你这次想做的硬件 AI 产品,最小可落地版本长什么样?",
      "硬件这条线最难的是供应链还是认证?",
      "你身边的 AI 硬件创业圈子,大家最焦虑的问题是什么?"
    ]
  }
}
```

### 示例 2 - B 级 + 战略储备(稀缺资源)

**输入**:
- 用户长期:AI 硬件出海创业
- 对方:全场唯一执业律师,主攻知识产权

**输出**:
```json
{
  "totalScore": 5.5,
  "level": "B",
  "dimensions": {
    "collaboration": { "score": 3.0, "reason": "本场无合作切面,方向不重叠" },
    "cognitive": { "score": 6.0, "reason": "可了解 AI 产品知识产权的真实风险" },
    "strategic": { "isReserve": true, "reason": "全场唯一律师。你创业到出海阶段,知识产权/海外合规一定用得上" }
  },
  "credibility": { "hasPublicWork": true, "note": "执业资质可验证" },
  "tags": ["律师", "知识产权", "战略储备", "未来用得上"],
  "card": {
    "whyTa": "短期没合作,但你未来 AI 硬件出海一定撞合规问题。全场唯一律师 = 稀缺资源,值得"先存住"。",
    "collision": "现在不合作,留个联系。等你产品要进美国/欧洲市场时,她可能是你最先想起的人。",
    "openingQuestions": [
      "AI 产品出海最常踩的合规坑是什么?",
      "硬件 + AI 这种产品,知识产权保护是分开申请还是打包?",
      "你最近接触的 AI 创业者,踩过哪些法律雷?"
    ]
  }
}
```

---

## 七、迭代纪律(给写代码 AI 看)

如果发现 AI 输出有问题:

| 症状 | 调整 |
|---|---|
| 输出太泛、像简历摘要 | 强化 system 里的"互补 vs 相似"规则 |
| 三段式空话多 | 在 schema 加 `min` 长度约束,逼 AI 写具体 |
| 分数总在 7-8 徘徊 | 调 temperature 到 0.4,或加更多 few-shot |
| 编造对方信息 | 把"绝对禁止-不许编造"放到 system 最前面 |
| 输出 schema 报错 | 检查 generateObject 是否正确传 schema |

**禁止**为了让输出"好看"而修改 schema 字段结构,
schema 改一次,所有前端代码都要跟着改。
