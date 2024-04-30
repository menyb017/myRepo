import axios from "axios";

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

const getTodos = async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );

  return data;
};

const getPosts = async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );

  return data;
};

export { getAllUsers, getPosts, getTodos };
