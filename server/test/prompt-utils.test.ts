import { describe, expect, it } from 'bun:test'
import { getSystemPrompt } from '../data/prompt-utils'

describe('test getSystemPrompt', () => {
    it('should contain the bio', async () => {
        const systemPrompt = await getSystemPrompt()
        console.log(systemPrompt)
        expect(systemPrompt).toContain(
            'Nicolas Dross est un artiste curieux, dans tous les sens du terme, et ce dès son plus jeune âge'
        )
    })
})
