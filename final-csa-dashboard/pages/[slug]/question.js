// framework
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// components
import QuestionBar from "../../components/QuestionBar";
import isAuth from "../../components/isAuth";

function Question({ user }) {
  const router = useRouter();
  const { scheme_name } = router.query;
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    async function getData() {
      if (router.isReady) {
        try {
          console.log(router.query.slug);
          const res = await fetch(
            `https://d17ygk7qno65io.cloudfront.net/question/${router.query.slug}`
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

  function handleReviewNav(review_id) {
    router.push(
      {
        pathname: `/${review_id}/review`,
        query: {
          review: false,
          submit: true,
          profile: false,
          scheme_name: scheme_name,
        },
      },
      `/${review_id}/review`,
      {
        shallow: true,
      }
    );
  }

  const handleSubmit = async () => {
    setLoading(true);
    setSubmit(true);
    const res = await fetch(`https://d17ygk7qno65io.cloudfront.net/attempt`, {
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
    setLoading(false);
  };

  return (
    <>
      <div className="bg-light-green p-4">
        <QuestionBar
          review={false}
          submit={false}
          profile={false}
          scheme_name={question.scheme_name}
        />
        <div className="bg-light-gray rounded-md p-6 m-5 ">
          <div className="ml-20 mb-3 font-bold text-xl">Practice Question</div>

          <div className="border-4 border-solid border-dark-green rounded-lg p-10 h-max-content flex items-start justify-center text-black mt-30 flex-col ml-20 mr-20 mb-5">
            <div className="w-auto h-max-content flex justify-between items-center font-bold mb-5">
              {question.title}
            </div>
            <p id="question-content">{question.question_details}</p>
          </div>
          <div className="ml-20 mb-3 font-bold text-xl">Your Answer</div>
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
      {loading && (
        <div className="full-screen-overlay">
          <div className="overlay-content">
            <div className="loading-circle"></div>
            <div className="loading-text">Submitting...</div>
          </div>
        </div>
      )}
    </>
  );
}

export default isAuth(Question);
