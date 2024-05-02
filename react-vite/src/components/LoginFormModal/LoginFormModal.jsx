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
    console.log("🚀 ~ handleSubmit ~ serverResponse:", serverResponse)

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
      navigate("/boards");
    }
  };

  const handleDemoLogin = async(e) => {
    setEmail("user1@aa.io");
    setPassword("password");

    setTimeout(() => handleSubmit(e), 100) // Gives this function enough time to update the state before logging in, also 100ms was tested, it allows the state enough time to update and to keep the errors from popping up a split second before sending data.
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
        <button className="logInButton" onClick={(e) => handleDemoLogin(e)}>
          Demo User Login
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
