import { useRouter } from "next/navigation";
import { Input, Button } from "@nextui-org/react";
import { IoIosArrowBack } from "react-icons/io";

export default function AddScheme() {
  const router = useRouter();

  const handleCancel = () => {
    router.push("/schemes");
  };

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
            <span className="text-2xl font-bold m-3 place-self-start">
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
                className="bg-dark-green hover:bg-darker-green p-1 px-10 rounded-md text-white m-4"
                // onClick={saveScheme}
            >
                Save
            </Button>
            </div>
        </div>
        </div>
  );
}
