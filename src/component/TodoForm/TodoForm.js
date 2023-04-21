import { useState } from "react";
import styles from "./TodoForm.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { setTodo } from "../../store/todoSlice";

const cx = classNames.bind(styles);


function TodoForm({ addTodo }) {
    const {todo} = useSelector(state => state.todoList)  
    const [value, setValue] = useState('')
    const dispatch = useDispatch()  

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addTodo(value))
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