import styles from "./Footer.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";

const cx = classNames.bind(styles);

function Footer({ handleFilterTodos, todos, handleClearAll }) {
    
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('remaining_todo')}>{todos.filter(todo => !todo.complete).length} item left</div>
            <div className={cx('actions')}>
                <button onClick={handleClearAll} className={cx('clear-all_btn')}>Remove all</button>
                <select onChange={handleFilterTodos} className={cx('selections')}>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                    <option value="all">All</option>
                </select>
            </div>
        </div>
    );
}

export default Footer;