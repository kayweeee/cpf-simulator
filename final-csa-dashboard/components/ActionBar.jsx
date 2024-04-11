import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ActionBar({ review }) {
    const router = useRouter();
    const [id, setId] = useState(null);

    useEffect(() => {
        if (router.isReady) {
            setId(router.query.slug)
        }
    }, [router.isReady, id]);

    async function onClick(event) {
        event.preventDefault();
        if (review) {
            router.back()
        } else {
            try {
                const res = await fetch("http://127.0.0.1:8000/attempt", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "user_id": "12345", //TODO: change to user id
                        "question_id": router.query.id,
                        "answer": document.getElementById("user-response").value
                    }),
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch data')
                } else {
                    const data = await res.json();
                    attemptid = data.attempt_id
                    router.push({
                        pathname: `/${router.query.slug}/${router.query.id}/review`,
                        query: { attemptId: JSON.stringify("464ffdd9-74d6-423b-ae89-ca0ca7d001da") }, //replace upon successful attempt_id
                    })
                }
            } catch (e) {
                console.log(e);
            }
        }
    }

    return (
        <>
            <hr className='mt-5 border-grey' />
            <div className="p-5 flex flex-row justify-between">
                <button className="hover:text-gray-600"><ChevronLeft style={{ verticalAlign: 'middle' }} />Previous Question</button>
                <button className="border-4 border-solid border-transparent rounded-lg bg-dark-green pl-3 pr-3 pt-1 pb-1 text-white transition duration-300 hover:bg-light-green hover:text-gray-600" onClick={onClick}>{review ? "Try Again" : "Submit"}</button>
                <button className="hover:text-gray-600">Next Question<ChevronRight style={{ verticalAlign: 'middle' }} /></button>
            </div>
        </>
    )
}