import { useTranslation } from '../../../shared/lib/TranslationContext'
import { Text } from '../../../shared/ui/Text/Text'

export const AboutSite = () => {
    const { translations } = useTranslation()
  
    return (
        <article>
            <h1>{translations.aboutSite}</h1>
            <Text as="p">{translations.siteIdea}</Text>
            <h2>{translations.deploymentTechnology}</h2>
            <Text as="p">{translations.deploymentTechnologyDescription}</Text>
        </article>
    )
}
