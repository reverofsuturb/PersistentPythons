import { useState } from "react";
import { thunkLogin } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
      navigate("/boards");
    }
  };

  const handleDemoLogin = async () => {
    setEmail("user1@aa.io");
    setPassword("password");
    await handleSubmit();
  };

  return (
    <div className="modalPage">
      <h1>Log In</h1>
      <form id="loginForm" onSubmit={(e) => handleSubmit(e)}>
        Email
        <label>
          <input
            className="logInInput"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="signUpErrors">{errors.email}</p>}
        Password
        <label>
          <input
            className="logInInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="signUpErrors">{errors.password}</p>}
        <button className="logInButton" type="submit">
          Log In
        </button>
        <button className="logInButton" onClick={handleDemoLogin}>
          Demo User Login
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
