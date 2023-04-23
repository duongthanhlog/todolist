import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../../store/todoSlice";
import { filterTodosSelector } from "../../store/selectors";
import { changeStatus } from "../../store/filterSlice";
import { clearAllTodo } from "../../store/todoSlice";

import TodoItem from "../TodoItem/TodoItem";
import TodoForm from "../TodoForm/TodoForm";
import styles from "./TodosList.module.scss";
import classNames from "classnames/bind";
import Footer from "../Footer/Footer";

const cx = classNames.bind(styles);

const TodoList = () => {
  const dispatch = useDispatch()
  const { filteredTodos, remainingTodos } = useSelector(filterTodosSelector)
  

  const handleAddTodo = (todo) => {
    dispatch(addTodo(todo))
  };

  const handleChangeFilter = (e) => {
    const status = e.target.value
    dispatch(changeStatus(status))
  }

  const handleClearAll = () => {
    dispatch(clearAllTodo())
  }

  return (
    <div className={cx("wrapper")}>
      <h1 className={cx('header')}>What's the Plan for Today</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      {filteredTodos.map(todo => {
        return <TodoItem key={todo.id} todo={todo} />
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
