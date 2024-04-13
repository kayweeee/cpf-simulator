import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [notification, setNotification] = useState("");

  const router = useRouter();

  function handleNotification(noti) {
    setNotification(noti);
    setTimeout(() => setNotification(""), 3000);
  }

  async function onSubmit(event) {
    event.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      if (!res.ok) {
        handleNotification("Invalid email");
      } else {
        const data = await res.json();
        window.localStorage.setItem("loggedUser", JSON.stringify(data));
        setUser(data);

        router.push("/profile");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex justify-center my-8 text-base ">
        <div className="bg-light-green shadow rounded-md p-5 md:p-10 lg:p-20 flex flex-col md:max-w-lg and lg:max-w-xl  ">
          <form
            onSubmit={onSubmit}
            className="flex justify-start flex-col w-full"
          >
            <h1 className="flex pb-5 sm:text-2xl md:text-3xl font-bold">
              Log In
            </h1>
            <p className="flex">Employee ID or Email</p>
            <div className="icon-input pt-2">
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your Email"
                onChange={({ target }) => setEmail(target.value)}
                className="px-3 py-2 rounded-md border border-gray-300 sm:w-[300px]  placeholder:text-xs  md:placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="text-red-600 text-sm">{notification}</div>
            <button
              type="submit"
              id="login"
              className="bg-dark-green text-white rounded-lg px-8 py-2 mt-5 sm:w-[300px] hover:bg-darker-green focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
