import { onChange } from '../../utils/event';
import { useState } from 'react';
import { JsonData } from '../../utils/types';
import Navbar from '../../components/Navbar/Navbar';
import './Create.css';
import { useNavigate } from 'react-router-dom';
export default function Create() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();
  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const jwt = localStorage.getItem('jwt')!;

    const res = await fetch('http://localhost:8000/post/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': jwt,
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });

    const responseJSON: JsonData = await res.json();

    if (!responseJSON.success) {
      setError(responseJSON.err!);
    } else {
      nav('/');
    }
  }

  return (
    <>
      <Navbar />
      <form onSubmit={handleCreate}>
        <h1> Create a post</h1>
        <input
          className="text-input"
          value={title}
          type="text"
          required
          onChange={onChange(setTitle)}
          placeholder="Title"
        />

        <textarea
          className="text-input text-input-big"
          value={content}
          required
          onChange={onChange(setContent)}
          placeholder="Content"
        />
        <p id="error"> {error != '' ? error : <> </>}</p>
        <button type="submit"> Post </button>
      </form>
    </>
  );
}
