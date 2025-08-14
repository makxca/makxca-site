import { useTranslation } from '../../../shared/lib/TranslationContext'
import { Text } from '../../../shared/ui/Text/Text'

export const AboutAuthor = () => {
    const { translations } = useTranslation()
  
    return (
        <article>
            <h2>{translations.aboutAuthor}</h2>
            <Text as="p">{translations.aboutAuthorDescription}</Text>
        </article>
    )
}
