import './Navbar.css';

import { navbarInfo } from '../../utils/types';
import { useNavigate } from 'react-router';

export default function Navbar(navbarInfo: navbarInfo) {
  const navigate = useNavigate();
  function logOut() {
    localStorage.setItem('jwt', '');
    navigate(0);
  }

  return (
    <div id="navbar-container">
      <a id="title" href="/">
        <h2> PostBoard</h2>
      </a>
      {navbarInfo.loggedIn ? (
        <div id="links-section">
          <a href="/create">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.994 12.964l3.106 3.105-4.112.931 1.006-4.036zm9.994-3.764l-5.84 5.921-3.202-3.202 5.841-5.919 3.201 3.2z" />
            </svg>
          </a>

          <a href={'/profile/' + navbarInfo.user._id}>
            {' '}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z" />
            </svg>{' '}
          </a>
          <button onClick={logOut}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              width="26"
              height="26"
              viewBox="0 0 26 25"
            >
              <path d="M8 10v-5l8 7-8 7v-5h-8v-4h8zm2-8v2h12v16h-12v2h14v-20h-14z" />
            </svg>{' '}
          </button>
        </div>
      ) : (
        <> </>
      )}
    </div>
  );
}
