import Image from "next/image";
import tickimage from "../../public/tickimage.png";
import { ChevronLeft } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Exercises() {
  const router = useRouter();
  const [name, setName] = useState(null);
  const [allQuestions, setAllQuestions] = useState([]);

  useEffect(() => {
    async function getQuestions() {
      if (router.isReady) {
        setName(router.query.slug);
        const res = await fetch(
          `http://127.0.0.1:8000/question/${router.query.slug}`
        );
        const questions = await res.json();
        setAllQuestions(questions);
        console.log(questions);
      }
    }

    getQuestions();
  }, [router.isReady]);

  function handleNav(question_id) {
    router.push(`/${question_id}/question`, undefined, {
      shallow: true,
    });
  }

  // Change table height according to image height
  const imageHeight = tickimage.height;
  const tableCellStyle = `text-start py-6 px-8 border`;
  const tableCenterCellStyle = `text-center py-6 px-8 border`;

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

  return (
    <div className="text-base bg-light-green">
      <button className="button-btm" onClick={() => router.back()}>
        <div className="hover:text-gray-600 flex flex-row pl-5 pt-5">
          <ChevronLeft style={{ verticalAlign: "middle" }} />
          <span className="back-text">Back to Schemes</span>
        </div>
      </button>
      <div className="w-screen flex items-center justify-center p-4">
        <div className="bg-white min-w-full rounded-md p-6">
          <div className="font-bold text-3xl pt-6 pb-10">{name} Scheme</div>
          {/* Table */}
          <table className="w-full table-auto border border-collapse border-slate-200">
            <thead>
              <tr>
                <th className={`${tableCenterCellStyle}`}>Status</th>
                <th className={`${tableCellStyle}`}>Title</th>
                <th className={`${tableCenterCellStyle}`}>Difficulty</th>
                <th className={`${tableCenterCellStyle}`}>Scheme</th>
                <th className={`${tableCenterCellStyle}`}>Remarks</th>
              </tr>
            </thead>

            <tbody>
              {allQuestions.map((question, index) => (
                <tr
                  key={index + 1}
                  className="hover:bg-light-gray hover:cursor-pointer"
                  onClick={() => handleNav(question.question_id)}
                >
                  <td
                    className={`${tableCenterCellStyle}`}
                    style={{ height: `${imageHeight}px`, padding: `6px 8px` }}
                  >
                    {question.status === "completed" && (
                      <Image
                        src={tickimage}
                        alt="Status"
                        style={{ margin: "0 auto" }}
                      />
                    )}
                  </td>
                  <td className={`${tableCellStyle}`}>{`${index + 1}. ${
                    question.title
                  }`}</td>
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
                  <td className={`${tableCellStyle}`}>{question.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
