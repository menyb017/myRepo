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

  const checkStatus = () => {
    const allCompleted = props.todosList.every((todo) => todo.completed);
    console.log(allCompleted);

    props.setBorderColor(allCompleted ? "green" : "red");
    props.setBackgroundColor(allCompleted ? "yellowGreen" : "#FF3333");
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
