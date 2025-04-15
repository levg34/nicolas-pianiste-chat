import OpenAI from 'openai'
import { getSystemPrompt } from '../data/prompt-utils'

const client = new OpenAI({
    baseURL: process.env.LLM_ENDPOINT,
    apiKey: process.env.SCW_SECRET_KEY
})

export class Conversation {
    messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]

    private constructor(systemPrompt: string) {
        this.messages = [{ role: 'system', content: systemPrompt }]
    }

    static async new(): Promise<Conversation> {
        const systemPrompt = await getSystemPrompt()
        return new Conversation(systemPrompt)
    }

    async getResponse(userMessage: string): Promise<string> {
        const stream = await client.chat.completions.create({
            model: 'deepseek-r1-distill-llama-70b',
            messages: [...this.messages, { role: 'user', content: userMessage }],
            max_tokens: 512,
            temperature: 0.6,
            top_p: 0.95,
            presence_penalty: 0,
            stream: true
        })

        this.messages.push({ role: 'user', content: userMessage })

        let response = ''

        for await (const chunk of stream) {
            response += chunk.choices[0]?.delta?.content || ''
        }

        this.messages.push({ role: 'assistant', content: response })

        return response
    }
}
