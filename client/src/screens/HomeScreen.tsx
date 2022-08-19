import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface Post {
  pid: number;
  username: string;
  title: string;
  body: string;
  author: string;
  date_created: string;
}

const HomeScreen = () => {
  
  const [posts, setPosts] = useState<Post[]>();

  const fetchAllPosts = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/posts/allposts"
    );
    setPosts(response.data);
  };

  useEffect(() => {
    fetchAllPosts();
    
  }, []);
  return (<>
    {posts && posts.map((post)=> (
        <div key ={post.pid}>
            <h1 >{post.title}</h1>
            <p>Author: {post.author}</p>
            <p>Publish at : {post.date_created}</p>
            <Link to={`/post/${post.pid}`}>click here</Link>
        </div>
        
    )) }
  </>);
};

export default HomeScreen;
