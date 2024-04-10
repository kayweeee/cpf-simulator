import { useRouter } from 'next/router'
import { ChevronLeft } from '@mui/icons-material';

export default function QuestionBar({currentidx, review}) {
    const router = useRouter();
    const questiondata = [1,2,3,4,5,6,7,8,9,10];

    return (
        <>
            <div className="flex items-center justify-start items-center w-full overflow-hidden">
                    <button className="button-btm" onClick={() => router.back()}>
                        <div className="hover:text-gray-600 flex flex-row">
                            <ChevronLeft style={{ verticalAlign: 'middle' }} />
                            <span className="back-text">{review ? "Back to Question" : "Back to Question List"}</span>
                        </div>
                    </button>
                <div className="ml-10"> Question {currentidx}</div>
                <div className="rounded-lg bg-grey w-2/3 ml-5 justify-start p-1 h-max-content">
                    <div className="flex flex-row">
                        {questiondata.map((i) => (
                            currentidx-1 >= questiondata.indexOf(i) ?
                                <div className="grow h-2 mr-1 bg-dark-green rounded-lg" key={i}/>
                                : <div className="grow h-2 mr-1 bg-gray-400 rounded-lg" key={i}/>
                        ))
                        }
                    </div>
                </div>

            </div>
            <hr className='mt-5 border-grey' />
        </>
    )
}