import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onChange } from '../../utils/event';
import { type JsonData } from '../../utils/types';
import Navbar from '../../components/Navbar/Navbar';

export default function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [handledRegister, setHandledRegister] = useState(false);

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const res = await fetch('http://localhost:8000/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: username,
        email: email,
        password: password,
      }),
    });

    const responseJSON: JsonData = await res.json();

    if (responseJSON.success) {
      setHandledRegister(true);
    }
  }

  if (handledRegister) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      <form onSubmit={handleRegister}>
        <h1> Register </h1>
        <input
          className="text-input"
          value={email}
          type="text"
          required
          onChange={onChange(setEmail)}
          placeholder="Email"
        />

        <input
          className="text-input"
          value={username}
          type="text"
          required
          onChange={onChange(setUsername)}
          placeholder="Username"
        />

        <input
          className="text-input"
          value={password}
          type="password"
          required
          onChange={onChange(setPassword)}
          placeholder="Password"
        />

        <button type="submit">Register</button>
        <a href="/login"> Already have an account? </a>
      </form>
    </>
  );
}
