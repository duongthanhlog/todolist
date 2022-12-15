import TodoItem from "../TodoItem/TodoItem";
import { useState } from "react";
import TodoForm from "../TodoForm/TodoForm";
import UseStorage from "../Hooks/UseStorage";
import styles from "./TodosList.module.scss";
import classNames from "classnames/bind";
import Footer from "../Footer/Footer";
import { useEffect } from "react";

const cx = classNames.bind(styles);

const TodoList = () => {
  const storageJobs = JSON.parse(localStorage.getItem('jobs'))

  const [todos, setTodos] = useState(() =>  storageJobs ?? []);
  const [status, setStatus] = useState('all')
  const [filteredTodos, setFilteredTodos] = useState([])

  

  useEffect(() => {
    switch(status) {
      case 'completed' : 
          setFilteredTodos(todos.filter(todo => todo.complete === true))
          break
      case 'uncompleted' : 
          setFilteredTodos(todos.filter(todo => todo.complete === false))
          break;
      case 'all' :
          setFilteredTodos(todos)
          break;
    }
  }, [todos, status])


  const addTodo = (todo) => {
    setTodos(UseStorage('jobs', [...todos, todo]));
  };
  
  const handleClearAll = () => {
    setTodos(UseStorage('jobs', []))
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
        <TodoItem key={todo.id} todos={todos} setTodos={setTodos} todo={todo}/>
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
