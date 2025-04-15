import { render } from 'ejs'
import { getBiographie, getRepertory, getStudies } from './api-utils'

export async function getSystemPrompt(): Promise<string> {
    const prompt = Bun.file('./server/data/system-prompt.md')
    const systemPrompt = await prompt.text()
    const [biographie, studies, repertory] = await Promise.all([getBiographie(), getStudies(), getRepertory()])
    return render(systemPrompt, { biographie, studies, repertory }, { async: true })
}
