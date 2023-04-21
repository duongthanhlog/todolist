import styles from "./TodoItem.module.scss";
import classNames from "classnames/bind";
import { DeleteIcon, EditIcon } from "../../assests";
import EditForm from "../EditForm/EditForm";
import useStorage from "../Hooks/useStorage";

const cx = classNames.bind(styles);

function TodoItem(props) {
  const { setTodos, todos, todo } = props;

  const handleDelete = () => {
    const newTodos = [...todos].filter((item) => item.id !== todo.id);
    setTodos(newTodos);
  };

  const toggleTodo = () => {
    setTodos((prev) => {
      const newTodos = prev.map((item) => {
        if (item.id === todo.id) {
          return { ...item, complete: !item.complete };
        }
        return item;
      });
      return newTodos
    });
  };

  
  const handleEdit = (e) => {
    e.stopPropagation();
    setTodos((prev) => {
      const newTodos = prev.map((item) => {
        if (item.id === todo.id) {
          return { ...item, editing: !item.editing };
        }
        return item;
      });
      return newTodos
    });
  }; 

  const updateTodo = (value) => {
    if (value.trim()) {
      setTodos((prev) => {
        const newTodos = prev.map((item) => {
          if (item.id === todo.id) {
            return { ...item, text: value, editing: false };
          }
          return item;
        });
        return newTodos
      });
    }
  };

  return (
    <div
      onClick={!todo.editing ? toggleTodo : () => {}}
      className={cx("todo_item", { complete: todo.complete })}
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
