// Import useState and useRouter from React
import { useState } from "react";
import { useRouter } from "next/navigation";

// Import components and icons
import {
  Input,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  Button,
  ButtonGroup,
  DropdownItem,
} from "@nextui-org/react";
import { AiFillCaretDown, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import isAuth from "../components/isAuth";

function AddProfile() {
  const router = useRouter();

  // State variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility
  const [selectedAccessIndex, setSelectedAccessIndex] = useState(0);
  const accessRights = ["Trainee", "Admin"];

  // Function to add a new user
  async function addUser(name, email, password, access_rights) {
    try {
      const response = await fetch("https://d17ygk7qno65io.cloudfront.net/user", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          access_rights: access_rights,
        }),
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  // Function to handle saving the profile
  function handleSaveProfile() {
    addUser(name, email, password, accessRights[selectedAccessIndex])
      .then(() => {
        router.push("/myteam");
      })
      .catch((error) => {
        console.error("Failed to save profile:", error);
        alert("Failed to save profile. Please try again.");
      });
  }

  return (
    <div className="flex flex-col p-4">
      {/* Back button */}
      <div className="flex flex-row">
        <Button
          startContent={<IoIosArrowBack />}
          className="flex items-center m-1 mx-3"
          onClick={() => router.push("/myteam")}
        >
          Back
        </Button>
      </div>

      {/* Actual page content */}
      <div className="w-1/2 flex flex-col justify-center items-center gap-4 place-self-center py-2 px-4">
        <span className="text-2xl font-bold m-3 place-self-start">
          Add Profile
        </span>

        {/* Name input */}
        <div className="flex flex-row justify-center items-center">
          <span className="flex w-1/4">
            <p className="text-red-500">*</p>Name:
          </span>
          <Input
            isRequired
            placeholder="Enter your Name"
            defaultValue=""
            onValueChange={(value) => setName(value)}
            className="flex border border-sage-green outline-2 py-1 w-48"
          />
        </div>

        {/* Email input */}
        <div className="flex flex-row justify-center items-center">
          <span className="flex w-1/4">
            <p className="text-red-500">*</p>Email:
          </span>
          <Input
            isRequired
            type="email"
            placeholder="Enter your Email"
            defaultValue=""
            onValueChange={(value) => setEmail(value)}
            className="flex border border-sage-green outline-2 py-1 w-48"
          />
        </div>

        {/* Password input */}
        <div className="flex flex-row justify-center items-center pl-2">
          <span className="flex w-1/4">
            <p className="text-red-500">*</p>Password:
          </span>
          <div className="flex items-center py-1 ml-2 w-full">
            <Input
              isRequired
              type={isPasswordVisible ? "text" : "password"} // Toggle input type
              placeholder="Enter your Password"
              defaultValue=""
              onValueChange={(value) => setPassword(value)}
              className="flex border border-sage-green outline-2 py-1 w-48"
            />
            <Button
              isIconOnly
              className="ml-2"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
            </Button>
          </div>
        </div>

        {/* Access rights dropdown */}
        <ButtonGroup
          variant="flat"
          className="flex flex-row md:flex-nowrap flex-wrap items-center"
        >
          <span className="flex w-1/4">
            <p className="text-red-500">*</p>Access:{" "}
          </span>
          <div className="flex border border-sage-green p-1 w-48 justify-between">
            <span className="flex w-1/4">
              {accessRights[selectedAccessIndex]}
            </span>
            <Dropdown>
              <DropdownTrigger placement="bottom-end">
                <Button isIconOnly className="px-2">
                  <AiFillCaretDown />
                </Button>
              </DropdownTrigger>

              <DropdownMenu
                disallowEmptySelection
                aria-label={accessRights[selectedAccessIndex]}
                selectedKey={[selectedAccessIndex]}
                selectionMode="single"
                className="place-items-center block bg-light-green"
              >
                {accessRights.map((access, index) => (
                  <DropdownItem
                    className="p-1 hover:bg-white/50 outline-none rounded w-full"
                    key={index}
                    onAction={() => setSelectedAccessIndex(index)}
                  >
                    {access}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </ButtonGroup>

        {/* Buttons for cancel and save */}
        <div className="flex justify-center items-end">
          <Button
            className="bg-dark-green hover:bg-darker-green p-1 px-9 rounded-md text-white m-4"
            onClick={() => router.push("/myteam")}
          >
            Cancel
          </Button>
          <Button
            className="bg-dark-green hover:bg-darker-green p-1 px-10 rounded-md text-white m-4"
            onClick={handleSaveProfile}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default isAuth(AddProfile);
