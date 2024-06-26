// framework
import Image from "next/image";
import { useState, useEffect } from "react";
// icons and images
import landingpage from "../public/landingpage.png";
import feedbackpage from "../public/feedbackpage.png";
// components
import SchemeCard from "../components/SchemeCard";

export default function Home() {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    async function getSchemes() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/scheme`);

        const schemeData = await res.json();
        setSchemes(schemeData);
      } catch (e) {
        console.log(e);
      }
    }

    getSchemes();
  }, []);

  return (
    <div className="text-base">
      {/* Intro Page */}
      <div className="w-screen h-auto flex flex-row items-center justify-center pl-20 gap-8 py-10 bg-light-green">
        <div className=" w-2/5 flex flex-col gap-8">
          <div className="font-bold text-3xl">
            Start training with CPF simulator
          </div>
          <div>
          We are excited to introduce a new training simulator powered by GenAI, designed to enhance the proficiency of CCU officers in handling written enquiries.
          </div>
          <div>
            <button className="bg-dark-green hover:bg-darker-green text-white py-3 px-8 rounded-lg">
              Let's Start
            </button>
          </div>
        </div>
        <div className="drop-shadow-2xl">
          <Image
            height={500}
            src={landingpage}
            priority
            alt="Trainee email simulator"
            className="rounded-xl"
          />
        </div>
      </div>

      {/* Feature Highlights */}
      <div
        className="py-10 flex flex-col gap-16 bg-scroll bg-center bg-no-repeat bg-contain"
        style={{
          backgroundImage: `url('/backgroundRectangle.png')`,
        }}
      >
        <div className="flex flex-row justify-center items-center gap-20">
          <div className="w-2/5 flex flex-col gap-8 border-4 px-8 py-12 text-center drop-shadow-m rounded-lg">
            <div className="text-3xl font-bold text-sage-green">
              Practice and refine your skills
            </div>
            <div>
            The practice cases within the simulator are adapted from real enquiries received by the Customer Correspondence Unit,
            ensuring you are exposed to authentic scenarios.
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
                Gain valuable feedback on your performance
              </div>
              <div>
              Through this immersive training experience,
              you can identify areas of strength and opportunities for improvement,
              ultimately enhancing your ability to provide effective and efficient responses to customer enquiries.
              </div>
            </div>
          </div>
        </div>

        {/* Schemes */}
        <div className="flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-5 ">
            <div className="flex flex-row flex-wrap px-20 justify-around gap-y-7 mb-8">
              {schemes.map((i) => (
                <SchemeCard
                  key={i.scheme_name}
                  scheme_name={i.scheme_name}
                  scheme_img={i.scheme_csa_img_path}
                  questions={i.questions.length}
                  scheme_button={false}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <button className="py-2 px-16 border-2 border-dark-green bg-dark-green rounded-lg hover:bg-darker-green text-white">
              Log in to start!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
