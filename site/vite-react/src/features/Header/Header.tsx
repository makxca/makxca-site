import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { clsx } from '../../shared/lib/classes'
import { useTranslation, LanguageByLang } from '../../shared/lib/TranslationContext'
import { useClickOutside } from '../../shared/lib/useClickOutside'
import { Dropdown } from '../../shared/ui/Dropdown'
import { MenuIcon } from '../../shared/ui/icon/menu'

import classes from './styles.module.css'

type LinkType = {
    url: string
    label: string
}

export const Header = () => {
    const [contents, setContents] = useState<null | LinkType[]>(null)
    const [navigationConfig, setNavigationConfig] = useState<null | LinkType[]>(null)
    const [isMenuVisible, setIsMenuVisible] = useState(false)
    const handleOpenMenu = useCallback(() => {
        setIsMenuVisible(true)
    }, [])
    const handleCloseMenu = useCallback(() => {
        setIsMenuVisible(false)
    }, [])

    const menuRef = useRef<HTMLUListElement>(null)
    useClickOutside(menuRef, handleCloseMenu)

    useEffect(() => {
        fetch('/public/contents.json')
            .then(response => response.json())
            .then(data => setContents(data))
            .catch(error => console.error(error))
    }, [])

    useEffect(() => {
        fetch('/public/navigation.json')
            .then(response => response.json())
            .then(data => setNavigationConfig(data))
            .catch(error => console.error(error))
    }, [])

    const { translations, language } = useTranslation()
  
    return (
        <header className={classes.header}>
            <button className={classes.menuButton} onClick={handleOpenMenu}>
                <MenuIcon className={classes.icon}/>
            </button>
            {isMenuVisible && contents && (
                <ul className={classes.menuList} ref={menuRef}>
                    <h3 className={classes.title}>{translations.contents}</h3>
                    {contents.map(({ url, label }) => (
                        <li key={url}>
                            <a href={url} className={/vite-react/.test(window.location.pathname) ? classes.active : undefined}>{label}</a>
                        </li>
                    ))}
                </ul>
            )}
            {navigationConfig && (
                <nav>
                    <ul className={classes.navigation}>
                        {navigationConfig.map(({ url, label }) => (
                            <li key={url}>
                                <Link to={`/vite-react/${language}${url}`} className={clsx(new RegExp(`/vite-react/${language}${url}$`).test(window.location.pathname) ? classes.active : undefined)}>{translations[label]}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
            <Dropdown 
                options={[{
                    key: 'en',
                    element: <Link to={`/vite-react/en/${location.pathname.split('/').slice(3).join()}`}>English</Link>,
                }, {
                    key: 'ru',
                    element: <Link to={`/vite-react/ru/${location.pathname.split('/').slice(3).join()}`}>Русский</Link>,
                }]}
                current={LanguageByLang[language]}
                onChange={() => {}}
            >
                <h3 className={classes.dropdownTitle}>{translations.selectLanguage}</h3>
            </Dropdown>
        </header>
    )
}
