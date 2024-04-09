import CustomTable from '../components/CustomTable.jsx';
import RadialGraph from '../components/PieGraph.jsx';
import BarGraph from '../components/BarGraph.jsx';

export default function Profile() {
    const data = {
        labels: ["Retirement", "Housing", "Medisave"],
        datasets: [
            {
                data: [76, 25, 100]
            }
        ]
    }

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

    const tabledata = [
        {
            id:'1',
            title: 'Retirement Scenario 5',
            time: 'Jan 25, 2024 01:32 PM',
        },
        {
            id:'2',
            title: 'Retirement Scenario 4',
            time: 'Jan 23, 2024 02:42 PM',
        },
        {
            id:'3',
            title: 'Retirement Scenario 3',
            time: 'Jan 22, 2024 01:20 PM',
        },
        {
            id:'4',
            title: 'Retirement Scenario 2',
            time: 'Jan 22, 2024 02:00 PM',
        },
        {
            id:'5',
            title: 'Retirement Scenario 1',
            time: 'Jan 22, 2024 01:00 PM',
        },
        {
            id:'6',
            title: 'Housing Scenario 6',
            time: 'Jan 22, 2024 12:00 PM',
        },
    ];


    return (
        <>
            <div className='bg-light-green p-4'>
                <div className='bg-light-gray rounded-lg p-3 h-max-content flex justify-between items-center'>
                    <span>Next up: Retirement Scenario 5</span>
                    <button type="button" className='bg-dark-green border-none text-white p-2 cursor-pointer rounded-lg'>Continue Course {'>'}</button>
                </div >
                <div className='bg-light-gray rounded-lg w-auto h-1/2 flex flex-col mt-4'>
                    <h3 className='pl-5 pt-5'>Overall Scores</h3>
                    <div className='px-20 pb-4 w-auto h-max-content flex justify-between items-center'>
                        <RadialGraph data={piedata[0]} label={"Accuracy"} />
                        <RadialGraph data={piedata[1]} label={"Level of Detail"} />
                        <RadialGraph data={piedata[2]} label={"Conciseness"} />
                        <RadialGraph data={piedata[3]} label={"Tone"} />
                    </div>
                </div>
                <div className='h-max-content flex flex-row items-start'>
                    <div className="bg-light-gray rounded-lg w-1/2 mr-4 mt-4">
                        <h3 className='pl-5 pt-5'>Subcategory Mastery</h3>
                        <div className='rounded-lg p-4 h-full flex items-center m-4'>
                            <BarGraph data={data} />
                        </div>
                    </div>
                    <div className="bg-light-gray rounded-lg w-1/2 ml-4 mt-4">
                        <h3 className='pl-5 pt-5'>Past Exercises</h3>
                        <div className='rounded-lg p-4 h-full flex items-center m-4'>
                            <CustomTable rows={tabledata}/>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}