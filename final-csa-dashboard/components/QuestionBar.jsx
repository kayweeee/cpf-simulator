import Link from "next/link";
import { ChevronLeft } from '@mui/icons-material';

export default function QuestionBar() {
    const currentidx = 2;
    const questiondata = ["id1", "id2", "id3", "id4", "id5", "id6", "id7", "id8", "id9", "id10"];

    return (
        <>
            <div className="flex items-center justify-start items-center w-full overflow-hidden">
                <Link href="/overallexercises">
                    <button className="button-btm">
                        <div className="hover:text-gray-600 flex flex-row">
                            <ChevronLeft style={{ verticalAlign: 'middle' }} />
                            <span className="back-text">Back to Question List</span>
                        </div>
                    </button>
                </Link>
                <div className="ml-10"> Question {currentidx+1}</div>
                <div className="rounded-lg bg-grey w-2/3 ml-5 justify-start p-1 h-max-content">
                    <div className="flex flex-row">
                        {questiondata.map((i) => (
                            currentidx >= questiondata.indexOf(i) ?
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