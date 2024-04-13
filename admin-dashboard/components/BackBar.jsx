import { useRouter } from "next/router";
import { ChevronLeft } from "@mui/icons-material";

export default function BackBar({}) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <div className="flex justify-start items-center w-full overflow-hidden">
        <button className="button-btm" onClick={handleBack}>
          <div className="hover:text-gray-600 flex flex-row">
            <ChevronLeft style={{ verticalAlign: "middle" }} />
            <span className="back-text">Back</span>
          </div>
        </button>
      </div>
      <hr className="mt-5 border-grey" />
    </>
  );
}
