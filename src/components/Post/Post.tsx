import './Post.css';
import { type PostData } from '../../utils/types';
import { useState } from 'react';
export default function Post(post: PostData) {
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(post.liked);

  async function handleLike(liked: boolean) {
    setLiked(liked);

    if (liked) {
      await fetch(`http://localhost:8000/api/posts/${post._id}/like`, {
        method: 'GET',
        headers: {
          'auth-token': localStorage.getItem('jwt')!,
        },
      });

      setLikes(likes + 1);
    } else {
      await fetch(`http://localhost:8000/api/posts/${post._id}/unlike`, {
        method: 'GET',
        headers: {
          'auth-token': localStorage.getItem('jwt')!,
        },
      });

      setLikes(likes - 1);
    }
  }

  return (
    <div id="post-container">
      <div id="post-header">
        <h2> {post.title} </h2>
        <a href={'/profile/' + post.userId}> {post.userName} </a>
        <p> {post.date} </p>
      </div>

      <p> {post.content} </p>
      <p> {likes} </p>
      <input
        type="checkbox"
        checked={liked}
        onChange={(e) => handleLike(e.target.checked)}
      />
    </div>
  );
}
