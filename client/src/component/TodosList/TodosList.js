import { useDispatch, useSelector } from "react-redux";
import { addTodo, fetchTodos } from "../../store/Slices/todoSlice";
import { filterTodosSelector } from "../../store/selectors";
import { changeStatus } from "../../store/Slices/filterSlice";
import { clearAllTodo } from "../../store/Slices/todoSlice";

import TodoItem from "../TodoItem/TodoItem";
import TodoForm from "../TodoForm/TodoForm";
import styles from "./TodosList.module.scss";
import classNames from "classnames/bind";
import Footer from "../Footer/Footer";
import { saveToStorage } from "../../store/store";
import { useEffect } from "react";
import { editTodo, updateTodo, removeTodo, toggleCompleteTodo } from "../../store/Slices/todoSlice";


const cx = classNames.bind(styles);

const TodoList = () => {
  const dispatch = useDispatch()
  const {filteredTodos, remainingTodos} = useSelector(filterTodosSelector)
  // const data = useSelector(state => state.todoList.todos)
  

  const handleAddTodo = async (todo) => {
    const res =  await fetch('http://localhost:5000/todos', {
           method: 'POST', 
           headers: {
        'Content-Type': 'application/json' 
    },
           body: JSON.stringify(todo)
      })
    const savedTodo = await res.json()
    dispatch(addTodo(savedTodo))
  };

  const handleChangeFilter = (e) => {
    const status = e.target.value
    dispatch(changeStatus(status))
  }

  const handleClearAll = () => {
    dispatch(clearAllTodo())
  }

  const toggleTodo = async (todo) => {
      const res =  await fetch(`http://localhost:5000/todos/${todo._id}`, {
           method: 'PATCH', 
           headers: {
        'Content-Type': 'application/json' 
    },
    body : JSON.stringify({completed : !todo.completed})
      })
      const updatedTodo = await res.json()
    dispatch(toggleCompleteTodo(updatedTodo))
  }

  const handleEdit = (todo) => {
    return !todo.editing ? toggleTodo : () => { }
  }
  
  return (
    <div className={cx("wrapper")}>
      <h1 className={cx('header')}>What's the Plan for Today</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      {filteredTodos.map(todo => {
        console.log(todo);
          return <TodoItem key={todo._id} todo={todo} onEdit={() => handleEdit(todo)} onToggle={() => toggleTodo(todo)}/>
      })}
      {filteredTodos.length > 0 && <Footer
        onChangeFilter={handleChangeFilter}
        onClearAll={handleClearAll}
        remainingTodos={remainingTodos}
      />}
    </div>
  );
};

export default TodoList;
