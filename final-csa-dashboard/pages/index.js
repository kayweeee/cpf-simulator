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
            Welcome to CPF Simulator! Improve your skills by engaging with
            real-life scenarios and boost your ability to independently respond
            to various enquiries across different schemes after training with
            us!
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
              Practice with Simulated Exercises
            </div>
            <div>
              The simulated exercises mirror real-life scenarios you might
              encounter, varying in difficulty levels from easy to medium to
              hard.
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
                Upon submitting your answer, you will instantly receive a
                personalized feedback from our machine learning model. This
                feedback is tailored specifically to your response.
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
              Log in to start now!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
