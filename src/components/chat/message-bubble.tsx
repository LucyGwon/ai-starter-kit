"use client"

import { cn } from "@/lib/utils"
import { type Message } from "ai"
import { Bot, User } from "lucide-react"

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user"

  return (
    <div className={cn("flex gap-3 text-sm", isUser && "flex-row-reverse")}>
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser
            ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
            : "border border-[var(--border)] bg-[var(--background)]"
        )}
      >
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>

      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5 leading-relaxed",
          isUser
            ? "rounded-tr-sm bg-[var(--primary)] text-[var(--primary-foreground)]"
            : "rounded-tl-sm border border-[var(--border)] bg-[var(--card)]"
        )}
      >
        <p className="whitespace-pre-wrap">{message.content as string}</p>
      </div>
    </div>
  )
}
