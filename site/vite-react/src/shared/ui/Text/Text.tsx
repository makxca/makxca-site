import { type ElementType, type PropsWithChildren } from 'react'
import ReactMarkdown from 'react-markdown'

export interface TextProps extends PropsWithChildren{
  as?: ElementType;
}

// const mapStringToNode = {
//   "\n": 'br',
//   '&nbsp;': () => <>&nbsp;</>,
//   '&mdash;': () => <>&mdash;</>,
// } as const

// function withDecorators(text: string) {
//   let result: React.ReactNode[] = typeof text === "string" ? [text] : text;
//   Object.entries(mapStringToNode).forEach(([replacedText, ReplaceComponent]) => {
//     result = result.flatMap(el => typeof el === "string" ? el.split(replacedText).reduce((acc, cur) => [...acc, <ReplaceComponent/>, cur], [] as React.ReactNode[]).slice(1) : el)
//   })
//   return result
// }

export const Text = (props: TextProps) => {
    const {
        as: Component = 'span',
        children,
    } = props
  
    return (
        <Component>{typeof children === 'string' ? <ReactMarkdown>{children}</ReactMarkdown> : children}</Component>
    )
}
