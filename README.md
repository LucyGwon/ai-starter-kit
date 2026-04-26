# 🤖 AI Starter Kit

**Next.js + Vercel AI SDK + Claude**로 만든 AI 채팅 애플리케이션 스타터 킷입니다.

## 기술 스택

| 카테고리 | 기술 |
|---|---|
| 프레임워크 | Next.js 16 (App Router) |
| 언어 | TypeScript |
| AI SDK | Vercel AI SDK |
| LLM | Claude (Anthropic), GPT (OpenAI) |
| 스타일링 | Tailwind CSS |
| UI 컴포넌트 | 커스텀 (shadcn/ui 기반) |
| 패키지 매니저 | pnpm |

## 주요 기능

- **멀티 프로바이더** — Claude / GPT 모델 전환 (드롭다운)
- **실시간 스트리밍** — 타이핑 애니메이션 효과
- **스트리밍 중단** — Stop 버튼으로 즉시 중단
- **대화 초기화** — 새 대화 시작
- **다크 모드** — 시스템 설정 자동 감지
- **Enter 전송** — Shift+Enter 줄바꿈

## 빠른 시작

### 1. 클론

```bash
git clone https://github.com/YOUR_USERNAME/ai-starter-kit.git
cd ai-starter-kit
```

### 2. 의존성 설치

```bash
pnpm install
```

### 3. 환경 변수 설정

```bash
cp .env.example .env.local
```

`.env.local` 파일을 열고 API 키를 입력합니다:

```env
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...          # 선택사항
SYSTEM_PROMPT=당신은 도움이 되는 AI 어시스턴트입니다.  # 선택사항
```

### 4. 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 `http://localhost:3000`을 열면 됩니다.

## 프로젝트 구조

```
src/
├── app/
│   ├── api/chat/route.ts     # AI 스트리밍 API 엔드포인트
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── chat/
│   │   ├── chat-interface.tsx  # 메인 채팅 UI
│   │   └── message-bubble.tsx  # 메시지 컴포넌트
│   └── ui/
│       ├── button.tsx
│       ├── textarea.tsx
│       └── select.tsx
└── lib/
    └── utils.ts
```

## 환경 변수

| 변수 | 필수 | 설명 |
|---|---|---|
| `ANTHROPIC_API_KEY` | Claude 사용 시 | Anthropic 콘솔에서 발급 |
| `OPENAI_API_KEY` | GPT 사용 시 | OpenAI 플랫폼에서 발급 |
| `SYSTEM_PROMPT` | 선택 | AI 시스템 프롬프트 |

## 지원 모델

| 모델 | 프로바이더 |
|---|---|
| Claude Sonnet 4.6 | Anthropic |
| Claude Haiku 4.5 | Anthropic |
| GPT-4o Mini | OpenAI |
| GPT-4o | OpenAI |

## 배포 (Vercel)

```bash
pnpm dlx vercel
```

환경 변수는 Vercel 대시보드 → Settings → Environment Variables에서 설정합니다.

## 라이선스

MIT
