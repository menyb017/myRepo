import React, { useState } from "react";
import { useEffect } from "react";
import User from "./user";
import { getAllUsers, getPostsById, getTodosById } from "./utils";

export default function HomePage() {
  const [id, setId] = useState(0);
  const [todos, setTodos] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postList, setPostList] = useState([]);
  const [todosList, setTodosList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [isAddUserShown, setIsAddUserShown] = useState(false);

  function addNewUser() {
    setId(0);

    setIsAddUserShown(true);
  }

  const getUsersFromApi = async () => {
    const users = await getAllUsers();
    setUsersList(users);
    setSearchList(users);
  };
  async function getTodosAndPosts() {
    const userTodos = await getTodosById(id);
    setTodos(userTodos);
    setTodosList(userTodos);

    const userPosts = await getPostsById(id);
    setPosts(userPosts);
    setPostList(userPosts);
  }

  const searchBar = (e) => {
    if (e.target.value.length === 0) setSearchList(usersList);
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
    getUsersFromApi();
  }, []);

  useEffect(() => {
    getTodosAndPosts();
  }, [id]);

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
            idShown={id}
            setIdShown={setId}
            userTodos={todos}
            setUserTodos={setTodos}
            setUserList={setUsersList}
            userPosts={posts}  
            setUsersPosts={setPosts}
            userPostList={postList}
            setUserPostList={setPostList}
            userTodosList={todosList}
            setUserTodosList={setTodosList}
            addUserShown={isAddUserShown}
            setAddUserShown={setIsAddUserShown}
            setSearch = {setSearchList}
          />
        ))}
      </div>
    </div>
  );
}
