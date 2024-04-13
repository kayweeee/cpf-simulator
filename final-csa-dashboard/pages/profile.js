// framework
import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
// components
import CustomTable from "../components/CustomTable.jsx";
import isAuth from "../components/isAuth.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import AverageScores from "../components/AverageScores.jsx";
// icons
import Download from "@mui/icons-material/SimCardDownloadOutlined";

function Profile({ user }) {
  const [attempts, setAttempts] = useState([]);
  const [subCat, setSubCat] = useState([]);
  const loginDetails = user;

  useEffect(() => {
    async function getAttempts() {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/attempt/user/${user.uuid}`
        );
        const attemptRes = await res.json();
        setAttempts(attemptRes);
      } catch (e) {
        console.log(e);
      }
    }

    async function getSubCat() {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/user/${user.uuid}/schemes`
        );
        const subCatData = await res.json();
        setSubCat(subCatData);
      } catch (e) {
        console.log(e);
      }
    }

    if (user) {
      getAttempts();
      getSubCat();
    }
  }, [user]);

  const convertToCSV = (attempts) => {
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

    // Generate rows for each attempt
    const rows = attempts.map((attempt) => [
      loginDetails.name,
      loginDetails.email,
      attempt.scheme_name,
      attempt.date,
      `"${attempt.question_title}"`,
      `"${attempt.question_details}"`,
      `"${attempt.answer}"`,
      `"${attempt.accuracy_feedback}"`,
      `${(attempt.accuracy_score / 5) * 100}%`,
      `"${attempt.precision_feedback}"`,
      `${(attempt.precision_score / 5) * 100}%`,
      `"${attempt.tone_feedback}"`,
      `${(attempt.tone_score / 5) * 100}%`,
    ]);

    // Combine headers and rows
    const csvContent = [headers.join(",")];
    rows.forEach((row) => {
      csvContent.push(row.join(","));
    });

    return csvContent.join("\n");
  };

  const handleDownload = async () => {
    const csvContent = convertToCSV(attempts);
    const csvBlob = new Blob([csvContent], { type: "text/csv" });
    saveAs(csvBlob, `${loginDetails.name}_all_attempts.csv`);
  };

  return (
    <>
      <div className="bg-light-green p-4">
        <AverageScores className="mt-2" user={user} />

        <div className="h-max-content flex flex-row items-start">
          <div className="bg-light-gray rounded-lg w-1/2 mt-4 mr-4 py-5">
            <h3 className="pl-5 font-bold">Scheme Mastery</h3>
            <div className="rounded-lg p-5 w-full h-full flex flex-col justify-center items-center gap-5">
              {subCat.map((cat, idx) => (
                <ProgressBar
                  key={idx}
                  attemptedNum={cat.num_attempted_questions}
                  qnNum={cat.num_questions}
                  schemeName={cat.scheme_name}
                />
              ))}
            </div>
          </div>
          <div className="bg-light-gray rounded-lg w-1/2 mt-4 relative">
            <h3 className="pl-5 pt-5 font-bold">Attempts</h3>
            <div className="rounded-lg py-4 px-4 h-full flex items-center relative">
              <CustomTable rows={attempts} />
              <button
                type="button"
                className="absolute top-0 right-0 -mt-8 mr-4 bg-dark-green hover:bg-darker-green text-white font-bold py-2 px-4 rounded flex items-center"
                onClick={handleDownload}
              >
                <Download fontSize="medium" />
                Download All
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default isAuth(Profile);
