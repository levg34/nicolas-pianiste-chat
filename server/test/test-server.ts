// const ws = new WebSocket('ws://localhost:' + (process.env.PORT ?? 3000))
const ws = new WebSocket('wss://nicolas-pianiste-chat-619867312973.europe-west9.run.app')

ws.onopen = () => {
    console.log('Connected to server')
    ws.send('Hello from client!')
}

ws.onmessage = (event) => {
    console.log(`Received: ${event.data}`)
}

ws.onclose = () => {
    console.log('Disconnected from server')
}
