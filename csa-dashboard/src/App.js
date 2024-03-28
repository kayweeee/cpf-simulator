import React, { useState } from "react";
import cpf_image from "../public/cpf_image.png"; // Import your CPF image
import { FaUser } from "react-icons/fa";
import "./App.css";
import loginService from "./services/login";

// Routing
export const App = () => {
  const [email, setEmail] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ email });
      setEmail("");
      console.log(user);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container">
      <div className="left-section">
        <div className="cpf-block">
          <img src={cpf_image.src} alt="CPF Image" className="cpf-image" />
        </div>
      </div>
      <div className="right-section">
        <form onSubmit={handleLogin}>
          <h1>Member Login</h1>
          <div className="icon-input">
            <FaUser className="icon" />
            <input
              type="text"
              id="username"
              name="email"
              placeholder="Email"
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>
          {/* Todo: js function to submit username for routing*/}
          <button type="submit" id={"login"}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
