import TodoItem from "../TodoItem/TodoItem";
import { useState } from "react";
import TodoForm from "../TodoForm/TodoForm";
import styles from "./TodosList.module.scss";
import classNames from "classnames/bind";
import Footer from "../Footer/Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo } from "../../store/todoSlice";

const cx = classNames.bind(styles);

const TodoList = () => {
  // const storageJobs = JSON.parse(localStorage.getItem('jobs'))
  const  {todos}  = useSelector(state =>  state.todoList)
  const dispatch = useDispatch()
  console.log(todos)  
  // const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all')
  const [filteredTodos, setFilteredTodos] = useState([])

  

  // useEffect(() => {
  //   switch(status) {
  //     case 'completed' : 
  //         setFilteredTodos(todos.filter(todo => todo.complete))
  //         break
  //     case 'uncompleted' : 
  //         setFilteredTodos(todos.filter(todo => !todo.complete))
  //         break;
  //     case 'all' :
  //         setFilteredTodos(todos)
  //         break;
  //   }
  // }, [todos, status])


  const addTodo = (todo) => {
  };
  
  const handleClearAll = () => {
    setStatus('all')
  }

  const handleFilterTodos = (e) => {
    setStatus(e.target.value)
  }

  return (
    <div className={cx("wrapper")}>
      <h1 className={cx('header')}>What's the Plan for Today</h1>
      <TodoForm addTodo={addTodo} />
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todos={todos}  todo={todo}/>
      ))}
      {todos.length > 0 && 
      <Footer 
          handleClearAll={handleClearAll} 
          handleFilterTodos={handleFilterTodos}
          todos={todos}
          status={status}
      />
      }
    </div>
  );
};

export default TodoList;
