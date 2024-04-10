import RadialGraph from '../components/PieGraph.jsx';
import Download from '@mui/icons-material/SimCardDownloadOutlined';
import QuestionBar from "../components/QuestionBar";
import ActionBar from "../components/ActionBar";

export default function ReviewPage() {
    const piedata = [
        {
            value: 47,
            total: 100
        },
        {
            value: 24,
            total: 100
        },
        {
            value: 59,
            total: 100
        },
        {
            value: 83,
            total: 100
        }
    ];

    const question = "This is the question.";

    const feedback = "This is some feedback.";

    const answer = "This is your answer.";

    return (
        <>

            <div className='bg-light-green p-4'>
                <QuestionBar />
                <div className="p-4 w-auto h-max-content flex justify-between items-center font-bold">
                    Feedback
                    <button type="button" className='button'>
                        <Download fontSize='medium' />
                        Download
                    </button>
                </div>
                <div className='pl-4 pr-4 mb-4'>
                    <h3 className='font-bold'>Question:</h3>
                    <p>{question}</p>
                </div>
                <div className='pl-4 pr-4 mb-4'>
                    <h3 className='font-bold'>Your Text:</h3>
                    <p>{answer}</p>
                </div>
                <div className='pl-4 pr-4 mb-4'>
                    <h3 className='font-bold'>Feedback:</h3>
                    <p>{feedback}</p>
                </div>
                <h3 className='p-4 w-auto h-max-content flex justify-between items-center font-bold'>Overall Scores</h3>
                <div className='px-20 pb-4 w-auto h-max-content flex justify-between items-center'>
                    <RadialGraph data={piedata[0]} label={"Accuracy"} />
                    <RadialGraph data={piedata[1]} label={"Level of Detail"} />
                    <RadialGraph data={piedata[2]} label={"Conciseness"} />
                    <RadialGraph data={piedata[3]} label={"Tone"} />
                </div>
                <ActionBar review={true}/>
            </div>

        </>
    )
}