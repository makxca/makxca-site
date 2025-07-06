import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import { App } from './app/App'
import { TranslationsProvider } from './shared/lib/TranslationContext'

createRoot(document.getElementsByTagName('body')[0]!).render(
    <StrictMode>
        <TranslationsProvider>
            <App />
        </TranslationsProvider>
    </StrictMode>
)
