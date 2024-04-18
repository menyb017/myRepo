import React, { useEffect, useState } from "react";

export default function AddTodo(props) {
  const [title, setTitle] = useState();

  let obj = { title: title, completed: true };

  const cancelBtn = () => {
    props.setAddTodoShown(false);
    props.setTodoShown(true);
  };

  const add = () => {
    props.todosList.push(obj);
    cancelBtn();
  };

  useEffect(()=>{

     const check = props.todosList.find(todo => todo.title !== true)

     if(check === undefined)
     {
      
     }
  })
  return (
    <div style={{ border: "2px solid black", padding: "15px", width: "300px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyItems: "center",
        }}
      >
        <h4>Add Todo:</h4>
        <span>Title:</span>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="add todo"
        />
      </div>

      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button style={{ backgroundColor: "#f4fa7a" }} onClick={cancelBtn}>
          Cancel
        </button>
        &nbsp;&nbsp;
        <button onClick={add} style={{ backgroundColor: "#f4fa7a" }}>
          Add
        </button>
      </div>
    </div>
  );
}
