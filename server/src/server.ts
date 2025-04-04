import { serve } from 'bun'

serve({
    port: process.env.PORT || 3000,
    fetch(req, server) {
        if (server.upgrade(req)) {
            return
        }

        return new Response('WebSocket upgrade required', { status: 400 })
    },
    websocket: {
        open(ws) {
            console.log('Client connected')
        },

        message(ws, message) {
            console.log(`Received message: ${message}`)

            ws.publish('chat-room', message.toString())
        },

        close(ws) {
            console.log('Client disconnected')
        }
    }
})
