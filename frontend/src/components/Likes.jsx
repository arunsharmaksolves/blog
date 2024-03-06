import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Likes = ({ postId, setLike, like }) => {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const { user } = useContext(UserContext);
  console.log(user);

  useEffect(() => {
    const checkUserLike = async () => {
      try {
        const res = await axios.get(URL + "/api/posts/" + postId);
        if (res.data.likes.includes(user._id)) {
          setLiked(true);
        }
        setCount(res.data.likes.length);
      } catch (err) {
        console.error(err);
      }
    };

    checkUserLike();
  }, [postId]);

  const handleLike = async () => {
    try {
      console.log(user);
      if(!liked){
        toast.success('Post Liked Successfully', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }else{
        toast.error('Post Unliked', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      }
      const response = await axios.put(URL + "/api/posts/like/" + postId, { userId: user._id });
      const updatedLikeCount = response.data.likes.length;
      setCount(updatedLikeCount);
      setLiked(!liked);
      console.log(`Post liked successfully. Like count: ${updatedLikeCount}`);
    } catch (error) {
      console.error("Error liking post:", error.response?.data?.message || error.message);
    }
  };

  return (
    <>
      <button style={{ display: "ruby", fontSize: "xx-large", marginTop: "1rem" }} onClick={handleLike}>
        {liked ? <FaHeart /> : <CiHeart />} Like {count}
      </button>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Likes;
