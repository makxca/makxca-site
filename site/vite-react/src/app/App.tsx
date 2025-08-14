import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { AboutPage } from '../pages/AboutPage'
import MainPage from '../pages/MainPage'
import { TranslationsProvider } from '../shared/lib/TranslationContext'

const RedirectToLang = () => {
    const supportedLanguages = ['en', 'ru']
    
    return <Navigate to={`/vite-react/${supportedLanguages.find(l => l === navigator.language.split('-')[0]) || supportedLanguages[0]}`} />
}

export const App = () => {
    return (
        <BrowserRouter>
            <TranslationsProvider>
                <Routes>
                    <Route path="/vite-react" element={<RedirectToLang />} />
                    <Route path="/vite-react/en" element={<MainPage />} />
                    <Route path="/vite-react/ru" element={<MainPage />} />
                    <Route path="/vite-react/en/about" element={<AboutPage />} />
                    <Route path="/vite-react/ru/about" element={<AboutPage />} />
                    <Route path="*" element="Not found" />
                </Routes>
            </TranslationsProvider>
        </BrowserRouter>
    )
}
