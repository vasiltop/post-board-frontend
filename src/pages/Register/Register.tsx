import { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { onChange } from '../../utils/event';
import { type JsonData } from '../../utils/types';

export default function Register() {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [handledRegister, setHandledRegister] = useState(false);

    async function handleRegister(event : React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        
        const res = await fetch('http://localhost:8000/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: username,
                email: email,
                password: password
            })
        })

        const responseJSON: JsonData = await res.json();
        
        if(responseJSON.success) {
            setHandledRegister(true);
        }
    }

    if(handledRegister) {
        return <Navigate to='/login' />
    }

    return(
        <>
        <form onSubmit={handleRegister}>

        <input value={email} type="text" required onChange={onChange(setEmail)} />

        <input value={username} type="text" required onChange={onChange(setUsername)}/>

        <input value={password} type="password" required onChange={onChange(setPassword)}/> 

        <button type="submit">Login</button>

        </form>
        </>
    )
}