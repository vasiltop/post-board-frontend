import './Home.css';
import Post from '../../components/Post/Post';
import { useEffect, useState } from 'react';
import { User, type JsonData, type PostData } from '../../utils/types';
import { Navigate } from 'react-router';
import Navbar from '../../components/Navbar/Navbar';

export default function Home() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [verifiedToken, setVerifiedToken] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt')!;

    async function getUserData() {
      const res = await fetch('http://localhost:8000/user/me', {
        method: 'GET',
        headers: {
          'auth-token': jwt,
        },
      });

      const responseJSON: JsonData = await res.json();

      setLoggedIn(responseJSON.success);
      setVerifiedToken(true);
    }

    getUserData();

    async function getPosts() {
      const jwt = localStorage.getItem('jwt')!;

      const res = await fetch('http://localhost:8000/post', {
        method: 'GET',
        headers: {
          'auth-token': jwt,
        },
      });

      const responseJSON: JsonData = await res.json();

      setPosts(responseJSON.data.postList);
    }

    getPosts();
  }, []);

  if (verifiedToken) {
    if (!loggedIn) {
      return <Navigate to="/login" />;
    }
  }

  return (
    <>
      <Navbar />
      <div id="post-content">
        <ul>
          {posts.map((post) => (
            <Post
              key={post.id}
              title={post.title}
              content={post.content}
              author={post.author}
              likes={post.likes}
              liked={post.liked}
              id={post.id}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
