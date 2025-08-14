import { AboutAuthor } from '../AboutAuthor'
import { AboutSite } from '../AboutSite'

import classes from './styles.module.css'

export const AboutComposition = () => {
    return (
        <main className={classes.about}>
            <AboutSite />
            <AboutAuthor />
        </main>
    )
}
