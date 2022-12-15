import { useState } from "react";
import styles from "./EditForm.module.scss";
import classNames from "classnames/bind";
import { CancelDeleteIcon, CheckIcon } from "../../assests";
import { useRef } from "react";
import { useEffect } from "react";
import { forwardRef } from "react";

const cx = classNames.bind(styles);

function EditForm({ onSubmit, setTodos, todo }) {
  let [input, setInput] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(input);
  };

  const handleCancel = () => {
    setTodos(prev => prev.map(item => {
        if(item.id === todo.id) {
            return {...item, editing: false}
        }
        return item
    }))
  }

  return (
    <form className={cx("wrapper")} onSubmit={handleSubmit}>
      <input
        className={cx('input')}
        ref={inputRef}
        value={input}
        onChange={handleChange}
        type="text"
        placeholder="Change todo"
      />
      <div className={cx("button_area")}>
        <button type="submit" className={cx("button_save")} >
            <CheckIcon width="16px" height="16px" className={cx("icon")} />
        </button>
        <button type="button" className={cx("button_cancel")} onClick={handleCancel}>
            <CancelDeleteIcon width="16px" height="16px" className={cx("icon")} />
        </button>
      </div>
    </form>
  );
}

export default EditForm;
