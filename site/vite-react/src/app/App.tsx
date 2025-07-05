import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import MainPage from '../pages/MainPage'

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/vite-react" element={<MainPage />} />
                <Route path="*" element="Not found" />
            </Routes>
        </BrowserRouter>
    )
}
