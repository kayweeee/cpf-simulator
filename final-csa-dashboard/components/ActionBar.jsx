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

    async function onClick() {
        review
            ? ( 
                router.back()
            )
            : (   
                router.push({
                    pathname: `/${id}/review`,
                    query: { data: JSON.stringify({
                        question: document.getElementById("question-content").innerHTML,
                        response: document.getElementById("user-response").value
                    })},
                })

            )
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