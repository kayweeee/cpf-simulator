// import "../app/[[...slug]]/index.css";
// import loginService from "../services/login.js";
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
      {/* <Header loginstate={false} /> */}
      <div className="container flex justify-center pt-4 my-8 ">
        <div className="middle-section bg-light-green shadow rounded-md p-5 md:p-10 lg:p-20   flex flex-col  md:max-w-lg and lg:max-w-xl  md:h-[550px] sm:h-[300px] "> 
            <form onSubmit={onSubmit} className="flex justify-start flex-col w-full ">
                <h1 className="flex pb-5  sm:text-2xl md:text-4xl font-bold" >Log In</h1>
                    <p className="flex text-sm ">Employee ID or Email</p>
                        <div className="icon-input pt-2">
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Enter your Employee ID or Email"
                                onChange={({ target }) => setEmail(target.value)}
                                className="px-3 py-2 rounded-md border border-gray-300 sm:w-[300px]  placeholder:text-xs  md:placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                            <button
                            type="submit"
                            id="login"
                            className="bg-dark-green text-white rounded-lg px-8 py-2 mt-5 sm:w-[300px] hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                            Login
                            </button>
            </form>
        </div>
        
</div>
</div>
  );
}
