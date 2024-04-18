import React from "react";

export default function Posts(props) {
  return (
    <div
      style={{
        border: "2px solid black",
        marginBottom: "10px",
        padding: "15px",
      }}
    >
      <b>Title: </b> <span>{props.Posts.title}</span>
      <br />
      <br />
      <b>Body: </b> <span>{props.Posts.body}</span>
      <br />
    </div>
  );
}
