import axios from "axios"

const getAllUsers = async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );

  const users = data.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      street: user.address.street,
      city: user.address.city,
      zipcode: user.address.zipcode,
    };
  });

  return users;
};

const getTodosById = async (id) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/todos/?userId=${id}`
  );
  const todos = data
    .map((todo) => {
      return { title: todo.title, completed: todo.completed };
    })
    .splice(0, 3);

  return todos;
};

const getPostsById = async (id) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/?userId=${id}`
  );

  const posts = data
    .map((post) => {
      return { title: post.title, body: post.body };
    })
    .splice(0, 3);

  return posts;
};


export { getAllUsers, getPostsById, getTodosById };
