import { useEffect, useState } from "react";
import { retrieveTodosForUserApi, deleteTodoApi } from "./api/TodosApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

function ListTodosComponent() {
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const { username } = useAuth();
  useEffect(() => {
    refreshTodos();
  }, []);

  // useEffect(() => refreshTodos(), []);

  function refreshTodos() {
    retrieveTodosForUserApi(username)
      .then((response) => {
        console.log(response.data);
        setTodos(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteTodo(id) {
    deleteTodoApi(username, id)
      .then((response) => {
        console.log(response);
        refreshTodos();
        setMessage(`Todo with id ${id} deleted sucessfully`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updateTodo(id) {
    navigate(`/todos/${id}`);
  }

  function addNewTodo() {
    navigate(`/todos/-1`);
  }
  return (
    <>
      <div className="container">
        <h1>Things you want to do</h1>

        {message && <div className="alert alert-warning"> {message} </div>}
        <table className="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Is Done?</th>
              <th>Target Date</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>

          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.description}</td>
                <td>{todo.done.toString()}</td>
                {/* <td>{todo.targetDate.toDateString()}</td> */}
                <td>{todo.targetDate}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    {" "}
                    Delete
                  </button>
                </td>

                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => updateTodo(todo.id)}
                  >
                    {" "}
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="btn btn-success m-5" onClick={addNewTodo}>
          {" "}
          Add new Todo
        </div>
      </div>
    </>
  );
}

export default ListTodosComponent;
