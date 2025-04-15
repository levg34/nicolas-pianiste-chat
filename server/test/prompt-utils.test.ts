import { describe, expect, it } from 'bun:test'
import { getSystemPrompt } from '../data/prompt-utils'
import { write } from 'bun'

describe('test getSystemPrompt', () => {
    it('should contain the bio', async () => {
        const systemPrompt = await getSystemPrompt()
        console.log(systemPrompt)
        await write('test.md', systemPrompt)
        expect(systemPrompt).toContain(
            'Nicolas Dross est un artiste curieux, dans tous les sens du terme, et ce dès son plus jeune âge'
        )
    })
})
