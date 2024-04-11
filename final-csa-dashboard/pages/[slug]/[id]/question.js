import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import QuestionBar from "../../../components/QuestionBar";
import ActionBar from "../../../components/ActionBar";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Question() {
  const router = useRouter();
  const [question, setQuestion] = useState({})

  useEffect(() => {
    async function getData() {
      if (router.isReady) {
        try {
          const res = await fetch(`http://127.0.0.1:8000/question/${router.query.slug}`);
          if (!res.ok) {
            throw new Error('Failed to fetch data')
          } else {
            const data = await res.json();
            setQuestion(data[router.query.id -1]);
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
          <QuestionBar review={false} />
          <div className="bg-light-gray rounded-md p-6 m-5 ">
            <div className="border-4 border-solid border-dark-green rounded-lg p-10 h-max-content flex items-start justify-center text-black mt-30 flex-col ml-20 mr-20 mb-5">
              <div className="w-auto h-max-content flex justify-between items-center font-bold mb-5">
                {question.title}
              </div>
              <p id="question-content">{question.question_details}</p>
            </div>
            <div className="border-4 border-solid border-dark-green rounded-lg p-5 mt-30 flex-col ml-20 mr-20 overflow-auto" style={{ "height": 300 }}>
              <textarea
                placeholder="Please enter your reply here"
                className="w-full h-full bg-transparent"
                name="user-response"
                id="user-response"
              />
            </div>
          </div>
          <ActionBar review={false} />
        </div>
    </>
  );
}

