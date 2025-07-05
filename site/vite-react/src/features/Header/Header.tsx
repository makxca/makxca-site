import React, { useEffect, useState } from 'react'

import { MenuIcon } from '../../shared/icon/menu'

import classes from './styles.module.css'

export const Header = () => {
    const [Config, setConfig] = useState<null | { url: string; label: string }[]>(null)

    useEffect(() => {
        fetch('/public/contents.json')
            .then(response => response.json())
            .then(data => setConfig(data))
    }, [])
  
    return (
        <header className={classes.header}>
            <MenuIcon />
            {JSON.stringify(Config, undefined, 2)}
        </header>
    )
}
