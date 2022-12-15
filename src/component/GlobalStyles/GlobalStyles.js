import styles from './GlobalStyles.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)


function GlobalStyles({children}) {
    return children
}

export default GlobalStyles;