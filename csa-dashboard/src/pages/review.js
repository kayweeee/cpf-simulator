import Topnavbar from '../components/Topnavbar.js';
import Bottomnavbar from '../components/Bottomnavbar.js';
import Radialgraph from '../components/Radialgraph.js';
import Download from '@mui/icons-material/SimCardDownloadOutlined';
import './review.css';
import '../app/[[...slug]]/index.css';
import { piepercentage } from '../components/utils/helpers.js';
import Questionbar from '../components/Questionbar.js';
import Submitbar from '../components/Submitbar.js';

export default function ReviewPage() {
    async function onClick(event) {
        event.preventDefault()
    
        let url = "/exercisepage"
        window.location.href = url;
      }

    return (
        <>
            <div className='page-container'>
                <Topnavbar loginstate={true}/>
                <Questionbar progress={2} />
                <div className="label-bar">
                    <h3 className='label'>Feedback</h3>
                    <button type="button" className='button'>
                        <Download fontSize='large' />
                        Download
                    </button>
                </div>
                <div className='user-response'>
                    <h3>Your Text:</h3>
                    <p>Lorem ipsum dolor sit amet. Qui asperiores voluptatem quo atque veritatis vel nihil ipsum. Eos quibusdam enim aut exercitationem neque id itaque voluptatem aut eaque consequatur. Lorem ipsum dolor sit amet. Qui asperiores voluptatem quo atque veritatis vel nihil ipsum. Eos quibusdam enim aut exercitationem neque id itaque voluptatem aut eaque consequatur. Lorem ipsum dolor sit amet. Qui asperiores voluptatem quo atque veritatis vel nihil ipsum. Eos quibusdam enim aut exercitationem neque id itaque voluptatem aut eaque consequatur. Lorem ipsum dolor sit amet. Qui asperiores voluptatem quo atque veritatis vel nihil ipsum. Eos quibusdam enim aut exercitationem neque id itaque voluptatem aut eaque consequatur.</p>
                </div>
                <div className='model-review'>
                    <h3>Feedback:</h3>
                    <p>Lorem ipsum dolor sit amet. Qui asperiores voluptatem quo atque veritatis vel nihil ipsum. Eos quibusdam enim aut exercitationem neque id itaque voluptatem aut eaque consequatur. Lorem ipsum dolor sit amet. Qui asperiores voluptatem quo atque veritatis vel nihil ipsum. Eos quibusdam enim aut exercitationem neque id itaque voluptatem aut eaque consequatur. Lorem ipsum dolor sit amet. Qui asperiores voluptatem quo atque veritatis vel nihil ipsum. Eos quibusdam enim aut exercitationem neque id itaque voluptatem aut eaque consequatur. Lorem ipsum dolor sit amet. Qui asperiores voluptatem quo atque veritatis vel nihil ipsum. Eos quibusdam enim aut exercitationem neque id itaque voluptatem aut eaque consequatur.</p>
                </div>
                <div className="label-bar">
                    <h3 className='label'>Overall Scores</h3>
                </div>

                <div className='graphs'>
                    <div className='pie-graph'>
                        <Radialgraph id='Accuracy' />
                        <p className='pie-name'>Accuracy</p>
                    </div>
                    <div className='pie-graph'>
                        <Radialgraph id='Detail' />
                        <p className='pie-name'>Level of Detail</p>
                    </div>
                    <div className='pie-graph'>
                        <Radialgraph id='Conciseness' />
                        <p className='pie-name'>Conciseness</p>
                    </div>
                    <div className='pie-graph'>
                        <Radialgraph id='Tone' />
                        <p className='pie-name'>Tone</p>
                    </div>       
                </div>
                <Submitbar onClick={onClick} review={true}/>
                <Bottomnavbar />
            </div>
        </>
    )
}