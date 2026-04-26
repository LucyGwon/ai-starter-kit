import { anthropic } from "@ai-sdk/anthropic"
import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"
import { z } from "zod"

export const maxDuration = 30

const requestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string(),
    })
  ),
  provider: z.enum(["anthropic", "openai"]).default("anthropic"),
  model: z.string().optional(),
})

export async function POST(req: Request) {
  const body = await req.json()
  const { messages, provider, model } = requestSchema.parse(body)

  const selectedModel =
    provider === "openai"
      ? openai(model ?? "gpt-4o-mini")
      : anthropic(model ?? "claude-sonnet-4-6")

  const result = streamText({
    model: selectedModel,
    system:
      process.env.SYSTEM_PROMPT ??
      "You are a helpful AI assistant. Answer concisely and accurately.",
    messages,
  })

  return result.toDataStreamResponse()
}
