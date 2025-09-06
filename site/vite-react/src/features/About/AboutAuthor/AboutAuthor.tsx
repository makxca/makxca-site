import { useTranslation } from '../../../shared/lib/TranslationContext'
import { Text } from '../../../shared/ui/Text/Text'

import classes from './styles.module.css'

export const AboutAuthor = () => {
    const { translations } = useTranslation()
  
    return (
        <article className={classes.flex}>
            <h2>{translations.aboutAuthor}</h2>
            <div className={classes.textAndImage}>
                <Text as="div">{translations.aboutAuthorDescription}</Text>
                <img src="/public/me.png" alt="Author" />
            </div>
        </article>
    )
}
