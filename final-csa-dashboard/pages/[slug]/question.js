import QuestionBar from "../../components/QuestionBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Question({ user }) {
  const router = useRouter();
  // const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState("");

  // useEffect(() => {
  //   async function getData() {
  //     if (router.isReady) {
  //       try {
  //         const res = await fetch(
  //           `http://127.0.0.1:8000/question/${router.query.slug}`
  //         );
  //         if (!res.ok) {
  //           throw new Error("Failed to fetch data");
  //         } else {
  //           const data = await res.json();
  //           setQuestion(data[router.query.id - 1]);
  //         }
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     }
  //   }
  //   getData();
  // }, [router.isReady]);

  // console.log(question);

  const question = {
    ideal:
      "\nThe Full Retirement Sum (FRS) applicable to your father depends on the year he turned 55.\nYou can view the pdf with the past years’ Full Retirement Sums which is in our website FAQ on What are the retirement sums applicable to me?  \n",
    question_id: "175c6195-f864-4b9e-8111-48bb514ffe64",
    title: "Title 1",
    question_details:
      "Is the FRS amount based upon the year at which age that 55. So if my dad is 69\nyears now, the FRS amount is still based on the amount when he is at 55yrs?\nDo you have the chart under RSS scheme for FRS to check back against when he was 55 yrs?\n",
    question_difficulty: "Easy",
    scheme_name: "Retirement",
  };

  function handleReviewNav(review_id) {
    router.push(`/${review_id}/review`, undefined, {
      shallow: true,
    });
  }

  const handleSubmit = async () => {
    const res = await fetch(`http://127.0.0.1:8000/attempt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.uuid,
        question_id: question.question_id,
        answer: answer,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      handleReviewNav(data);
    }
  };

  return (
    <>
      <div className="bg-light-green p-4">
        <QuestionBar review={false} />
        <div className="bg-light-gray rounded-md p-6 m-5 ">
          <div className="border-4 border-solid border-dark-green rounded-lg p-10 h-max-content flex items-start justify-center text-black mt-30 flex-col ml-20 mr-20 mb-5">
            <div className="w-auto h-max-content flex justify-between items-center font-bold mb-5">
              {question.title}
            </div>
            <p id="question-content">{question.question_details}</p>
          </div>
          <div
            className="border-4 border-solid border-dark-green rounded-lg p-5 mt-30 flex-col ml-20 mr-20 overflow-auto"
            style={{ height: 300 }}
          >
            <textarea
              placeholder="Please enter your reply here"
              className="w-full h-full bg-transparent"
              name="user-response"
              id="user-response"
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
        </div>
        <hr className="mt-5 border-grey" />
        <div className="p-5 flex flex-row justify-center">
          <button
            className="border-4 border-solid border-transparent rounded-lg bg-dark-green pl-3 pr-3 pt-1 pb-1 text-white transition duration-300 hover:bg-light-green hover:text-gray-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
