import './schemes.css';
import Topnavbar from '../../components/Topnavbar.js';
import Bottomnavbar from '../../components/Bottomnavbar.js';
import retirement from '../../../public/retirement.png';
import housing from '../../../public/housing.png';
import medisave from '../../../public/medisave.png';
import Schemelist from '../../components/schemelist.js';
import progress45 from '../../../public/progress45.png';
import progress20 from '../../../public/progress20.png';
import progress50 from '../../../public/progress50.png';
import '../../app/[[...slug]]/index.css';

export default function SchemesPage() {
  const data = [
    {
      "name": "Retirement",
      "cases": 11,
      "valid": true,
      "thumbnail": retirement.src,
      "progress": progress45.src,
      "href": "/overallexercises",
    },
    {
      "name": "Housing",
      "cases": 6,
      "valid": false,
      "thumbnail": housing.src,
      "progress": progress20.src,
    },
    {
      "name": "Medisave",
      "cases": 8,
      "valid": false,
      "thumbnail": medisave.src,
      "progress": progress50.src,
    }
  ]

  return (
    <div className='page-container'>
      {/* <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Poppins" /> */}
      <Topnavbar loginstate={true} />
      <header className='header'>
        <h1>Schemes</h1>
      </header>
      <div className='schemes-page'>
        {data.map((entry) => (
          <Schemelist entry={entry} />
        ))}
      </div>
      <Bottomnavbar />
    </div>
  );
}