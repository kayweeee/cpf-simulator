import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Input,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  Button,
  ButtonGroup,
  DropdownItem,
} from "@nextui-org/react";
import { AiFillCaretDown } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";

export default function AddProfile() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const accessRights = ["Member", "Admin"];
  const router = useRouter();
  const [selectedAccessIndex, setSelectedAccessIndex] = useState(0);

  async function addUser(email, access_rights, name) {
    try {
      const response = await fetch("http://127.0.0.1:8000/user", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          access_rights: access_rights,
          name: name,
        }),
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }
      // Handle response if necessary
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  function handleSaveProfile() {
    addUser(email, accessRights[selectedAccessIndex], name);
    router.push("/myteam");
  }
  return (
    <div className="flex flex-col p-4">
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
      <div className="w-1/2 flex flex-col justify-center items-center  gap-4 place-self-center py-2 px-4">
        <span className="text-2xl font-bold m-3 place-self-start">
          Add Profile
        </span>
        <div className="flex flex-row justify-center items-center">
          <span className="flex w-1/4">Email:</span>
          <Input
            isRequired
            type="email"
            placeholder="Enter your email"
            defaultValue=""
            onValueChange={(value) => setEmail(value)}
            className="flex border border-sage-green outline-2 py-1 w-48"
          />
        </div>

        {console.log(email)}

        <div className="flex flex-row justify-center items-center">
          <span className="flex w-1/4">Name: </span>
          <Input
            isRequired
            placeholder="Enter your Name"
            defaultValue=""
            onValueChange={(value) => setName(value)}
            className="flex border border-sage-green outline-2 py-1 w-48"
          />
        </div>

        <ButtonGroup
          variant="flat"
          className="flex flex-row md:flex-nowrap flex-wrap items-center"
        >
          <span className="flex w-1/4">Access: </span>
          <div className="flex border border-sage-green p-1 w-48 justify-between ">
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

        <div className="flex justify-center items-end">
          <Button
            className="bg-dark-green p-1 px-10 rounded-md text-white m-4"
            onClick={() => handleSaveProfile()}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
