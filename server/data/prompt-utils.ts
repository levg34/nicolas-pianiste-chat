import { render } from 'ejs'
import { getBiographie, getConcerts, getRepertory, getStudies } from './api-utils'

export async function getSystemPrompt(): Promise<string> {
    const prompt = Bun.file('./server/data/system-prompt.md')
    const systemPrompt = await prompt.text()
    const [biographie, studies, repertory, concerts] = await Promise.all([
        getBiographie(),
        getStudies(),
        getRepertory(),
        getConcerts()
    ])
    return render(systemPrompt, { biographie, studies, repertory, concerts }, { async: true })
}
