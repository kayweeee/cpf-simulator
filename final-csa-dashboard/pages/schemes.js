// framework
import Image from "next/image";
// icons and images
import retirementimage from "../public/retirement.png";
import medisaveimage from "../public/medisave.png";
import housingimage from "../public/housing.png";
// components
import SchemeCard from "../components/SchemeCard";

export default function Schemes() {
  // scheme card example data (to be replaced with api call)
  const exampleData = [
    {
      scheme_name: "Retirement",
      questions: 20,
      scheme_img: retirementimage,
      enabled: true,
    },
    {
      scheme_name: "Medisave",
      questions: 20,
      scheme_img: medisaveimage,
      enabled: false,
    },
    {
      scheme_name: "Housing",
      questions: 20,
      scheme_img: housingimage,
      enabled: false,
    },
  ];

  return (
    <div className="text-base">
      <div>
        {/* Header */}
        <div className="w-screen h-auto flex flex-row justify-between items-center px-20 pt-10 pb-10 text-black">
          <div className="font-bold text-3xl">Schemes</div>
        </div>
        <div className="flex flex-col gap-y-5 min-h-screen">
          <div className="flex flex-row flex-wrap px-20 justify-between gap-y-7 mb-8">
            {exampleData.map((i) => (
              <SchemeCard
                key={i.scheme_name}
                scheme_name={i.scheme_name}
                scheme_img={i.scheme_img}
                questions={i.questions}
                scheme_button={true}
                enabled={i.enabled}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
