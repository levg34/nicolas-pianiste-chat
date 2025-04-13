import { createSignal, onMount, onCleanup, createEffect } from 'solid-js'
import './Chat.css'

interface Message {
    role: 'user' | 'assistant'
    content: string
}

function Chat() {
    const [messages, setMessages] = createSignal<Message[]>([])
    const [newMessage, setNewMessage] = createSignal('')
    const [isLoading, setIsLoading] = createSignal(false)
    const [socket, setSocket] = createSignal<WebSocket | null>(null)

    onMount(() => {
        const ws = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL)
        setSocket(ws)

        ws.onopen = () => {
            console.log('Connected to WebSocket server')
            const initialMessage: Message = { role: 'assistant', content: 'Hello, how can I help you?' }
            setMessages([initialMessage])
        }

        ws.onmessage = (event) => {
            const message = event.data
            console.log('Received message:', message)
            const assistantMessage: Message = { role: 'assistant', content: message }
            setMessages((prev) => [...prev, assistantMessage])
            setIsLoading(false)
        }

        ws.onerror = (error) => {
            console.error('WebSocket error:', error)
            const errorMessage: Message = { role: 'assistant', content: 'Error connecting to server' }
            setMessages((prev) => [...prev, errorMessage])
            setIsLoading(false)
        }

        ws.onclose = () => {
            console.log('Disconnected from WebSocket server')
            setSocket(null)
        }
    })

    onCleanup(() => {
        if (socket()) {
            socket()!.close()
        }
    })

    const handleSendMessage = () => {
        if (newMessage().trim() === '' || !socket()) return

        const userMessage: Message = { role: 'user', content: newMessage() }
        setMessages((prev) => [...prev, userMessage])
        setNewMessage('')
        setIsLoading(true)

        socket()!.send(JSON.stringify({ message: userMessage.content }))
    }

    createEffect(() => {
        if (isLoading()) {
            const loadingMessage: Message = { role: 'assistant', content: 'Loading...' }
            if (!messages().some((m) => m.content === 'Loading...')) {
                setMessages((prev) => [...prev, loadingMessage])
            }
        } else {
            setMessages((prev) => prev.filter((m) => m.content !== 'Loading...'))
        }
    })

    return (
        <div class="chat-container">
            <div class="chat-messages">
                {messages().map((message) => (
                    <div class={`message ${message.role}`}>{message.content}</div>
                ))}
            </div>
            <div class="chat-input">
                <input
                    type="text"
                    placeholder="Enter your message"
                    value={newMessage()}
                    onInput={(e) => setNewMessage(e.currentTarget.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSendMessage()
                        }
                    }}
                />
                <button onClick={handleSendMessage} disabled={isLoading()}>
                    Send
                </button>
            </div>
        </div>
    )
}

export default Chat
