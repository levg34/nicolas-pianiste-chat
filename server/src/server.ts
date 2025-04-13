import { serve } from 'bun'
import { existsSync } from 'fs'
import { Conversation } from './llm-utils'

// Map to store conversations for each WebSocket client.
const conversations = new Map<Bun.ServerWebSocket<unknown>, Promise<Conversation>>()

serve({
    port: process.env.PORT || 3000,
    fetch(req, server) {
        const url = new URL(req.url)
        if (url.pathname === '/chat') {
            const filePath = './client/dist/index.html'
            if (existsSync(filePath)) {
                const file = Bun.file(filePath)
                return new Response(file)
            } else {
                return new Response('Client not found', { status: 404 })
            }
        }
        if (server.upgrade(req)) {
            return
        }

        return new Response('WebSocket upgrade required', { status: 400 })
    },
    websocket: {
        async open(ws) {
            console.log('Client connected')

            // Create a new conversation for this client and store the promise in the Map
            const conversationPromise = Conversation.new()
            conversations.set(ws, conversationPromise)

            // try {
            //     const conversation = await conversationPromise
            //     console.log('Conversation initialized for client')
            // } catch (error) {
            //     console.error('Error initializing conversation:', error)
            //     ws.send('Failed to initialize conversation')
            // }
        },

        async message(ws, message) {
            console.log(`Received message: ${message}`)

            // Retrieve the conversation promise for this client
            const conversationPromise = conversations.get(ws)

            if (!conversationPromise) {
                console.warn('No conversation found for client')
                ws.send('No conversation')
                return
            }

            try {
                // Wait for the conversation to be initialized
                const conversation = await conversationPromise

                const response = await conversation.getResponse(message.toString())
                if (response) {
                    ws.send(response)
                } else {
                    ws.send('No response')
                }
            } catch (error) {
                console.error('Error processing message:', error)
                ws.send('Error processing your message')
            }
        },

        close(ws) {
            console.log('Client disconnected')

            // Delete the conversation promise for this client
            if (conversations.has(ws)) {
                conversations.delete(ws)
                console.log('Conversation deleted for client')
            }
        }
    }
})
