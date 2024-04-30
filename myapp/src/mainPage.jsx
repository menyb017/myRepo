import React, { useState } from "react";
import { useEffect } from "react";
import User from "./user";
import { getAllUsers, getPosts, getTodos } from "./utils";

export default function MainPage() {
  const [id, setId] = useState(null);
  const [todos, setTodos] = useState([]);
  const [posts, setPosts] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [isAddUserShown, setIsAddUserShown] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [userTodos, setUserTodos] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  function addNewUser() {
    setId(null);

    setIsAddUserShown(true);
  }

  async function getData() {
    const users = await getAllUsers();

    const userLength = users.length;
    setUserCount(userLength);

    setUsersList(users);
    setSearchList(users);

    const Todos = await getTodos();
    setTodos(Todos);

    const userPosts = await getPosts();
    setPosts(userPosts);
  }

  const addTaskToList = (val) => {
    setUserTodos([...userTodos, val]);

  };

   const addPostToList = (val) => {
     setUserPosts([...userPosts, val]);
   };

  useEffect(() => {
    setUserTodos(todos.filter((todo) => todo.userId === id));

    setUserPosts(posts.filter((post) => post.userId === id));
  }, [id]);

  const searchBar = (e) => {
    if (e.target.value.trim() === "") setSearchList(usersList);
    else {
      setSearchList(
        usersList.filter(
          (user) =>
            user.name.toLowerCase().includes(e.target.value) ||
            user.email.toLowerCase().includes(e.target.value)
        )
      );
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div id="parent">
      <div
        style={{
          border: "2px solid black",
          borderRadius: "50px",
          width: "283px",
          padding: "30px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <input onChange={searchBar} type="text" placeholder="search here" />
          &nbsp; &nbsp;<button onClick={addNewUser}>ADD</button>
        </div>

        <br />
        {searchList.map((user, index) => (
          <User
            key={index}
            userData={user}
            users={usersList}
            setUsers={setUsersList}
            idShown={id}
            setIdShown={setId}
            userTodos={userTodos}
            setUserTodos={setUserTodos}
            userPosts={userPosts}
            setUserPosts={setUserPosts}
            addUserShown={isAddUserShown}
            setAddUserShown={setIsAddUserShown}
            setSearchList={setSearchList}
            userCount={userCount}
            setUserCount={setUserCount}
            addTaskToList={addTaskToList}
            addPostToList={addPostToList}
          />
        ))}
      </div>
    </div>
  );
}
