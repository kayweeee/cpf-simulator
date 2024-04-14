// framework
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// components
import isAuth from "../../components/isAuth";
import BackBar from "../../components/BackBar";

function Question() {
  const router = useRouter();
  const [question, setQuestion] = useState([]);

  console.log(question.title, "here");

  useEffect(() => {
    async function getData() {
      if (router.isReady) {
        try {
          const res = await fetch(
            `http://127.0.0.1:8000/question/${router.query.slug}`
          );
          if (!res.ok) {
            throw new Error("Failed to fetch data");
          } else {
            const data = await res.json();
            setQuestion(data);
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
    getData();
  }, [router.isReady]);

  return (
    <>
      <div className="bg-light-green p-4">
        <BackBar review={false} submit={false} profile={false} />
        <div className="bg-light-gray rounded-md p-6 m-5 ">
          <div className="border-4 border-solid border-dark-green rounded-lg p-8 h-max-content flex items-start justify-center text-black mt-30 flex-col ml-20 mr-20 mb-5 gap-4">
            <div className="font-bold text-2xl">{question.title}</div>
            <div>
              <div>
                <span className="font-bold">Scheme: </span>
                {question.scheme_name}
              </div>
              <div>
                <span className="font-bold">Difficulty: </span>
                {question.question_difficulty}
              </div>
            </div>

            <div>
              <p className="font-bold">Question:</p>
              <p>{question.question_details}</p>
            </div>
            <div>
              <p className="font-bold">Ideal Answer:</p>
              <p>{question.ideal}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default isAuth(Question);
