// framework
import Image from "next/image";
// icons and images
import landingpage from "../public/landingpage.png";
import feedbackpage from "../public/feedbackpage.png";
import transcriptsimage from "../public/transcriptsimage.png";
import retirementimage from "../public/retirement.png";
// components
import SchemeCard from "../components/SchemeCard";

export default function Home() {
  // scheme card example data (to be replaced with api call)
  const exampleData = [
    {
      scheme_name: "Retirement",
      questions: 20,
      scheme_img: retirementimage,
    },
    {
      scheme_name: "a",
      questions: 20,
      scheme_img: retirementimage,
    },
    {
      scheme_name: "b",
      questions: 20,
      scheme_img: retirementimage,
    },
    {
      scheme_name: "c",
      questions: 20,
      scheme_img: retirementimage,
    },
  ];

  return (
    <div className="text-xl">
      {/* Intro Page */}
      <div className="w-screen h-auto bg-light-green flex flex-row items-center justify-center pl-20 gap-8 py-24">
        <div className=" w-2/5 flex flex-col gap-8">
          <div className="font-bold text-5xl">
            Start training with CPF simulator
          </div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum
            nisi aliquet volutpat pellentesque volutpat est. Sapien in etiam
            vitae nibh nunc mattis imperdiet sed nullam.
          </div>
          <div>
            <button className="bg-dark-green text-white py-4 px-8 rounded-lg">
              Let's Start
            </button>
          </div>
        </div>
        <div className="drop-shadow-2xl ">
          <Image height={700} src={landingpage} alt="Trainee email enquiry" />
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="py-20 flex flex-col gap-20">
        <div className="flex flex-row justify-center items-center gap-20">
          <div className="w-2/5 flex flex-col gap-8 border-4 px-8 py-12 text-center drop-shadow-m rounded-lg">
            <div className="text-3xl font-extrabold text-sage-green">
              Practice with Simulated Exercises
            </div>
            <div>
              speak Up is a quick and convenient online test to help higher
              education institutions and employers check the English levels of
              individuals and groups of candidates.
            </div>
          </div>

          <div className="w-2/5 flex flex-col gap-8">
            <Image
              src={feedbackpage}
              alt="feedback page"
              className="drop-shadow-xl rounded-2xl"
            />
            <div>
              <div className="text-3xl font-bold pb-2">
                Gain real-time feedback on your performance.
              </div>
              <div>
                Our range of free teaching resources, lesson plans and
                activities is designed to help you prepare your students for our
                exams and tests. We also have a range of teaching
                qualifications, courses and support to help you as a teacher.
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-center items-center gap-20">
          <div className="w-2/5">
            <Image src={transcriptsimage} alt="transcripts" />
          </div>
          <div className="w-2/5">
            <div className="text-3xl font-bold">
              Download your transcripts for offline reference
            </div>
            <div>
              speak Up is a quick and convenient online test to help higher
              education institutions and employers check the English levels of
              individuals and groups of candidates.
            </div>
          </div>
        </div>

        {/* Schemes */}
        <div className="flex flex-col gap-y-5">
          <div className="flex flex-row flex-wrap px-40 justify-between gap-y-7">
            {exampleData.map((i) => (
              <SchemeCard
                key={i.scheme_name}
                scheme_name={i.scheme_name}
                scheme_img={i.scheme_img}
                questions={i.questions}
              />
            ))}
          </div>
          <div className="flex justify-center">
            <button className="py-2 px-16 border-2 border-dark-green rounded-lg hover:bg-dark-green hover:text-white">
              Log in to start now!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
