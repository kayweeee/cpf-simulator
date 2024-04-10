import { ChevronLeft, ChevronRight } from '@mui/icons-material';

export default function ActionBar() {
    const review = false
    async function onClick() {

    }

    return (
        <>
            <hr className='mt-5 border-grey' />
            <div className="p-5 flex flex-row justify-between">
                <button className="hover:text-gray-600"><ChevronLeft style={{ verticalAlign: 'middle' }} />Previous Question</button>
                <button className="border-4 border-solid border-dark-green rounded-lg bg-dark-green pl-3 pr-3 pt-1 pb-1 text-white transition duration-300" onClick={onClick}>{review ? "Try Again" : "Submit"}</button>
                <button className="hover:text-gray-600">Next Question<ChevronRight style={{ verticalAlign: 'middle' }} /></button>
            </div>
        </>
    )
}