import { createSignal } from 'solid-js'
import './App.css'
import Chat from './components/Chat'

function App() {
    const [count, setCount] = createSignal(0)

    return (
        <>
            <h1>Vite + Solid</h1>
            <Chat />
        </>
    )
}

export default App
