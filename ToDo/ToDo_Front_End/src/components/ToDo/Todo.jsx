import React from "react";
import styles from "./Todo.module.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useRef } from "react";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const editIdRef = useRef(null) // !
  const [input, setInput] = useState("");

  useEffect(() => {
    console.log(isEditing, editId, todos);
  }, [isEditing, editId, todos]);

  // getter function
  async function getData() {
    const response = await axios.get("http://localhost:8080/todos");
    console.log(response.data);
    setTodos(response.data.result);
    return response.data.result;
  }

  // submit handler
  async function handleSubmit() {
    if (isEditing) {
      // create payload with a updated task
      // send to back end with id
      // in back end use id to find edited task and replace that task with new one

      const payload = {
        task: input.trim(),
        id: editId,
      };
      const response = await axios.put(
        "http://localhost:8080/edit-todo",
        payload
      );
      setTodos(response.data.result);
      setEditId(null);
      setIsEditing(false);
      setInput("")
      //!
    } else {
      if (!input.trim()) {
        return;
      }
      try {
        const payload = {
          task: input.trim(),
        };
        await axios.post("http://localhost:8080/todos", payload);
        await getData();
        setInput("");
      } catch (error) {
        console.error("Error while post req");
      }
      setEditId(null);
      setIsEditing(false);
    }
  }

  // delete handler
  const handleDelete = async (targetId) => {
    let todos = await getData();
    let lessTodos = todos.filter((obj) => obj.id !== targetId);
    console.log(todos);
    console.log(lessTodos);
    const response = await axios.delete(
      `http://localhost:8080/todos/${targetId}`
    );
    console.log(response.data.result);
    setTodos(response.data.result);
  };

  // complete handler
  const handleComplete = async (id) => {
    const response = await axios.put(`http://localhost:8080/todos?id=${id}`);
    setTodos(response.data.result);
  };

  const handleEdit = (id) => {
    // find whom to edit
    // set input to that perticular task
    setIsEditing(true);
    setEditId(id);
    editIdRef.current = id //!

    const taskIdx = todos.findIndex((obj) => String(obj.id) === String(editIdRef.current));
    console.log(taskIdx);

    setInput(todos[taskIdx].task);
  };

  // setting todos
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <h1>Todo APP</h1>

        <div className={styles.input}>
          <input
            type="text"
            className={styles["input-field"]}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className={styles["add-btn"]} onClick={handleSubmit}>
           {isEditing ? "Edit": "Add"}
          </button>
        </div>
        {todos.length > 0 ? (
          <ul>
            {todos.map((task) => {
              return (
                <li key={task.id}>
                  <span className={task.done ? styles.done : ""}>
                    {task.task}
                  </span>
                  <div className={styles.actions}>
                    <span onClick={() => handleDelete(task.id)}>Delete</span>
                    <span onClick={() => handleEdit(task.id)}>Edit</span>
                    <span onClick={() => handleComplete(task.id)}>
                      Mark as done
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No tasks added yet</p>
        )}
      </div>
    </>
  );
};

export default Todo;
