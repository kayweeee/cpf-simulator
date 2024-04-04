// framework
import Image from "next/image";
// images
import caseimg from "../public/case_scenario.png";

export default function SchemeCard({ scheme_name, scheme_img, questions }) {
  return (
    <div className="flex flex-col p-4 border-4 rounded-xl">
      <Image src={scheme_img} alt="scheme image" className="rounded-xl" />
      <div className="font-bold">{scheme_name}</div>
      <div className="flex flex-row gap-2">
        <Image src={caseimg} alt="case icon" />
        {questions}
      </div>
    </div>
  );
}
