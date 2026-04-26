"use client"

import { useChat } from "@ai-sdk/react"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { MessageBubble } from "./message-bubble"
import { Bot, Send, Square, Trash2 } from "lucide-react"

const PROVIDERS = [
  { label: "Claude Sonnet 4.6", value: "anthropic", model: "claude-sonnet-4-6" },
  { label: "Claude Haiku 4.5", value: "anthropic", model: "claude-haiku-4-5-20251001" },
  { label: "GPT-4o Mini", value: "openai", model: "gpt-4o-mini" },
  { label: "GPT-4o", value: "openai", model: "gpt-4o" },
]

export function ChatInterface() {
  const [selectedProvider, setSelectedProvider] = useState(PROVIDERS[0])
  const bottomRef = useRef<HTMLDivElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading, stop, setMessages } =
    useChat({
      api: "/api/chat",
      body: {
        provider: selectedProvider.value,
        model: selectedProvider.model,
      },
    })

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (!isLoading && input.trim()) {
        handleSubmit(e as unknown as React.FormEvent)
      }
    }
  }

  return (
    <div className="flex h-screen flex-col">
      {/* 헤더 */}
      <header className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)]">
            <Bot size={18} className="text-[var(--primary-foreground)]" />
          </div>
          <div>
            <h1 className="text-sm font-semibold">AI Starter Kit</h1>
            <p className="text-xs text-[var(--muted-foreground)]">Next.js + Vercel AI SDK</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Select
            className="w-48 text-xs"
            value={`${selectedProvider.value}::${selectedProvider.model}`}
            onChange={(e) => {
              const [value, model] = e.target.value.split("::")
              const found = PROVIDERS.find(
                (p) => p.value === value && p.model === model
              )
              if (found) setSelectedProvider(found)
            }}
          >
            {PROVIDERS.map((p) => (
              <option key={`${p.value}::${p.model}`} value={`${p.value}::${p.model}`}>
                {p.label}
              </option>
            ))}
          </Select>

          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMessages([])}
              title="대화 초기화"
            >
              <Trash2 size={16} />
            </Button>
          )}
        </div>
      </header>

      {/* 메시지 영역 */}
      <main className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-[var(--muted-foreground)]">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--muted)]">
              <Bot size={32} />
            </div>
            <div>
              <p className="font-medium text-[var(--foreground)]">무엇이든 물어보세요</p>
              <p className="text-sm">Enter로 전송, Shift+Enter로 줄바꿈</p>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl space-y-4 p-4">
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}
            {isLoading && (
              <div className="flex gap-3 text-sm">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border)]">
                  <Bot size={16} />
                </div>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-[var(--border)] px-4 py-2.5">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--muted-foreground)] [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--muted-foreground)] [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--muted-foreground)]" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </main>

      {/* 입력 영역 */}
      <footer className="border-t border-[var(--border)] p-4">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-3xl items-end gap-2"
        >
          <Textarea
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="메시지를 입력하세요..."
            className="min-h-[48px] max-h-[200px] resize-none"
            rows={1}
            disabled={isLoading}
          />
          {isLoading ? (
            <Button type="button" variant="outline" size="icon" onClick={stop}>
              <Square size={16} />
            </Button>
          ) : (
            <Button type="submit" size="icon" disabled={!input.trim()}>
              <Send size={16} />
            </Button>
          )}
        </form>
      </footer>
    </div>
  )
}
