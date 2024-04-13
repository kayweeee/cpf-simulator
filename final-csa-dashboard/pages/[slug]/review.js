// framework
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
// components
import RadialGraph from "../../components/PieGraph.jsx";
import QuestionBar from "../../components/QuestionBar.jsx";
import isAuth from "../../components/isAuth.jsx";
// icons
import Download from "@mui/icons-material/SimCardDownloadOutlined";

function ReviewPage({ user }) {
  const router = useRouter();
  const { review, submit, profile, scheme_name } = router.query;
  const [attempt, setAttempt] = useState([]);
  const loginDetails = user;
  const schemeName = window.localStorage.getItem("schemeName");

  useEffect(() => {
    async function getAttempt() {
      if (router.isReady) {
        const attempt_id = router.query.slug;
        const res = await fetch(`http://127.0.0.1:8000/attempt/${attempt_id}`);

        const attemptData = await res.json();

        setAttempt(attemptData);
      }
    }
    getAttempt();
  }, [router.isReady]);

  const feedbackData = [
    {
      label: "Accuracy",
      value: attempt.accuracy_score,
      total: 5,
      feedback: attempt.accuracy_feedback,
    },
    {
      label: "Comprehension",
      value: attempt.precision_score,
      total: 5,
      feedback: attempt.precision_feedback,
    },
    {
      label: "Tone",
      value: attempt.tone_score,
      total: 5,
      feedback: attempt.tone_feedback,
    },
  ];

  function handleQuestionNav(question_id) {
    router.push(`/${question_id}/question`, undefined, {
      shallow: true,
    });
  }

  const convertToCSV = (data) => {
    const csvContent = [
      ["employee's name", loginDetails.name],
      ["employee's email", loginDetails.email],
      ["scheme", schemeName],
      ["question:", attempt.question_details],
      ["answer:", attempt.answer],
      ["Overall Scores:"],
    ];

    feedbackData.forEach((item) => {
      csvContent.push([
        `${item.label}:`,
        item.feedback,
        `${(item.value / item.total) * 100}%`,
      ]);
    });

    return csvContent.map((row) => row.join(",")).join("\n");
  };

  const handleDownload = () => {
    const csvContent = convertToCSV();
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, `${loginDetails.name}_transcript.csv`);
  };

  return (
    <>
      <div className="bg-light-green p-4">
        <QuestionBar
          currentidx={attempt.id}
          review={review}
          submit={submit}
          profile={profile}
          scheme_name={scheme_name}
        />
        <div className="bg-light-gray rounded-md px-6 pb-12 pt-6 m-5 ">
          <div className="p-4 w-auto h-max-content flex justify-between items-center font-bold">
            <div className="text-2xl">Feedback</div>
            <button type="button" className="button" onClick={handleDownload}>
              <Download fontSize="medium" />
              Download
            </button>
          </div>
          <div className="pl-4 pr-4 mb-4">
            <h3 className="font-bold">Question:</h3>
            <p>{attempt.question_details}</p>
          </div>
          <div className="pl-4 pr-4 mb-4">
            <h3 className="font-bold">Your Answer:</h3>
            <p>{attempt.answer}</p>
          </div>
          <h3 className="px-4 py-2 w-auto h-max-content flex justify-between items-center font-bold">
            Overall Scores
          </h3>
          <div className="pb-4 w-full w-max-screen flex justify-between items-center gap-10 px-5">
            {feedbackData.map((i, idx) => (
              <div
                className="flex flex-col justify-center w-1/3 h-auto"
                key={idx}
              >
                <div className="p-4">
                  <RadialGraph data={i} label={i.label} />
                </div>
                <div className="h-24 text-base text-justify">{i.feedback}</div>
              </div>
            ))}
          </div>
        </div>

        <hr className="mt-5 border-grey" />
        <div className="p-5 flex flex-row justify-center">
          <button
            className="border-4 border-solid border-transparent rounded-lg bg-dark-green pl-3 pr-3 pt-1 pb-1 text-white transition duration-300 hover:bg-light-green hover:text-gray-600"
            onClick={() => handleQuestionNav(attempt.question_id)}
          >
            Try Again
          </button>
        </div>
      </div>
    </>
  );
}

export default isAuth(ReviewPage);
