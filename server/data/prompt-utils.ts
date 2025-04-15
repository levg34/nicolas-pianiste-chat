import { render } from 'ejs'
import { getBiographie, getStudies } from './api-utils'

export async function getSystemPrompt(): Promise<string> {
    const prompt = Bun.file('./server/data/system-prompt.md')
    const systemPrompt = await prompt.text()
    const [biographie, studies] = await Promise.all([getBiographie(), getStudies()])
    return render(systemPrompt, { biographie, studies }, { async: true })
}
