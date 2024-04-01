import './login.css';
import Topnavbar from '../components/Topnavbar.js';
import Bottomnavbar from '../components/Bottomnavbar.js';

export default function Login() {
    return (
        <div>
          <Topnavbar loginstate={false} />
          <div className="container">
            <div className="middle-section">
              <form>
                <h1 style={{ marginTop: '-150px' }}>Log In</h1>
                <p style={{ marginBottom: '5px', fontSize: '13px' }}>Employee ID or Email</p>
                <div className="icon-input">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter your Employee ID or Email"
                  />
                </div>
                {/* Todo: js function to submit username for routing*/}
                <button type="submit" id={'login'}>Login</button>
              </form>
            </div>
          </div>
          <Bottomnavbar />
        </div>
      );
}