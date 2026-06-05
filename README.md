# Encounter

> 碰一下,让 AI 替你在人海中找到最适合的人。

线下科技活动几百人,你不可能逐个聊。
Encounter 让你碰一下对方的 NFC,**30 秒**拿到一张 AI 作战卡片:
总分 + 三维度 + "你该问 TA 的 3 句话"。

把过去 **3 小时聊 18 人** 的人脉决策,压缩到几分钟。

---

## 🎬 现场看

📊 **PPT 公开版**:[点击查看](https://demifanholdon-ops.github.io/encounter-app/deck.html) *(GitHub Pages 部署后生效)*

🚀 **产品 Demo**:待补充 Vercel 部署链接

---

## ✨ 核心特性

- 🪪 **碰一下 NFC** → 自动跳转,iPhone / 安卓全兼容
- 🧠 **三层诉求驱动** → 长期 / 中期 / 短期目标喂给 AI,匹配跟着场景走
- 🎯 **三维度打分** → 合作匹配度 + 认知获取价值 + 战略储备标记
- 💡 **三段式作战卡** → 为什么是 TA / 能碰撞什么 / 开口问的 3 句话
- 📋 **群体列表模式** → S/A/B 分级排序,一眼看到当下最适合你的人
- 🧬 **AI 帮你记住** *(roadmap)* → 未来项目缺人,AI 主动推送匹配的老朋友

---

## 🎨 设计原则

> 我们不做"碰一下加好友"——那个动作不新。
> 我们的差异在 **碰完之后 AI 给你什么、关系存哪、能不能复用**。

**厚** — 事前 / 事中 / 事后都比传统名片厚一层
**活** — 匹配随场景动态变化,人是立体的乐高,不是一张静态简历

---

## 🏗 技术栈

| 层 | 选型 |
|---|---|
| 框架 | Next.js 14+ (App Router) + TypeScript |
| 样式 | Tailwind CSS |
| AI | Vercel AI SDK + GPT-4o(`generateObject` 结构化输出) |
| Schema | Zod |
| 数据 | JSON 文件 + `localStorage`(演示阶段不上数据库) |
| 部署 | Vercel(自动 HTTPS,iPhone NFC 必需) |
| NFC 写入 | NFC Tools App(零代码) |

---

## 🚀 本地运行

```bash
git clone https://github.com/demifanholdon-ops/encounter-app.git
cd encounter-app

npm install            # 或 pnpm install

cp .env.example .env.local
# 在 .env.local 填入:
# OPENAI_API_KEY=sk-...

npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

### 部署到 Vercel
```bash
vercel --prod
```
在 Vercel Dashboard 配置 `OPENAI_API_KEY` 环境变量。

### NFC 贴纸写入(零代码)
1. 手机下载 **NFC Tools** App
2. 选择 "Write" → "URL/URI"
3. 写入 `https://your-deployment.vercel.app/encounter/<person_id>`

---

## 📂 文档导航

| 文件 | 内容 |
|---|---|
| [`CLAUDE.md`](./CLAUDE.md) | 项目入口指令(AI 开发工具读) |
| [`01_PRD.md`](./01_PRD.md) | 产品需求文档 |
| [`03_AI打分Prompt规格.md`](./03_AI打分Prompt规格.md) | 核心 Prompt + JSON Schema + 示例 |
| [`data/`](./data) | 演示用人物数据 |
| [`src/`](./src) | 应用代码 |

---

## 🗺 路线图

| 阶段 | 内容 |
|---|---|
| **v1.0 · MVP** | NFC 碰一下 + AI 三段式 + S/A/B 列表 ← 当前 |
| **v1.5 · 3 个月** | "AI 帮你记住" · 跨活动人脉沉淀 + 检索 |
| **v2.0 · 6 个月** | AI 分身互聊 · 见面前自动沟通,提炼精华信息 |
| **v3.0 · 12 个月** | 硬件升级 + B 端 SaaS(行业大会 / 广交会 / 招聘) |
| **终局** | AI 时代的人脉协议层 |

---

## 🏆 项目背景

诞生于 **Rebase 2026 AI Hacker House(武汉)**

正在参与 **浦软黑客松**

---

## 📄 License

MIT
