import './login.css';
import '../app/[[...slug]]/index.css';
import Topnavbar from '../components/Topnavbar.js';
import Bottomnavbar from '../components/Bottomnavbar.js';
import {setCookie, getCookie, deleteCookie} from '../services/cookies.js';

export default function Login() {
  async function onSubmit(event) {
    event.preventDefault()

    var value = document.getElementById('username').value;
    if (value != null & value !== 'admin') {
      deleteCookie("name");
      setCookie("name", value, 500);
      let url = `/${getCookie("name")}/profile`;
      window.location.href = url;
    }
  }

    return (
        <div>
          <Topnavbar loginstate={false} />
          <div className="container">
            <div className="middle-section">
              <form onSubmit={onSubmit}>
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