import { useRouter } from "next/router";
import { ChevronLeft } from "@mui/icons-material";

export default function QuestionBar({
  currentidx,
  review,
  submit,
  profile,
  scheme_name,
}) {
  const router = useRouter();

  const handleBack = () => {
    if (submit && scheme_name != null) {
      router.push({
        pathname: `/${scheme_name.toLowerCase()}/exercises`,
        query: { submit: true },
      });
    } else {
      router.back();
    }
  };

  return (
    <>
      <div className="flex justify-start items-center w-full overflow-hidden">
        <button className="button-btm" onClick={handleBack}>
          <div className="hover:text-gray-600 flex flex-row">
            <ChevronLeft style={{ verticalAlign: "middle" }} />
            <span className="back-text">
              {(review && !profile) || submit
                ? "Back to Question List"
                : review && profile
                ? "Back to My Profile"
                : "Back to Previous Page"}
            </span>
          </div>
        </button>
      </div>
      <hr className="mt-5 border-grey" />
    </>
  );
}
