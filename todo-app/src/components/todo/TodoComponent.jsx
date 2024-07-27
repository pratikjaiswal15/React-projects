import { useEffect, useState } from "react";
import {
  retrieveTodoApi,
  updateTodoApi,
  createTodoApi,
} from "./api/TodosApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment";
function TodoComponent() {
  const { id } = useParams();
  const { username } = useAuth();

  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    retrieveTodo(username, id);
  }, [id, username]);

  function retrieveTodo(username, id) {
    if (id !== "-1") {
      retrieveTodoApi(username, id)
        .then((response) => {
          console.log(response);
          setDescription(response.data.description);
          setTargetDate(response.data.targetDate);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function onSubmit(values) {
    const todo = {
      username: username,
      description: values.description,
      targetDate: values.targetDate,
      done: false,
    };

    console.log(todo);
    console.log(id, typeof id);
    if (id === "-1") {
      createTodo(username, todo);
    } else {
      console.log("update");
      todo.id = id;
      updateTodoApi(username, id, todo)
        .then((response) => {
          console.log(response);
          navigate("/todos");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function createTodo(username, todo) {
    console.log("create");
    createTodoApi(username, todo)
      .then((response) => {
        console.log(response);
        navigate("/todos");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function validate(values) {
    const errors = {};
    if (values.description.length < 5) {
      errors.description = "Enter at least 5 character";
    }

    if (
      values.targetDate === null ||
      values.targetDate === "" ||
      !moment(values.targetDate).isValid()
    ) {
      errors.targetDate = "Enter a valid date";
    }
    return errors;
  }
  return (
    <div className="container">
      <h1>Enter To do details</h1>

      <div>
        <Formik
          initialValues={{ description, targetDate }}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {() => (
            <Form>
              <ErrorMessage
                name="description"
                component="div"
                className="alert alert-warning"
              />

              <ErrorMessage
                name="targetDate"
                component="div"
                className="alert alert-warning"
              />
              <fieldset className="form-group">
                <label>Description</label>
                <Field
                  className="form-control"
                  type="text"
                  name="description"
                />
              </fieldset>
              <fieldset className="form-group">
                <label>Target Date</label>
                <Field className="form-control" type="date" name="targetDate" />
              </fieldset>

              <div>
                <button className="btn btn-success" type="submit">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default TodoComponent;
