import './Post.css';
import { type PostData } from '../../utils/types';
import { useState, useEffect } from 'react';
import Like from '../Like/Like';

export default function Post(post: PostData) {
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLike] = useState(post.liked);
  console.log(post);
  async function handleLike(liked: boolean) {
    setLike(liked);
    if (liked) {
      await fetch(`http://localhost:8000/post/${post.id}/like`, {
        method: 'GET',
        headers: {
          'auth-token': localStorage.getItem('jwt')!,
        },
      });

      setLikes(likes + 1);
    } else {
      await fetch(`http://localhost:8000/post/${post.id}/unlike`, {
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
        <h4> {post.title} </h4>
        <a href={'/profile/' + post.author}> @{post.author} </a>
      </div>

      <p> {post.content} </p>

      <div id="like-information">
        <Like liked={liked} likes={likes} onClick={handleLike} />
        <p> {likes} </p>
      </div>
    </div>
  );
}
