import React, { useEffect, useState } from "react";

export default function Todos(props) {
  const [isMarked, setIsMarked] = useState(false);

  useEffect(() => {
    setIsMarked(props.Todos.completed);
  });

  useEffect(() => {
    checkStatus();
  }, [props.Todos.completed]);

  function hideBtn() {
    setIsMarked(true);
    props.Todos.completed = true;
  }

  useEffect(() => {}, [props.todosList]);

  const checkStatus = () => {
    const check = props.todosList.findIndex((todo) => todo.completed === false);
    if (check === -1) {
      props.changeColor();
    }
  };
  return (
    <div
      style={{
        border: "2px solid black",
        marginBottom: "10px",
        padding: "15px",
      }}
    >
      <b>Title: </b> <span>{props.Todos.title}</span>
      <br />
      <br />
      <b>Completed: </b> <span>{props.Todos.completed.toString()}</span>
      <br />
      <br />
      {isMarked ? null : (
        <button onClick={hideBtn} style={{ backgroundColor: "#f4fa7a" }}>
          Mark Completed
        </button>
      )}
    </div>
  );
}
