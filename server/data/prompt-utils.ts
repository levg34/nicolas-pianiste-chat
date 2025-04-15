import { render } from 'ejs'
import { getBiographie } from './api-utils'

export async function getSystemPrompt(): Promise<string> {
    const prompt = Bun.file('./server/data/system-prompt.md')
    const systemPrompt = await prompt.text()
    const [biographie] = await Promise.all([getBiographie()])
    return render(systemPrompt, { biographie }, { async: true })
}
