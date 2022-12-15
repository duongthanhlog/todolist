import { useState } from "react";
import styles from "./TodoForm.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function TodoForm({ addTodo }) {
    const [input, setInput] = useState('')
    
    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(input.trim()) {
            addTodo({
              id: Date.now(),
              text: input,
              complete : false,
              editing : false,
            })
        }
        setInput('')
    }

    return ( 
        <form onSubmit={handleSubmit}>
            <input value={input} onChange={handleChange} type="text" placeholder="Enter todo"/>
            <button className={cx('submit_btn')}>
                +
            </button>
        </form>
     );
}

export default TodoForm;