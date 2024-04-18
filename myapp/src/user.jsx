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
  const [isColored, setIsColored] = useState(false);
  const [borderColor, setBorderColor] = useState("red");
  const [backgroundColor, setBackgroundColor] = useState("#FF3333");
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    props.setSearch(props.users);
  }, [props.users]);

  const updateUser = () => {
    console.log(props.users);
    const userIndex = props.users.findIndex(
      (user) => user.id === props.userData.id
    );

    props.users[userIndex].name = name;
    props.users[userIndex].email = email;

    // props.userData.name = name;
    // props.userData.email = email;
  };

  const deleteUser = () => {
    const tempUsers = [...props.users];
    const userIndex = tempUsers.findIndex(
      (user) => user.id === props.userData.id
    );

    tempUsers.splice(userIndex, 1);

    props.setUserList(tempUsers);
  };

  const changeBorderColor = () => {
    if (props.idShown === props.userData.id) {
      setBorderColor("green");
      setBackgroundColor("yellowGreen");
    } else {
      return;
    }
  };

  const userSection = () => {
    isUserSectionShown
      ? setIsUserSectionShown(false)
      : setIsUserSectionShown(true);

    if (isUserSectionShown) {
      props.setIdShown(0);

      setIsColored(false);
    } else {
      props.setIdShown(props.userData.id);
      setIsColored(true);
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
            setSearchList={props.setSearch}
            usersList={props.users}
            setUsersList={props.setUserList}
          />
        </div>
      ) : null}
      <div
        className="parent"
        style={{
          backgroundColor: isColored ? backgroundColor : "white",
          border: `2px ${borderColor} solid`,
        }}
      >
        <span style={{ cursor: "pointer" }} onClick={() => userSection()}>
          ID:{props.userData.id}
        </span>
        <br />
        Name:&nbsp;
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder={props.userData.name}
        />
        <br />
        Email:&nbsp;
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder={props.userData.email}
        />
        <br />
        <br />
        <button
          style={{ backgroundColor: "#dbd8ce" }}
          onClick={() =>
            isOtherDataShown
              ? setIsOtherDataShown(false)
              : setIsOtherDataShown(true)
          }
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
        {isOtherDataShown ? <OtherData userData={props.userData} /> : null}
        <div hidden={props.idShown !== props.userData.id} className="child">
          <div>
            {isAddTodoShown ? (
              <AddTodo
                setAddTodoShown={setIsAddTodoShown}
                setTodoShown={setIsTodoShown}
                todosList={props.userTodosList}
                setTodosList={props.setUserTodosList}
              />
            ) : null}
          </div>
          <div>
            {isAddPostShown ? (
              <AddPost
                setAddPostShown={setIsAddPostShown}
                setPostShown={setIsPostShown}
                postList={props.userPostList}
                setPostList={props.setUserPostList}
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

              {props.userTodos.map((todo, index) => (
                <Todos
                  key={index}
                  Todos={todo}
                  changeColor={changeBorderColor}
                  todosList={props.userTodos}
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

              {props.userPosts.map((post, index) => (
                <Posts key={index} Posts={post} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
