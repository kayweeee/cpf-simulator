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
  const review = router.query.review === "true";
  const submit = router.query.submit === "true";
  const profile = router.query.profile === "true";
  const scheme_name = router.query.scheme_name || null;
  const [attempt, setAttempt] = useState([]);
  const loginDetails = user;

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

  const convertToCSV = (attempt) => {
    const headers = [
      "Name",
      "Email",
      "Scheme",
      "Date",
      "Question Title",
      "Question",
      "Answer",
      "Accuracy Feedback",
      "Accuracy Score",
      "Precision Feedback",
      "Precision Score",
      "Tone Feedback",
      "Tone Score",
    ];

    // Generate rows
    const row = [
      loginDetails.name,
      loginDetails.email,
      `"${attempt.scheme_name}"`,
      `"${attempt.date}"`,
      `"${attempt.title}"`,
      `"${attempt.question_details}"`,
      `"${attempt.answer}"`,
      `"${attempt.accuracy_feedback}"`,
      `${(attempt.accuracy_score / 5) * 100}%`,
      `"${attempt.precision_feedback}"`,
      `${(attempt.precision_score / 5) * 100}%`,
      `"${attempt.tone_feedback}"`,
      `${(attempt.tone_score / 5) * 100}%`,
    ];

    // Combine headers and row
    const csvContent = [headers];
    csvContent.push(row);

    return csvContent.map((row) => row.join(",")).join("\n");
  };

  const handleDownload = async () => {
    const csvContent = convertToCSV(attempt);
    const csvBlob = new Blob([csvContent], { type: "text/csv" });
    saveAs(
      csvBlob,
      `${loginDetails.name}_${attempt.scheme_name} scheme_${attempt.title}_transcript.csv`
    );
  };

  return (
    <>
      <div className="bg-light-green p-4">
        <QuestionBar
          currentidx={attempt.id}
          review={review}
          submit={submit}
          profile={profile}
          scheme_name={attempt.scheme_name}
        />
        <div className="bg-light-gray rounded-md px-6 pb-12 pt-6 m-5 ">
          <div className="p-4 w-auto h-max-content flex justify-between items-center font-bold">
            <div className="text-2xl">Feedback on your performance</div>
            <button type="button" className="button" onClick={handleDownload}>
              <Download fontSize="medium" />
              Download
            </button>
          </div>
          <div className="pl-4 pr-4 mb-4">
            <h3 className="font-bold">Practice Question:</h3>
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
