import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Post } from "./HomeScreen";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getOnePost, sendLike } from "../store/postSlice";
import LikeIcons from "../components/LikeIcons";
import CommentSection from "../components/CommentSection";
import axios from "axios";
import { CommentSingle } from "../components/CommentSection";
const PostScreen = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const [comments, setComments] = useState<CommentSingle[] |[]>([]) ;
  

  const fetchAllComment = async  () => {
    const response = await axios.get(`http://localhost:5000/api/posts/${params.pid}/comments`)
    //console.log(response.data)
    setComments(response.data) ;
  }

  useEffect(() => {
    dispatch(getOnePost(params.pid));
    
    fetchAllComment() ; 
  }, [dispatch, params.pid]);

  const post = useAppSelector((state) => state.post.post);
  const user = useAppSelector((state: any) => state.user.user);

  if (post && user) {
    //console.log("from post screen", post.title);
  }
  
  return (
    <>
      {post ? (
        <>
          <div className="container w-full md:max-w-3xl mx-auto pt-20">
            <div className="font-sans">
              <p className="text-base md:text-sm text-green-500 font-bold">
                &lt;{" "}
                <a
                  href="/"
                  className="text-base md:text-sm text-green-500 font-bold no-underline hover:underline"
                >
                  BACK TO BLOG
                </a>
              </p>
              <h1 className="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">
                Welcome to {post.title}
              </h1>
              <p className="text-sm md:text-base font-normal text-gray-600">
                Published {post.date_created}
              </p>
            </div>

            <p className="py-6">
              👋 Welcome fellow{" "}
              <a
                className="text-green-500 no-underline hover:underline"
                href="https://www.tailwindcss.com"
              >
                Tailwind CSS
              </a>{" "}
              and miminal monochrome blog fan. This starter template provides a
              starting point to create your own minimal monochrome blog using
              Tailwind CSS and vanilla Javascript.
            </p>

            <p className="py-6">
              The basic blog page layout is available and all using the default
              Tailwind CSS classNamees (although there are a few hardcoded style
              tags). If you are going to use this in your project, you will want
              to convert the classNamees into components.
            </p>

            <h1 className="py-2 font-sans">{post.body}</h1>
            <h2 className="py-2 font-sans">Heading 2</h2>
            <h3 className="py-2 font-sans">Heading 3</h3>
            <h4 className="py-2 font-sans">Heading 4</h4>
            <h5 className="py-2 font-sans">Heading 5</h5>
            <h6 className="py-2 font-sans">Heading 6</h6>

            <p className="py-6">
              Sed dignissim lectus ut tincidunt vulputate. Fusce tincidunt lacus
              purus, in mattis tortor sollicitudin pretium. Phasellus at diam
              posuere, scelerisque nisl sit amet, tincidunt urna. Cras nisi
              diam, pulvinar ut molestie eget, eleifend ac magna. Sed at lorem
              condimentum, dignissim lorem eu, blandit massa. Phasellus eleifend
              turpis vel erat bibendum scelerisque. Maecenas id risus dictum,
              rhoncus odio vitae, maximus purus. Etiam efficitur dolor in dolor
              molestie ornare. Aenean pulvinar diam nec neque tincidunt, vitae
              molestie quam fermentum. Donec ac pretium diam. Suspendisse sed
              odio risus. Nunc nec luctus nisi. ClassName aptent taciti sociosqu
              ad litora torquent per conubia nostra, per inceptos himenaeos.
              Duis nec nulla eget sem dictum elementum.
            </p>

            <ol>
              <li className="py-3">
                Maecenas accumsan lacus sit amet elementum porta. Aliquam eu
                libero lectus. Fusce vehicula dictum mi. In non dolor at sem
                ullamcorper venenatis ut sed dui. Ut ut est quam. Suspendisse
                quam quam, commodo sit amet placerat in, interdum a ipsum. Morbi
                sit amet tellus scelerisque tortor semper posuere.
              </li>
              <li className="py-3">
                Morbi varius posuere blandit. Praesent gravida bibendum neque
                eget commodo. Duis auctor ornare mauris, eu accumsan odio
                viverra in. Proin sagittis maximus pharetra. Nullam lorem
                mauris, faucibus ut odio tempus, ultrices aliquet ex. Nam id
                quam eget ipsum luctus hendrerit. Ut eros magna, eleifend ac
                ornare vulputate, pretium nec felis.
              </li>
              <li className="py-3">
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                posuere cubilia Curae; Nunc vitae pretium elit. Cras leo mauris,
                tristique in risus ac, tristique rutrum velit. Mauris accumsan
                tempor felis vitae gravida. Cras egestas convallis malesuada.
                Etiam ac ante id tortor vulputate pretium. Maecenas vel sapien
                suscipit, elementum odio et, consequat tellus.
              </li>
            </ol>

            <blockquote className="border-l-4 border-green-500 italic my-8 pl-8 md:pl-12">
              Published by: {post.author}
              <LikeIcons />
            </blockquote>

            <CommentSection paramsID={params.pid} comments={comments} />
          </div>
        </>
      ) : null}
    </>
  );
};

export default PostScreen;
