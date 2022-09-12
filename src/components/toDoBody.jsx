import React from "react";
import { FiTrash2 } from "react-icons/fi";

const style = {
  li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
  liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
  row: `flex`,
  text: `ml-2 cursor-pointer`,
  textComplete: `ml-2 cursor-pointer line-through`,
  button: `cursor-pointer flex items-center`,
};

export default function ToDoBody(props) {
  return (
    <li className={style.li}>
      <div className={style.row}>
        <input
          onChange={() => props.toggleComplete}
          type="checkbox"
          checked={props.todo.completed ? "checked" : ""}
        />
        <p
          onClick={() => props.toggleComplete(props.todo)}
          className={props.todo.completed ? style.textComplete : style.text}
        >
          {props.todo.text}
        </p>
      </div>
      <button onClick={() => props.deleteTodo(props.todo.id)}>
        {<FiTrash2 />}
      </button>
    </li>
  );
}
