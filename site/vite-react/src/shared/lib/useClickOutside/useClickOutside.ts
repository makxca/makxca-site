import { useEffect } from 'react'

export const useClickOutside = (
    ref: { current: HTMLElement | null },
    handler: () => void
) => {
    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (
                ref.current
                && !ref.current.contains(event.target as Element)
            ) {
                handler()
            }
        }

        document.addEventListener('mouseup', handleClickOutside)
        document.addEventListener('touchend', handleClickOutside)

        return () => {
            document.removeEventListener('mouseup', handleClickOutside)
            document.addEventListener('touchend', handleClickOutside)
        }
    }, [ref, handler])
}
