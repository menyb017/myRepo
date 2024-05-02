import React, { useEffect, useState } from "react";
import OtherData from "./otherData";
import Todos from "./todos";
import Posts from "./posts";
import AddTodo from "./addTodo";
import "./style.css";
import AddPost from "./addPost";
import AddUser from "./addUser";

export default function User(props) {
  const [isOtherDataShown, setIsOtherDataShown] = useState(false);
  const [isUserSectionShown, setIsUserSectionShown] = useState(false);
  const [isAddTodoShown, setIsAddTodoShown] = useState(false);
  const [isAddPostShown, setIsAddPostShown] = useState(false);
  const [isTodoShown, setIsTodoShown] = useState(true);
  const [isPostShown, setIsPostShown] = useState(true);
  const [borderColor, setBorderColor] = useState("red");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [userTodos, setUserTodos] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    setUserTodos(
      props.todos.filter((todo) => todo.userId === props.selectedId)
    );

    setUserPosts(
      props.posts.filter((post) => post.userId === props.selectedId)
    );
  }, [props.selectedId]);

  useEffect(() => {
    props.setSearchList(props.users);
  }, [props.selectedId]);

  const updateUser = () => {
    console.log(props.users);
    const userIndex = props.users.findIndex(
      (user) => user.id === props.userData.id
    );

    props.users[userIndex].name = name;
    props.users[userIndex].email = email;

    alert("user updated!");

    console.log(props.users);
  };

  const deleteUser = () => {
    const tempUsers = [...props.users];
    const userIndex = tempUsers.findIndex(
      (user) => user.id === props.userData.id
    );

    tempUsers.splice(userIndex, 1);

    props.setUsers(tempUsers);
  };

  const addTaskToList = (val) => {
    setUserTodos((prevTodos) => [...prevTodos, val]);

    const updatedTodos = [...props.todos, val];
    props.setTodos(updatedTodos);
  };

  const addPostToList = (val) => {
    setUserPosts((prevPosts) => [...prevPosts, val]);

    const updatedPosts = [...props.posts, val];
    props.setUserPosts(updatedPosts);
  };

  const userDtails = () => {
    isUserSectionShown
      ? setIsUserSectionShown(false)
      : setIsUserSectionShown(true);

    if (isUserSectionShown) {
      props.setId(null);
    } else {
      props.setId(props.userData.id);
    }
  };
  const ShowAddTodo = () => {
    isAddTodoShown ? setIsAddTodoShown(false) : setIsAddTodoShown(true);

    isTodoShown ? setIsTodoShown(false) : setIsTodoShown(true);
  };

  const ShowAddPost = () => {
    isAddPostShown ? setIsAddPostShown(false) : setIsAddPostShown(true);

    isPostShown ? setIsPostShown(false) : setIsPostShown(true);
  };

  return (
    <div>
      {props.addUserShown ? (
        <div className="child">
          <AddUser
            SetUserShown={props.setAddUserShown}
            setSearchList={props.setSearchList}
            usersList={props.users}
            setUsersList={props.setUsers}
            setCount={props.setUserCount}
            userCount={props.userCount}
          />
        </div>
      ) : null}
      <div
        className="parent"
        style={{
          backgroundColor:
            props.selectedId === props.userData.id
              ? backgroundColor
              : "transparent",
          border: `2px ${borderColor} solid`,
        }}
      >
        <span style={{ cursor: "pointer" }} onClick={() => userDtails()}>
          ID:{props.userData.id}
        </span>
        <br />
        <br />
        Name:&nbsp;
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder={props.userData.name}
        />
        <br />
        <br />
        Email:&nbsp;
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder={props.userData.email}
        />
        <br />
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            style={{ backgroundColor: "#dbd8ce" }}
            onMouseOver={() => setIsOtherDataShown(true)}
            onClick={() => setIsOtherDataShown(false)}
          >
            Other Data
          </button>
          &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={deleteUser} style={{ backgroundColor: "#f4fa7a" }}>
            Delete
          </button>
          <button onClick={updateUser} style={{ backgroundColor: "#f4fa7a" }}>
            Update
          </button>
        </div>
        {isOtherDataShown ? <OtherData userData={props.userData} /> : null}
        {props.selectedId === props.userData.id ? (
          <div className="child">
            <div>
              {isAddTodoShown ? (
                <AddTodo
                  setAddTodoShown={setIsAddTodoShown}
                  setTodoShown={setIsTodoShown}
                  todosList={userTodos}
                  setTodosList={setUserTodos}
                  id={props.userData.id}
                  addTaskToList={addTaskToList}
                />
              ) : null}
            </div>
            <div>
              {isAddPostShown ? (
                <AddPost
                  setAddPostShown={setIsAddPostShown}
                  setPostShown={setIsPostShown}
                  postList={userPosts}
                  setPostList={setUserPosts}
                  addPostToList={addPostToList}
                  id={props.userData.id}
                />
              ) : null}
            </div>
            <br />

            {isTodoShown ? (
              <div
                style={{
                  border: "2px solid black",
                  padding: "10px",
                  width: "400px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h4 style={{ margin: "0px" }}>
                    Todos - User {props.userData.id}
                  </h4>
                  <button className="showBtn" onClick={ShowAddTodo}>
                    ADD
                  </button>
                </div>

                {userTodos.map((todo, index) => (
                  <Todos
                    key={index}
                    Todos={todo}
                    todosList={userTodos}
                    setBorderColor={setBorderColor}
                    setBackgroundColor={setBackgroundColor}
                  />
                ))}
              </div>
            ) : null}
            <br />
            <br />
            {isPostShown ? (
              <div
                style={{
                  border: "2px solid black",
                  padding: "10px",
                  width: "400px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h4 style={{ margin: "0px" }}>
                    Posts - User {props.userData.id}
                  </h4>
                  <button className="showBtn" onClick={ShowAddPost}>
                    ADD
                  </button>
                </div>

                {userPosts.map((post, index) => (
                  <Posts key={index} Posts={post} />
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
