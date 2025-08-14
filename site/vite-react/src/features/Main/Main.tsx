import { useState } from 'react'

import { useTranslation } from '../../shared/lib/TranslationContext'
import reactLogo from './../../shared/ui/icon/react.svg'
import viteLogo from './../../shared/ui/icon/vite.svg'
import './Main.css'

function Main() {
    const [count, setCount] = useState(0)

    const { translations } = useTranslation()

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
            </div>
            <p className="read-the-docs">
                {translations.viteReactUsed}<br/>
                {translations.sourceCodeAvailableOn} <a href="https://github.com/makxca/makxca-site/tree/main/site/vite-react">GitHub</a>.<br/>
                {translations.clickLogosToLearnMoreAboutViteAndReact}
            </p>
        </div>
    )
}

export default Main
