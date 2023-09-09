import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import Post from '../../components/Post/Post';
import { useEffect, useState } from 'react';
import { type JsonData, type PostData } from '../../utils/types';

export default function Home() {
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    async function getPosts() {
      const jwt = localStorage.getItem('jwt')!;

      const res = await fetch('http://localhost:8000/api/posts', {
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

  return (
    <div id="centered-content">
      <div id="post-content-header">
        <Navbar />
      </div>

      <div id="post-content">
        <ul>
          {posts.map((post) => (
            <Post
              key={post._id}
              title={post.title}
              content={post.content}
              userName={post.userName}
              date={post.date}
              liked={post.liked}
              likes={post.likes}
              userId={post.userId}
              _id={post._id}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
