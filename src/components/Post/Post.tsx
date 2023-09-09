import "./Post.css";
import { type PostData } from "../../utils/types";

export default function Post(postInfo: PostData) {
  return (
    <div id="post-container">
      <div id="post-header">
        <h2> {postInfo.title} </h2>
        <a href={"/profile/" + postInfo.userId}> {postInfo.userName} </a>
        <p> {postInfo.date} </p>
      </div>

      <p> {postInfo.content} </p>
    </div>
  );
}
