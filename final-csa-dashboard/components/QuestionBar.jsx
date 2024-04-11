import { useRouter } from "next/router";
import { ChevronLeft } from "@mui/icons-material";

export default function QuestionBar({ currentidx, review }) {
  const router = useRouter();
  const questiondata = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      <div className="flex justify-start items-center w-full overflow-hidden">
        <button className="button-btm" onClick={() => router.back()}>
          <div className="hover:text-gray-600 flex flex-row">
            <ChevronLeft style={{ verticalAlign: "middle" }} />
            <span className="back-text">
              {review ? "Back to Question" : "Back to Question List"}
            </span>
          </div>
        </button>
      </div>
      <hr className="mt-5 border-grey" />
    </>
  );
}
