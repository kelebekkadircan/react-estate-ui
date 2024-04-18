import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });

      navigate("/login");

      console.log(response.data);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }

    console.log(username, email, password);
  };

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input
            name="username"
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="Username"
          />
          <input
            name="email"
            minLength={10}
            maxLength={20}
            type="email"
            placeholder="Email"
          />
          <input
            name="password"
            minLength={3}
            maxLength={20}
            type="password"
            placeholder="Password"
          />
          <button disabled={isLoading} type="submit">
            Register
          </button>
          {error && <p>{error}</p>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
