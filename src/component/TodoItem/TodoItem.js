import styles from "./TodoItem.module.scss";
import classNames from "classnames/bind";
import { DeleteIcon, EditIcon } from "../../assests";
import EditForm from "../EditForm/EditForm";
import { useDispatch } from "react-redux";
import {  handleEditTodo, handleUpdateTodo, removeTodo, toggleCompleteTodo } from "../../store/todoSlice";

const cx = classNames.bind(styles);

function TodoItem(props) {
  const { setTodos, todos, todo } = props;
  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(removeTodo(todo))
  };
  const toggleTodo = () => {
    dispatch(toggleCompleteTodo(todo))
  }

  
  const handleEdit = (e) => {
    e.stopPropagation();
    dispatch(handleEditTodo(todo))
  }; 

  const updateTodo = (value) => {
      dispatch(handleUpdateTodo(todo, value))
  };

  return (
    <div
      onClick={!todo.editing ? toggleTodo : () => {}}
      className={cx("todo_item", { complete: todo.completed })}
    >
      {todo.editing ? (
        <EditForm
          setTodos={setTodos}
          todo={todo}
          todos={todos}
          onSubmit={updateTodo}
        />
      ) : (
        <span>{todo.text}</span>
      )}
      
      <div className={cx("button_area")}>
        {!todo.editing && (
          <button
            onClick={todo.editing ? updateTodo : handleEdit}
            className={cx("edit_btn")}
          >
            <EditIcon width="16px" height="16px" className={cx("icon")} />
          </button>
        )}
        {!todo.editing && (
          <button className={cx("delete_btn")} onClick={handleDelete}>
            <DeleteIcon width="16px" height="16px" className={cx("icon")} />
          </button>
        )}
      </div>
    </div>
  );
}

export default TodoItem;
