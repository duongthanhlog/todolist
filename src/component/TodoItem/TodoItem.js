import styles from "./TodoItem.module.scss";
import classNames from "classnames/bind";
import { DeleteIcon, EditIcon } from "../../assests";
import EditForm from "../EditForm/EditForm";
import { useDispatch } from "react-redux";
import { editTodo, updateTodo, removeTodo, toggleCompleteTodo } from "../../store/Slices/todoSlice";

const cx = classNames.bind(styles);

function TodoItem({ todo }) {
  const dispatch = useDispatch()

  const toggleTodo = () => {
    dispatch(toggleCompleteTodo(todo))
  }

  const handleDelete = () => {
    dispatch(removeTodo(todo))
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    dispatch(editTodo(todo))
  };

  const handleUpdate = (value) => {
    dispatch(updateTodo({ todo, value }))
  };

  return (
    <div
      onClick={!todo.editing ? toggleTodo : () => { }}
      className={cx("todo_item", { complete: todo.completed })}
    >
      {todo.editing && <EditForm todo={todo} onUpdate={handleUpdate}/>}

      {!todo.editing && <span>{todo.text}</span>}
      {!todo.editing && <div className={cx("button_area")}>
        <button
          onClick={todo.editing ? handleUpdate : handleEdit}
          className={cx("edit_btn")}
        >
          <EditIcon width="16px" height="16px" className={cx("icon")} />
        </button>
        <button className={cx("delete_btn")} onClick={handleDelete}>
          <DeleteIcon width="16px" height="16px" className={cx("icon")} />
        </button>
      </div>}
    </div>
  );
}

export default TodoItem;
