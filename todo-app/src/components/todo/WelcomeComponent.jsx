import { Link, useParams } from "react-router-dom";
import { useState } from "react";

import { retrieveHellowWorldBeanPathVariable } from "./api/HelloWorldApiService";
import { useAuth } from "./security/AuthContext";

function WelcomeComponent() {
  const params = useParams();

  const [message, setMessage] = useState(null);
  const { username } = useAuth();

  function callHelloWorldRestApi() {
    retrieveHellowWorldBeanPathVariable(username)
      .then((response) => {
        successResponse(response);
      })
      .catch((error) => errorResponse(error))
      .finally(() => {
        console.log("cleanup");
      });
  }

  function successResponse(response) {
    console.log(response);
    setMessage(response.data.message);
  }

  function errorResponse(error) {
    console.log(error);
  }
  return (
    <div className="WelcomeComponent">
      <h1>Welcome {params.username}</h1>
      <div>
        Manager your <Link to="/todos">todos</Link>
      </div>

      <div className="btn btn-success" onClick={callHelloWorldRestApi}>
        {" "}
        Call Hello World
      </div>

      <div className="text-info">{message}</div>
    </div>
  );
}

export default WelcomeComponent;
