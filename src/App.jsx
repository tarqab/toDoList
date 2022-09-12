import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import ToDoBody from "./components/toDoBody";
import { db } from "./components/firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";

const style = {
  backgr: `h-screen w-screen p-4 bg-gradient-to-r 
  from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-400 max-w-[600px]  m-auto rounded-md shadow-xl mt-4 p-4 text-xl`,
  tittle: `text-3xl font-bold text-center text-white-400 pb-4`,
  form: `flex justify-between`,
  input: `border p-2 w-full`,
  button: `border p-4 ml-2 bg-gray-100`,
  count: `text-center p-2`,
};
function App(props) {
  const [toDo, setToDo] = useState([]);
  const [input, setInput] = useState([]);

  // create todo
  const createTodo = async (e) => {
    e.preventDefault(e); // no reload for the page
    if (input === "") {
      alert("pleas enter a valid statment");
      return;
    } else
      await addDoc(collection(db, "todo"), {
        text: input,
        completed: false,
      });
    setInput("");
  };

  // read todo from firebase
  useEffect(() => {
    const q = query(collection(db, "todo"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let toDoArray = [];
      QuerySnapshot.forEach((doc) => {
        toDoArray.push({ ...doc.data(), id: doc.id });
      });
      setToDo(toDoArray);
    });
  }, []);

  // update todo in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todo", todo.id), { completed: !todo.completed });
  };

  // delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todo", id));
  };
  return (
    <div className={style.backgr}>
      <div className={style.container}>
        <h3 className={style.tittle}>let's do it</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={style.input}
            type="text"
            placeholder="Add Todo"
          ></input>
          <button className={style.button}>
            <AiOutlinePlus size={28} />
          </button>
        </form>
        <ul>
          {toDo.map((todo, index) => {
            return (
              <ToDoBody
                key={index}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            );
          })}
        </ul>
        {toDo.length === 0 && <p className={style.count}></p>}
        {toDo.length === 1 && (
          <p className={style.count}>Awesome! you have one task</p>
        )}
        {toDo.length > 1 && (
          <p className={style.count}> you have {toDo.length} tasks !</p>
        )}
      </div>
    </div>
  );
}

export default App;
