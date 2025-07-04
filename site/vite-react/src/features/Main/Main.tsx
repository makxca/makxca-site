import { useState } from 'react'

import reactLogo from './../../shared/ui/icon/react.svg'
import viteLogo from './../../shared/ui/icon/vite.svg'
import './Main.css'

function Main() {
    const [count, setCount] = useState(0)

    return (
        <div className="main">
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount(count => count + 1)} className="counter">
          count is {count}
                </button>
                <p>
          Edit <code>src/Main.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
        Click on the Vite and React logos to learn more
            </p>
        </div>
    )
}

export default Main
