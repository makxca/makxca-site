import React, { useCallback, useRef, useState } from 'react'

import { useClickOutside } from '../../lib/useClickOutside'

import classes from './styles.module.css'

export interface DropdownProps {
  options: {
    key: string;
    element: React.ReactNode;
  }[];
  onChange: (key: string) => void;
  current: React.ReactNode;
  children?: React.ReactNode;
}

export const Dropdown = (props: DropdownProps) => {
    const {
        options,
        onChange,
        current,
        children,
    } = props

    const [visible, setVisible] = useState(false)
  
    const optionsRef = useRef(null)
    const setInvisible = useCallback(() => setVisible(false), [])
    const toggleVisible = useCallback(() => setVisible(visible => !visible), [])
    useClickOutside(optionsRef, setInvisible)
  
    return (
        <div className={classes.dropdown}>
            <button onClick={toggleVisible}>{current}</button>
            {visible && <ul ref={optionsRef} className={classes.menu}>
                {children}
                {options.map(option => (
                    <li key={option.key} onClick={() => onChange(option.key)}>
                        {option.element}
                    </li>
                ))}
            </ul>}
        </div>
    )
}
