import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";

export const TranslationsContext = createContext<Record<string, string>>({})

export const useTranslation = () => useContext(TranslationsContext)

function getProxy(translations: Record<string | symbol, string>) {
  return new Proxy(translations, {
    get: (target, prop) => {
      return target[prop] || prop
    }
  })
}

export const TranslationsProvider = (props: PropsWithChildren) => {
  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    (async () => {
      let language = window.location.pathname.match(/\/(ru|en)(\/|$)/)?.[0] || navigator.language.substring(0, 2);
      try {
        const languageResponse = await fetch(`/public/labels/${language}.json`)
        if (!languageResponse.ok) {
          throw "No translation"
        }
        setTranslations(await languageResponse.json())
      } catch (_) {
        const enResponse = await fetch(`/public/labels/en.json`)
        setTranslations(await enResponse.json())
      }
    })()
  }, [])

  const proxy = useMemo(() => getProxy(translations), [translations])
  
  return (
    <TranslationsContext.Provider value={proxy}>
      {props.children}
    </TranslationsContext.Provider>
  )
}
