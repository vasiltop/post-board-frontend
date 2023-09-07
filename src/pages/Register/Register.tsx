import { useState } from 'react'
import { onChange } from '../../utils/event';

export default function Register() {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleRegister(event : React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log({email, username, password});
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