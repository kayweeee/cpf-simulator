import Image from "next/image";
import tickimage from "../../public/tickimage.png";
import { ChevronLeft } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Exercises() {
    const router = useRouter();
    const [name, setName] = useState(null);

    useEffect(() => {
        if (router.isReady) {
            setName(router.query.slug)
            // TODO: get data from API with router.query.slug
            // data to get: list of questions. 

        }
    }, [router.isReady]);

    function onClick(question) {
        router.push(`/${question.member.id}/question`, undefined, { shallow: true })
    }

    // Change table height according to image height
    const imageHeight = tickimage.height;
    const tableCellStyle = `text-start py-6 px-8 border`;
    const tableCenterCellStyle = `text-center py-6 px-8 border`;

    // Dummy data to be changed
    const teamMembers = [
        { id: 1, status: 'completed', title: 'Help with Medisave', difficulty: 'Easy', scheme: 'Medisave', remark: '' },
        { id: 2, status: 'completed', title: 'Help with Medisave', difficulty: 'Easy', scheme: 'Medisave', remark: '' },
        { id: 3, status: 'not completed', title: 'Medisave Balance', difficulty: 'Medium', scheme: 'Medisave', remark: '' },
        { id: 4, status: 'not completed', title: 'Withdrawing from Retirement Fund', difficulty: 'Hard', scheme: 'Retirement', remark: '' },
        { id: 5, status: 'not completed', title: 'Help with Medisave', difficulty: 'Easy', scheme: 'Medisave', remark: '' },
        { id: 6, status: 'not completed', title: 'Help with Medisave', difficulty: 'Easy', scheme: 'Medisave', remark: '' },
        { id: 7, status: 'completed', title: 'Help with Medisave', difficulty: 'Easy', scheme: 'Medisave', remark: '' },
        { id: 8, status: 'completed', title: 'Help with Medisave', difficulty: 'Easy', scheme: 'Medisave', remark: '' },
        { id: 9, status: 'not completed', title: 'Help with Medisave', difficulty: 'Easy', scheme: 'Medisave', remark: '' },
        { id: 10, status: 'completed', title: 'Help with Medisave', difficulty: 'Easy', scheme: 'Medisave', remark: '' },
        { id: 11, status: 'not completed', title: 'Help with Medisave', difficulty: 'Easy', scheme: 'Medisave', remark: '' },
        { id: 12, status: 'completed', title: 'Help with Medisave', difficulty: 'Easy', scheme: 'Medisave', remark: '' },
        { id: 13, status: 'not completed', title: 'Help with Medisave', difficulty: 'Easy', scheme: 'Medisave', remark: '' },
        { id: 14, status: 'completed', title: 'Help with Medisave', difficulty: 'Easy', scheme: 'Medisave', remark: '' },
        { id: 15, status: 'not completed', title: 'Help with Medisave', difficulty: 'Easy', scheme: 'Medisave', remark: '' },
    ];

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
                    <ChevronLeft style={{ verticalAlign: 'middle' }} />
                    <span className="back-text">Back to Schemes</span>
                </div>
            </button>
            <div className="w-screen flex items-center justify-center p-4">
                <div className="bg-white min-w-full rounded-md p-6">
                    <div className="font-bold text-3xl pt-6 pb-10">
                        {name} Scheme
                    </div>
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
                            {teamMembers.map((member, index) => (
                                <tr key={index + 1} className="hover:bg-light-gray hover:cursor-pointer" onClick={() => onClick({ member})}>
                                    <td className={`${tableCenterCellStyle}`} style={{ height: `${imageHeight}px`, padding: `6px 8px` }}>
                                        {member.status === "completed" && <Image src={tickimage} alt="Status" style={{ margin: '0 auto' }} />}
                                    </td>
                                    <td className={`${tableCellStyle}`}>{`${index + 1}. ${member.title}`}</td>
                                    <td className={`${tableCenterCellStyle} ${getdifficultyColor(member.difficulty)}`}>{member.difficulty}</td>
                                    <td className={`${tableCenterCellStyle}`}>{member.scheme}</td>
                                    <td className={`${tableCellStyle}`}>{member.remark}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
