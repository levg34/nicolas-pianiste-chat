import { render } from 'ejs'
import { getBiographie, getConcerts, getGroups, getRepertory, getStudies } from './api-utils'

export async function getSystemPrompt(): Promise<string> {
    const prompt = Bun.file('./server/data/system-prompt.md')
    const systemPrompt = await prompt.text()
    const [biographie, studies, repertory, concerts, groups] = await Promise.all([
        getBiographie(),
        getStudies(),
        getRepertory(),
        getConcerts(),
        getGroups()
    ])
    return render(systemPrompt, { biographie, studies, repertory, concerts, groups }, { async: true })
}
