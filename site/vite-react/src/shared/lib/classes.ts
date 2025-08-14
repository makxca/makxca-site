type classItem = string | undefined | false

export const clsx = (...items: classItem[]) => {
    const itemsClear = items.filter(item => !!item) as string[]
    return itemsClear.join(' ')
}