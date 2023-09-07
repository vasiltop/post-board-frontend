import './Login.css';
import { useState } from 'react';
import { onChange } from '../../utils/event';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin(event : React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log({email, password})
    }

    return (
        <>

        <form onSubmit={handleLogin}>

        <input type="text" value={email} required onChange={onChange(setEmail)}/>

        <input type="password" value={password} required onChange={onChange(setPassword)}/>

        <button type="submit">Login</button>

        </form>

        </>
    )
    
}