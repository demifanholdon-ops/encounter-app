# Encounter

碰一下 NFC,AI 替用户在线下活动里找到最适合的人。两天黑客松 demo,不是生产代码。

## 技术栈(写死,不许换)
Next.js (App Router) + Tailwind + Vercel AI SDK + GPT-4o + Vercel 部署
数据:JSON 文件(测试人) + localStorage(扫到的人)
无后端数据库,无用户系统。

## 你必须先读
- `docs/01_PRD.md` — 做什么、不做什么
- `docs/02_技术架构.md` — 系统怎么搭
- `docs/03_AI打分Prompt规格.md` — AI 输出格式必须严格遵守

## 红线(违反即停)
- 不写真实 NFC 双向通信,只读 URL 跳转
- 不接数据库、不做登录、不做支付
- AI 输出必须严格符合 PRD 定义的 JSON schema,不允许自由发挥
- 不直接调 OpenAI,统一走 Vercel AI SDK
- 写代码前先复述要做什么,等用户确认再动手
