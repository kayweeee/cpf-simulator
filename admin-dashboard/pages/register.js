import { useState } from "react";
import { useRouter } from "next/router";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [notification, setNotification] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State for success popup
  const router = useRouter();

  const handleNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://d17ygk7qno65io.cloudfront.net/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          access_rights: "Admin", // Assuming default access rights for registration
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const data = await response.json();
      console.log("User created:", data); // You can handle the response data as needed
      setShowSuccessPopup(true); // Show success popup
    } catch (error) {
      console.error("Error creating user:", error);
      handleNotification("Failed to register. Please try again."); // Display error message
    }
  };

  const handleLoginRedirect = () => {
    router.push("/"); // Redirect to login page
  };

  return (
    <div className="flex justify-center my-8 text-base">
      <div className="bg-light-green shadow rounded-md p-5 md:p-10 lg:p-20 flex flex-col md:max-w-lg lg:max-w-xl">
        {showSuccessPopup ? (
          // Success popup
          <div className="mt-4 p-4 rounded-md text-dark-green">
            <p className="flex justify-center mb-2">Registration successful!</p>
            <button
              onClick={handleLoginRedirect}
              className="bg-dark-green hover:bg-darker-green text-white rounded-lg px-8 py-2 mt-5 sm:w-[300px] focus:outline-none focus:ring-2"
            >
              Back to Login
            </button>
          </div>
        ) : (
          // Registration form
          <form onSubmit={handleSubmit} className="flex justify-start flex-col w-full">
            <h1 className="flex pb-5 sm:text-2xl md:text-3xl font-bold">Admin Register</h1>
            <div className="icon-input pt-2">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-3 py-2 rounded-md border border-gray-300 sm:w-[300px] placeholder:text-xs md:placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="icon-input pt-2">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-2 rounded-md border border-gray-300 sm:w-[300px] placeholder:text-xs md:placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="icon-input pt-2 flex items-center">
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-3 py-2 rounded-md border border-gray-300 sm:w-[300px] placeholder:text-xs md:placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <button
                type="button"
                className="ml-2"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
            <div className="text-red-600 text-sm">{notification}</div>
            <button
              type="submit"
              id="register"
              className="bg-dark-green hover:bg-darker-green text-white rounded-lg px-8 py-2 mt-5 sm:w-[300px] focus:outline-none focus:ring-2"
            >
              Register
            </button>
          </form>
        )}
        {!showSuccessPopup && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => router.push("/")}
              className="text-blue-600 hover:underline"
            >
              Already have an account? Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
