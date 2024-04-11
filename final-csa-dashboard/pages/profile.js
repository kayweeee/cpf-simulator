// framework
import { useEffect, useState } from "react";
// components
import CustomTable from "../components/CustomTable.jsx";
import RadialGraph from "../components/PieGraph.jsx";
import isAuth from "../components/isAuth.jsx";
import ProgressBar from "../components/ProgressBar.jsx";

function Profile({ user }) {
  const [attempts, setAttempts] = useState([]);
  const [averageScores, setAverageScores] = useState([]);
  const [subCat, setSubCat] = useState([]);

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

    async function getAverageScores() {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/attempt/user/${user.uuid}/average_scores`
        );

        const averageData = await res.json();

        const averageDataFormat = [
          {
            label: "Accuracy",
            value: averageData.accuracy_score_avg,
            total: 5,
          },
          {
            label: "Precision",
            value: averageData.precision_score_avg,
            total: 5,
          },
          { label: "Tone", value: averageData.tone_score_avg, total: 5 },
        ];

        setAverageScores(averageDataFormat);
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
      getAverageScores();
      getSubCat();
    }
  }, [user]);

  const data = {
    labels: ["Retirement", "Housing", "Medisave"],
    datasets: [
      {
        data: [76, 25, 100],
      },
    ],
  };
  console.log(subCat);

  return (
    <>
      <div className="bg-light-green p-4">
        <div className="bg-light-gray rounded-lg w-auto h-1/2 flex flex-col mt-4">
          <h3 className="pl-5 pt-5 font-bold pb-3">Overall Scores</h3>
          <div className=" pb-4 w-full h-max-content flex justify-around items-center ">
            {averageScores.map((score, idx) => (
              <RadialGraph key={idx} data={score} label={score.label} />
            ))}
          </div>
        </div>
        <div className="h-max-content flex flex-row items-start">
          <div className="bg-light-gray rounded-lg w-1/2 mt-4 mr-4 py-5">
            <h3 className="pl-5 font-bold">Subcategory Mastery</h3>
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
          <div className="bg-light-gray rounded-lg w-1/2 mt-4">
            <h3 className="pl-5 pt-5 font-bold">Exercise Board</h3>
            <div className="rounded-lg py-4 px-4 h-full flex items-center ">
              <CustomTable rows={attempts} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default isAuth(Profile);
