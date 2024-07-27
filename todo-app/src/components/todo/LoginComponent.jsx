import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

function LoginComponent() {
  const [username, setUsername] = useState("pratik");
  const [password, setPasswprd] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const [showFailureMessage, setShowFailuresMessage] = useState(false);

  function handleUsernameChane(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPasswprd(event.target.value);
  }

  async function handleSubmit() {
    if (await login(username, password)) {
      navigate(`/welcome/${username}`);
    } else {
      setShowFailuresMessage(true);
    }
  }
  return (
    <div className="Login">
      <h1> Login</h1>

      {showFailureMessage && (
        <div className="errorMessage">
          {" "}
          Authentication Failed. Please check your credentials
        </div>
      )}
      <div className="loginForm">
        <div>
          <label> Username: </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChane}
          />
        </div>

        <div>
          <label> Password: </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <div>
          <button type="button" name="login" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
