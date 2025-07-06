import React, { useCallback, useEffect, useRef, useState } from 'react'

import { MenuIcon } from '../../shared/ui/icon/menu'

import classes from './styles.module.css'
import { useClickOutside } from '../../shared/lib/useClickOutside'
import { useTranslation } from '../../shared/lib/TranslationContext'
import { Link } from 'react-router-dom'

type LinkType = {
    url: string
    label: string
}

export const Header = () => {
    const [contents, setContents] = useState<null | LinkType[]>(null)
    const [navigationConfig, setNavigationConfig] = useState<null | LinkType[]>(null);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
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

    const translations = useTranslation()
  
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
                            <a href={url}>{label}</a>
                        </li>
                    ))}
                </ul>
            )}
            {navigationConfig && (
                <nav>
                  <ul className={classes.navigation}>
                      {navigationConfig.map(({ url, label }) => (
                          <li key={url}>
                              <Link to={`/vite-react${url}`}>{translations[label]}</Link>
                          </li>
                      ))}
                  </ul>
                </nav>
            )}
        </header>
    )
}
