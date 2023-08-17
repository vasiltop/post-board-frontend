import './Navbar.css';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { type JsonData } from '../../utils/types';

export default function Navbar() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [verifiedToken, setVerifiedToken] = useState(false);

    useEffect(() => {
        const jwt = localStorage.getItem("jwt")!;
        

        async function getUserData() {
            const res = await fetch('http://localhost:8000/api/user/me', {
                method: 'GET',
                headers: {
                    'auth-token': jwt
                }
            });
            
            const responseJSON: JsonData = await res.json();
            
            
            setLoggedIn(responseJSON.success);
            setVerifiedToken(true);
        }

        getUserData();

    }, []);


    if(verifiedToken) {
        if(!loggedIn) {
            return <Navigate to='/login' />
        }
    }
    
    return(
        <div id="navbar-container">
            
            <h2 id="title">PostBoard</h2>

            <div id="links-section">

                
                <a href="/profile"> <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z"/></svg> </a>
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24"><path d="M8 10v-5l8 7-8 7v-5h-8v-4h8zm2-8v2h12v16h-12v2h14v-20h-14z"/></svg> 
                
            </div>
            
        </div>
    )
}