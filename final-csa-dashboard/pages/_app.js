import "../styles/global.css";
// components
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
    }
  }, []);

  return (
    <div className="overflow-y-scroll overflow-x-clip scrollbar-hide">
      <Header user={user} setUser={setUser} />
      <Component {...pageProps} user={user} setUser={setUser} />
      <Footer />
    </div>
  );
}
