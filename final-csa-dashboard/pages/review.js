import RadialGraph from "../components/PieGraph.jsx";
import Download from "@mui/icons-material/SimCardDownloadOutlined";
import QuestionBar from "../components/QuestionBar";
import ActionBar from "../components/ActionBar";

export default function ReviewPage() {
  const attempt = {
    accuracy_feedback:
      "The response lacks specific details that could be included to improve accuracy.",
    accuracy_score: 2,
    answer:
      "string is this lorujhkjsfdh hui ghow i think retirement age is closer to 65 than to 70. How about you try it out?",
    attempt_id: "1089f47a-70ff-4cb0-90d7-d8cd2c927587",
    date: "2024-04-11T00:45:05",
    feedback:
      "The trainee's response can be improved by providing more specific details to increase accuracy and precision in their answer.",
    precision_feedback:
      "The answer is quite brief; additional details could enhance the precision of the response.",
    precision_score: 2,
    question_id: "80d834f4-ba81-4efe-b74b-c451882825d6",
    tone_feedback:
      "The tone is generally respectful and professional, which is good.",
    tone_score: 3,
    user_id: "e76803a6-16b6-4e12-a110-e2f21a705f9e",
  };

  const feedbackData = [
    {
      label: "Accuracy",
      value: attempt.accuracy_score,
      total: 5,
      feedback: attempt.accuracy_feedback,
    },
    {
      label: "Precision",
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

  const question = "This is the question.";

  return (
    <>
      {/* TODO: Add in top bar */}
      <div className="bg-light-green p-4">
        <QuestionBar />
        <div className="p-4 w-auto h-max-content flex justify-between items-center font-bold">
          <div className="text-2xl">Feedback</div>

          <button type="button" className="button">
            <Download fontSize="medium" />
            Download
          </button>
        </div>
        <div className="pl-4 pr-4 mb-4">
          <h3 className="font-bold">Question:</h3>
          <p>{question}</p>
          <h3 className="font-bold mt-4">Your Answer:</h3>
          <p>{attempt.answer}</p>
        </div>
        <h3 className="px-4 py-2 w-auto h-max-content flex justify-between items-center font-bold">
          Overall Scores
        </h3>
        <div className="pb-4 w-full w-max-screen flex justify-between items-center gap-10 px-5">
          {feedbackData.map((i) => (
            <div className="flex flex-col justify-center w-1/3 h-auto">
              <div className="p-4">
                <RadialGraph data={i} label={i.label} />
              </div>
              <div className="h-24 text-base text-justify">{i.feedback}</div>
            </div>
          ))}
        </div>
        <ActionBar review={true} />
      </div>
    </>
  );
}
