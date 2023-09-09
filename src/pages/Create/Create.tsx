import { onChange } from '../../utils/event';
import { useState } from 'react';
import { JsonData } from '../../utils/types';

export default function Create() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const jwt = localStorage.getItem('jwt')!;

    const res = await fetch('http://localhost:8000/api/posts/create', {
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
  }

  return (
    <>
      <form onSubmit={handleCreate}>
        <input
          value={title}
          type="text"
          required
          onChange={onChange(setTitle)}
        />

        <input
          value={content}
          type="text"
          required
          onChange={onChange(setContent)}
        />

        <button type="submit"> Post </button>
      </form>
    </>
  );
}
