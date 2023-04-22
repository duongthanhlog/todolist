import TodoItem from "../TodoItem/TodoItem";
import { useState } from "react";
import TodoForm from "../TodoForm/TodoForm";
import styles from "./TodosList.module.scss";
import classNames from "classnames/bind";
import Footer from "../Footer/Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, handleRemoveAll, removeTodo } from "../../store/todoSlice";

const cx = classNames.bind(styles);

const TodoList = () => {
  const  {todos}  = useSelector(state =>  state.todoList)
  const dispatch = useDispatch()

  const [status, setStatus] = useState('all')
  const [filteredTodos, setFilteredTodos] = useState([])


  useEffect(() => {
    handleFilterTodos()
  }, [status, todos])
  
  const handleFilterTodos = () => {
    switch(status) {
      case 'completed' : 
        setFilteredTodos(todos.filter(item => item.completed === true))
        break;
      case 'uncompleted' :
        setFilteredTodos(todos.filter(item => item.completed === false))
        break;
      default :
        setFilteredTodos(todos);
    }
  }

  const handleAddTodo = (todo) => {
    dispatch(addTodo(todo))
  };
  
  const handleClearAll = () => {
    dispatch(handleRemoveAll())
  }

  const handleChangeFilter = (e) => {
    setStatus(e.target.value)
  }

  return (
    <div className={cx("wrapper")}>
      <h1 className={cx('header')}>What's the Plan for Today</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      {filteredTodos.map(todo => {
        return <TodoItem key={todo.id} todos={todos} todo={todo}/>
        
      })}
      {todos.length > 0 && 
      <Footer 
          onClearAll={handleClearAll} 
          onChangeFilter={handleChangeFilter}
          todos={todos}
          status={status}
      />
      }
    </div>
  );
};

export default TodoList;
