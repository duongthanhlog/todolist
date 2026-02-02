import styles from "./TodoItem.module.scss";
import classNames from "classnames/bind";
import { DeleteIcon, EditIcon } from "../../assests";
import EditForm from "../EditForm/EditForm";
import { useDispatch } from "react-redux";
import { editTodo, updateTodo, removeTodo, toggleCompleteTodo } from "../../store/Slices/todoSlice";
import { useEffect } from "react";

const cx = classNames.bind(styles);

function TodoItem({ todo, onEdit, onToggle }) {
  const dispatch = useDispatch()

  const handleDelete = async (_id) => {
    await fetch(`http://localhost:5000/todos/${_id}`, {method : 'DELETE'}
    )
    dispatch(removeTodo(_id))
    
  };
  
  const handleEdit = (e) => {
    e.stopPropagation();
    dispatch(editTodo(todo))
  };

  const handleUpdate = async (text) => {
     const res = await fetch(`http://localhost:5000/todos/${todo._id}`, {
          method : 'PATCH',
          headers :   {'Content-Type': 'application/json'},
          body : JSON.stringify({
            text ,
          })
        }) 
        const saveUpdatedTodo = await res.json()
        dispatch(updateTodo(saveUpdatedTodo))
  };

  return (
    <div
      onClick={!todo.editing ? onToggle : () => {}}
      className={cx("todo_item", { complete: todo.completed })}
    >
      {todo.editing ? <EditForm todo={todo} onUpdate={(text) => handleUpdate(text)}/> :

      <div className={cx('todo_wrapper')}>
        <span >{todo.text}</span>
          
      <div className={cx("button_area")}>
          <button
            onClick={todo.editing ?(e) => handleUpdate(e) :  (e) => handleEdit(e)}
            className={cx("edit_btn")}
          >
            <EditIcon width="16px" height="16px" className={cx("icon")} />
          </button>
          <button className={cx("delete_btn")} onClick={() => handleDelete(todo._id)}>
            <DeleteIcon width="16px" height="16px" className={cx("icon")} />
          </button>
          </div>
      </div>
  }
    </div>
  );
}

export default TodoItem;
