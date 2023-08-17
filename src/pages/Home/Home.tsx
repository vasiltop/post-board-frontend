import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import Post from '../../components/Post/Post';

export default function Home() {
    return(
        <div id="centered-content">
            
            <div id="post-content-header">
                <Navbar />
            </div>

            <div id="post-content">
            
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />

            </div>
        </div>
    )
}