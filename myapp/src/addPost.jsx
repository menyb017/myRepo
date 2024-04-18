import React, { useState } from "react";

export default function AddPost(props) {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();

  let obj = { title: title, body: body };

  const cancelBtn = () => {
    props.setAddPostShown(false);
    props.setPostShown(true);
  };

  const add = () => {
    props.postList.push(obj);
    cancelBtn();
  };

  return (
    <div style={{ border: "2px solid black", padding: "15px", width: "300px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyItems: "center",
        }}
      >
        <h4>Add Post:</h4>
        <span>Title:</span>
        <input onChange={(e) => setTitle(e.target.value)} type="text" />
        <br />
        <span>Body:</span>
        <input onChange={(e) => setBody(e.target.value)} type="text" />
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
