import React, { useEffect, useRef, useState } from "react";

export default function AddUser(props) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [count, setCount] = useState(props.usersList.length);
  const prev = useRef();

  useEffect(() => {
    prev.current = count;
  }, [count]);

  useEffect(() => {
    props.setSearchList(props.usersList);
  }, [props.usersList]);

  const addNewUser = () => {
    setCount((c) => c + 1);

    const obj = {
      id: count + 1,
      name: name,
      email: email,
      street: "",
      city: "",
      zipcode: "",
    };

    const newUsers = [...props.usersList, obj];

    props.setUsersList(newUsers);
  };

  return (
    <div
      style={{
        border: "2px solid black",
        marginTop: "20px",
        padding: "20px",
        width: "200px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyItems: "center",
        }}
      >
        <h4>Add New User:</h4>
        <span>Name:</span>
        <input onChange={(e) => setName(e.target.value)} type="text" />
        <br />
        <span>Email:</span>
        <input onChange={(e) => setEmail(e.target.value)} type="email" />
      </div>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button
          style={{ backgroundColor: "#f4fa7a" }}
          onClick={() => props.SetUserShown(false)}
        >
          Cancel
        </button>
        &nbsp;&nbsp;
        <button
          style={{
            backgroundColor: "#f4fa7a",
          }}
          onClick={addNewUser}
        >
          Add
        </button>
      </div>
    </div>
  );
}
