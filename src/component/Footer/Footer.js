import { useDispatch, useSelector } from "react-redux";
import styles from "./Footer.module.scss";
import classNames from "classnames/bind";
import { filterTodosSelector } from "../../store/selectors";

const cx = classNames.bind(styles);

function Footer({ onChangeFilter, onClearAll, remainingTodos }) {
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('remaining_todo')}>{remainingTodos} item left</div>
            <div className={cx('actions')}>
                <button onClick={onClearAll} className={cx('clear-all_btn')}>Remove all</button>
                <select onChange={onChangeFilter} className={cx('selections')}>
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>
            </div>
        </div>
    );
}

export default Footer;