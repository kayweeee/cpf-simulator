// framework
import Image from "next/image";
// images
import caseimg from "../public/case_scenario.png";

export default function SchemeCard({ scheme_name, scheme_img, questions, scheme_button, enabled }) {
  return (
    <div className="flex flex-col p-4 border-4 rounded-xl max-w-[350px]">
      <Image src={scheme_img} alt="scheme image" className="rounded-xl" />
      <div className="font-bold pt-2 pb-4">{scheme_name}</div>
      <div className="flex flex-row gap-2">
        <Image src={caseimg} alt="case icon" width="auto" height="auto" />
        <span>Case Scenarios:  {questions} </span>
      </div>
      {scheme_button ? (
        <div className="flex flex-row gap-2 pt-6">
          <button className={`${enabled ? 'bg-dark-green text-white py-2 px-4 rounded-md hover:bg-darker-green' : 'bg-gray-400 text-gray-700 py-2 px-4 rounded-md cursor-not-allowed'}`} disabled={!enabled}>
            Start Course
          </button>
        </div>
      ) : null}
    </div>
  );
}
