import './Login.css';
import { useState } from 'react';
import { onChange } from '../../utils/event';
import { type JsonData } from '../../utils/types';
import { Navigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [handledLogin, setHandledLogin] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const res = await fetch('http://localhost:8000/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const responseJSON: JsonData = await res.json();
    console.log(responseJSON);
    if (responseJSON.success) {
      setHandledLogin(true);
      localStorage.setItem('jwt', responseJSON.data.jwt);
    } else {
      setError(responseJSON.err!);
    }
  }

  if (handledLogin) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Navbar />

      <form onSubmit={handleLogin}>
        <h1> Login </h1>
        <input
          className="text-input"
          type="text"
          value={email}
          required
          onChange={onChange(setEmail)}
          placeholder="Email"
        />

        <input
          className="text-input"
          type="password"
          value={password}
          required
          onChange={onChange(setPassword)}
          placeholder="Password"
        />
        <p id="error"> {error != '' ? error : <> </>}</p>

        <button type="submit">Login</button>
        <a href="/register"> Don't have an account?</a>
      </form>
    </>
  );
}
