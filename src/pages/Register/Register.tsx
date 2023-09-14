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
  const [error, setError] = useState('');
  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const res = await fetch(
      'https://postboardapi.vasiltopalovic.com/user/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      }
    );

    const responseJSON: JsonData = await res.json();

    if (responseJSON.success) {
      setHandledRegister(true);
    } else {
      setError(responseJSON.err!);
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
        <p id="error"> {error != '' ? error : <> </>}</p>
        <button type="submit">Register</button>
        <a href="/login"> Already have an account? </a>
      </form>
    </>
  );
}
