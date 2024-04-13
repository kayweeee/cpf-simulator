import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input, Button } from "@nextui-org/react";
import { IoIosArrowBack } from "react-icons/io";

export default function AddScheme() {
  const router = useRouter();
  const [scheme_name, setSchemeName] = useState("");
  const [file, setFile] = useState("");

  const hiddenFileInput = useRef(null);

  const handleUploadImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setFile(i);
    }
  };

  const handleCancel = () => {
    router.push("/schemes");
  };

  async function addScheme(event) {
    event.preventDefault(); // Prevent default form submission
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(
        `http://127.0.0.1:8000/scheme?scheme_name=${encodeURIComponent(
          scheme_name
        )}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create scheme");
      }

      const data = await response.json();
      router.push("/schemes");
      return data;
    } catch (error) {
      console.error("Error creating scheme:", error);
      throw error;
    }
  }

  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-row">
        <Button
          startContent={<IoIosArrowBack />}
          className="flex items-center m-1 mx-3"
          onClick={() => router.push("/schemes")}
        >
          Back
        </Button>
      </div>

      {/* Actual page content */}
      <div className="w-1/2 flex flex-col justify-center items-center gap-4 place-self-center py-2 px-4">
        <span className="text-2xl font-bold my-3 place-self-start">
          Add Scheme
        </span>
        <div className="flex flex-row justify-center items-center">
          <span className="flex w-1/2">Scheme Name</span>
          <Input
            isRequired
            placeholder="Enter scheme name"
            defaultValue=""
            onValueChange={(value) => setSchemeName(value)}
            className="flex border border-sage-green outline-2 py-1 w-80"
          />
        </div>
        {/* Upload image */}
        <div className="flex flex-row justify-center items-center">
          <span className="flex w-1/2">Upload Image</span>
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleUploadImage}
            accept="image/*"
            className="flex border border-sage-green outline-2 py-1 w-80"
          />
        </div>
        {/* Cancel Button */}
        <div className="flex justify-center items-end">
          <Button
            className="bg-dark-green hover:bg-darker-green p-1 px-10 rounded-md text-white m-4"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          {/* Save Button */}
          <Button
            type="submit"
            className="bg-dark-green hover:bg-darker-green p-1 px-10 rounded-md text-white m-4"
            onClick={addScheme}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
