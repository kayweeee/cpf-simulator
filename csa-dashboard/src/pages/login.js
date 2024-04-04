import "./login.css";
import "../app/[[...slug]]/index.css";
import Topnavbar from "../components/Topnavbar.js";
import Bottomnavbar from "../components/Bottomnavbar.js";
import loginService from "../services/login.js";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");

  async function onSubmit(event) {
    event.preventDefault();

    try {
      const user = await loginService.login({ email });
      console.log(user);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setEmail("");

      if (user) {
        let url = "/profile";
        window.location.href = url;
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <Topnavbar loginstate={false} />
      <div className="container">
        <div className="middle-section">
          <form onSubmit={onSubmit}>
            <h1 style={{ marginTop: "-150px" }}>Log In</h1>
            <p style={{ marginBottom: "5px", fontSize: "13px" }}>
              Employee Email
            </p>
            <div className="icon-input">
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your Email"
                onChange={({ target }) => setEmail(target.value)}
              />
            </div>
            <button type="submit" id={"login"}>
              Login
            </button>
          </form>
        </div>
      </div>
      <Bottomnavbar />
    </div>
  );
}
