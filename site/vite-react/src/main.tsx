import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import { App } from './app/App'

createRoot(document.getElementsByTagName('body')[0]!).render(
    <StrictMode>
        <App />
    </StrictMode>
)
