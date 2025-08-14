import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react'
import { useLocation } from 'react-router-dom'

export const TranslationsContext = createContext<{
  translations: Record<string, string>,
  language: 'ru' | 'en',
}>({
    translations: {},
    language: ['ru', 'en'].includes(navigator.language.substring(0, 2)) ? navigator.language.substring(0, 2) as 'ru' | 'en' : 'en',
})

export const useTranslation = () => useContext(TranslationsContext)

function getProxy(translations: Record<string | symbol, string>) {
    return new Proxy(translations, {
        get: (target, prop) => {
            return target[prop] || prop
        },
    })
}

export const TranslationsProvider = (props: PropsWithChildren) => {
    const [translations, setTranslations] = useState<Record<string, string>>({})
    const pathname = useLocation().pathname
    const language = pathname.match(/\/(ru|en)(\/|$)/)?.[1] as 'ru' | 'en' || (['ru', 'en'].includes(navigator.language.substring(0, 2)) ? navigator.language.substring(0, 2) as 'ru' | 'en' : 'en')

    useEffect(() => {
        (async () => {
            try {
                const languageResponse = await fetch(`/public/labels/${language}.json`)
                if (!languageResponse.ok) {
                    throw 'No translation for' + language
                }
                setTranslations(await languageResponse.json())
            } catch (e) {
                console.error(e)
                const enResponse = await fetch('/public/labels/en.json')
                setTranslations(await enResponse.json())
            }
        })()
    }, [pathname, language])

    const proxy = useMemo(() => getProxy(translations), [translations])

    const value = useMemo(() => ({
        translations: proxy,
        language,
    }), [proxy, language])
  
    return (
        <TranslationsContext.Provider value={value}>
            {props.children}
        </TranslationsContext.Provider>
    )
}

export const LanguageByLang = {
    ru: 'Русский',
    en: 'English',
} as const
