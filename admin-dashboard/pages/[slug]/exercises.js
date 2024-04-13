// framework
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// images and icons
import { ChevronLeft } from "@mui/icons-material";
// components
import isAuth from "../../components/isAuth";

function Exercises() {
  const router = useRouter();
  const { submit } = router.query;
  const [name, setName] = useState("");
  const [allQuestions, setAllQuestions] = useState([]);

  useEffect(() => {
    async function getQuestions() {
      const user_id = 1;
      if (router.isReady) {
        const scheme_name = router.query.slug;
        window.localStorage.setItem("schemeName", scheme_name);
        const res = await fetch(
          `http://127.0.0.1:8000/questions/scheme/${scheme_name}`
        );
        const questions = await res.json();
        setAllQuestions(questions);
        setName(scheme_name.charAt(0).toUpperCase() + scheme_name.slice(1));
      }
    }

    getQuestions();
  }, [router.isReady]);

  function handleQuestionNav(question_id) {
    router.push(
      {
        pathname: `/${question_id}/question`,
        query: { scheme_name: name },
      },
      undefined,
      {
        shallow: true,
      }
    );
  }

  // Change table height according to image height
  const tableCellStyle = `text-start py-6 border px-5`;
  const tableCenterCellStyle = `text-center py-6 border`;

  const getdifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-500";
      case "Medium":
        return "text-yellow-500";
      case "Hard":
        return "text-red-500";
      default:
        return "";
    }
  };

  console.log(allQuestions);

  return (
    <div className="text-base bg-light-green">
      <button
        className="button-btm"
        onClick={(submit) => {
          submit ? router.push(`/schemes`) : router.back();
        }}
      >
        <div className="hover:text-gray-600 flex flex-row pl-5 pt-5">
          <ChevronLeft style={{ verticalAlign: "middle" }} />
          <span className="back-text">Back to Schemes</span>
        </div>
      </button>
      <div className="w-screen flex items-center justify-center p-4">
        <div className="bg-white min-w-full rounded-md p-6">
          <div className="font-bold text-3xl pt-6 pb-10">{name} Scheme</div>

          {/* Table */}
          <table className="w-full table-fixed border border-collapse border-slate-200">
            <thead>
              <tr>
                <th className={`${tableCellStyle} w-1/3 bg-dark-grey`}>
                  Question
                </th>
                <th className={`${tableCenterCellStyle} bg-dark-grey`}>
                  Difficulty
                </th>
                <th className={`${tableCenterCellStyle} bg-dark-grey`}>
                  Scheme
                </th>
              </tr>
            </thead>

            <tbody>
              {allQuestions.map((question, index) => (
                <tr
                  key={index + 1}
                  className="hover:bg-light-gray hover:cursor-pointer"
                >
                  <td
                    className={`${tableCellStyle} hover:underline hover:underline-offset-2`}
                    onClick={() => handleQuestionNav(question.question_id)}
                  >{`${index + 1}. ${question.title}`}</td>
                  <td
                    className={`${tableCenterCellStyle} ${getdifficultyColor(
                      question.question_difficulty
                    )}`}
                  >
                    {question.question_difficulty}
                  </td>
                  <td className={`${tableCenterCellStyle}`}>
                    {question.scheme_name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default isAuth(Exercises);
