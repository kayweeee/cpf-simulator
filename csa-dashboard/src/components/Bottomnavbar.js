import Link from 'next/link';
import './Bottomnavbar.css';

function Bottomnavbar() {
  return (
    <nav className='bottom-nav-menu'>
      <div className='nav-left'>
        <span><b>CPF Board Simulator</b></span>
      </div>

      <div className='nav-right'>
        
        <ul>
        <li style={{ fontWeight: 'bold', paddingBottom: '10px' }}>Schemes</li>
          <li><Link href='/retirement'>Retirement</Link></li>
          <li><Link href='/housing'>Housing</Link></li>
          <li><Link href='/medisave'>Medisave</Link></li>
        </ul>
        <ul>
        <li style={{ fontWeight: 'bold', paddingBottom: '10px' }}>Products</li>
          <li><Link href='/home'>Home</Link></li>
          <li><Link href='/schemes'>Schemes</Link></li>
          <li><Link href='/faq'>FAQ</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Bottomnavbar;
