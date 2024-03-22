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
    await handleSubmit(new Event("submit"));
  };

  return (
    <div className="modalPage">
      <h1>Log In</h1>
      <form id="loginForm" onSubmit={handleSubmit}>
        Email
        <label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        Password
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button type="submit">Log In</button>
        <button onClick={handleDemoLogin}>Demo User Login</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
