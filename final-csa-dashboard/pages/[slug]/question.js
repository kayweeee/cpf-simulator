import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import QuestionBar from "../../components/QuestionBar";
import ActionBar from "../../components/ActionBar";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Question() {
  const router = useRouter();
  const [id, setId] = useState(null);

  useEffect(() => {
      if (router.isReady) {
          // TODO: get data from API with router.query.slug
          // data to get: question data.
          setId(router.query.slug)

      }
  }, [router.isReady, id]);

  const question_data = {
    id: 1,
    title: "Withdrawal From Retirement Account",
    name: "Mdm Tan",
    pic: "",
    designation: "CPF Member",
    content: "I would like to appeal to withdraw from my Retirement account about $5000. I am aware that if I withdraw my monthly payout will be much lesser. Please kindly assist me on my appeal soonest possible.",
  }

  return (
    <>
      <div className="bg-light-green p-4">
        <QuestionBar currentidx={id} review={false}/>
        <div className="bg-light-gray rounded-md p-6 m-5 ">
          <div className="p-4 w-auto h-max-content flex justify-between items-center font-bold">
            {question_data.title}
          </div>
          <div className="border-4 border-solid border-dark-green rounded-lg p-10 h-max-content flex items-start justify-center text-black mt-30 flex-col ml-20 mr-20 mb-5">
            <div className="flex flex-row items-center mb-3 ">
              <Avatar className="w-10 h-10 mr-3">
                <PersonIcon />
              </Avatar>
              <div>
                <p className='font-bold'>{question_data.name}</p>
                <p className='font-italic'>{question_data.designation}</p>
              </div>
            </div>
            <p id="question-content">{question_data.content}</p>
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

