import styles from "./Footer.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Footer({ todos, onChangeFilter, onClearAll }) {
    
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('remaining_todo')}>{todos.filter(todo => !todo.complete).length} item left</div>
            <div className={cx('actions')}>
                <button onClick={onClearAll} className={cx('clear-all_btn')}>Remove all</button>
                <select onChange={onChangeFilter} className={cx('selections')}>
                    <option value="completed">Completed</option>
                    <option value="all">All</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>
            </div>
        </div>
    );
}

export default Footer;