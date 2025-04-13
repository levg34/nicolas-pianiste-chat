import { createSignal, onMount } from 'solid-js'
import './Chat.css'

interface Message {
    role: 'user' | 'assistant'
    content: string
}

function Chat() {
    const [messages, setMessages] = createSignal<Message[]>([])
    const [newMessage, setNewMessage] = createSignal('')
    const [isLoading, setIsLoading] = createSignal(false)

    const handleSendMessage = async () => {
        if (newMessage().trim() === '') return

        const userMessage: Message = { role: 'user', content: newMessage() }
        setMessages([...messages(), userMessage])
        setNewMessage('')
        setIsLoading(true)

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ messages: [...messages(), userMessage] })
            })

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const data = await response.json()
            const assistantMessage: Message = { role: 'assistant', content: data.message }
            setMessages([...messages(), assistantMessage])
        } catch (error) {
            console.error('Error sending message:', error)
            const errorMessage: Message = { role: 'assistant', content: 'Error sending message' }
            setMessages([...messages(), errorMessage])
        } finally {
            setIsLoading(false)
        }
    }

    onMount(() => {
        const initialMessage: Message = { role: 'assistant', content: 'Hello, how can I help you?' }
        setMessages([initialMessage])
    })

    return (
        <div class="chat-container">
            <div class="chat-messages">
                {messages().map((message) => (
                    <div class={`message ${message.role}`}>{message.content}</div>
                ))}
                {isLoading() && <div class="message assistant">Loading...</div>}
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
