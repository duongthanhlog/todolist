import { useState } from "react";
import styles from "./TodoForm.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);


function TodoForm({ onAddTodo }) {
    const [value, setValue] = useState('')

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const text = value.trim()
        if(!text) {
            return
        }
        onAddTodo({
            text : value,
            completed : false,
            editing : false
        })
        setValue('')
    }

    return ( 
        <form onSubmit={handleSubmit}>
            <input value={value} onChange={handleChange} type="text" placeholder="Enter todo"/>
            <button className={cx('submit_btn')}>
                +
            </button>
        </form>
     );
}

export default TodoForm;