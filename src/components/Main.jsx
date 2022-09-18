import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import ToDoBody from "./toDoBody";
import { db } from "./firebase";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const style = {
  mainLayout: `h-screen w-screen p-4 bg-gradient-to-r 
  from-[#2F80ED] to-[#1CB5E0] relative`,
  container: `bg-slate-400 max-w-[600px] m-auto sm:my-20
  rounded-md shadow-xl mt-4 p-4 text-xl`,
  tittle: `text-3xl font-bold text-center 
  text-white-400 pb-4`,
  form: `flex justify-between`,
  input: `border p-2 w-full`,
  button: `border p-4 ml-2 bg-gray-100`,
  count: `text-center p-2`,
};
function Main(props) {
  const [toDo, setToDo] = useState([]);
  const [input, setInput] = useState([]);
  const navigate = useNavigate();
  const uid = auth.currentUser.uid;
  // create todo
  const createTodo = async (e) => {
    e.preventDefault(e); // no reload for the page
    if (input === "") {
      alert("pleas enter a valid statment");
      return;
    } else {
      const uid = auth.currentUser.uid;
      const todos = collection(db, "Users", uid, "Todos");
      const docRef = await addDoc(todos, {
        text: input,
        completed: false,
      });
      console.log("Document written with ID: ", docRef.id);
    }
    setInput("");
  };

  // {
  //  const docRef = await addDoc(collection(db, "todo"), {
  //   text: input,
  //   completed: false,
  // });

  // read todo from firebase
  useEffect(() => {
    const q = query(collection(db, "Users", uid, "Todos"));
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
    await updateDoc(doc(db, "Users", uid, "Todos", todo.id), {
      completed: !todo.completed,
    });
  };

  // delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "Users", uid, "Todos", id));
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        alert(error.meassage);
      });
  };

  /** Checking log out */
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        // logged out
        navigate("/");
      }
    });
  }, []);

  return (
    <div className={style.mainLayout}>
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
      <div className="signOut">
        <button className="sign-out-btn" onClick={handleSignOut}>
          sign out
        </button>
      </div>
    </div>
  );
}

export default Main;
