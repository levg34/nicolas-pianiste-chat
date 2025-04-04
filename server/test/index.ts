import { Conversation } from '../src/llm-utils'

const conversation = await Conversation.new()

const messages = [
    'Hello via Bun!',
    'Tell me what can you do for me?',
    'Tell me more',
    'I like that!',
    'Can you recap our conversation so far?'
]

for (const message of messages) {
    console.log(message)
    const response = await conversation.getResponse(message)
    console.log(response)
    console.log('')
}
