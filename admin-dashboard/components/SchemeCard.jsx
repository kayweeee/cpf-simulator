// framework
import Image from "next/image";
import { useRouter } from "next/router";
// images
import caseimg from "../public/case_scenario.png";
import { TiDelete } from "react-icons/ti";

export default function SchemeCard({
  scheme_name,
  scheme_img,
  questions,
  scheme_button,
  editState,
  setDeleteId,
}) {
  const router = useRouter();

  function onClick() {
    var pagename = scheme_name.toLowerCase();
    router.push(`/${pagename}/exercises`, undefined, { shallow: true });
  }

  return (
    <div className="flex flex-col p-4 border-4 rounded-xl max-w-[350px] relative">
      <img
        src={scheme_img}
        alt="scheme image"
        className="rounded-xl object-cover h-48 w-48"
      />
      <div className="font-bold pt-2 pb-4">{scheme_name}</div>
      <div className="flex flex-row gap-2">
        <Image src={caseimg} alt="case icon" width="auto" height="auto" />
        <span>Case Scenarios: {questions} </span>
      </div>
      {scheme_button ? (
        <div className="flex flex-row gap-2 pt-6">
          <button
            onClick={onClick}
            className="bg-dark-green text-white py-2 px-4 rounded-md hover:bg-darker-green"
          >
            View Questions
          </button>
        </div>
      ) : null}
      {editState ? (
        <button
          className="absolute text-red-600 p-1 -top-6 -right-6"
          onClick={() => setDeleteId(scheme_name)}
        >
          <TiDelete size={40} />
        </button>
      ) : null}
    </div>
  );
}
