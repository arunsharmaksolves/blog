import { useNavigate, useParams } from "react-router-dom"
import { useContext, useState } from "react";
import axios from "axios";
import React from 'react';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { URL } from "../url"
import { UserContext } from "../context/UserContext";

const Likes = ({ postId, setLike, like }) => {
  const[liked,setLiked] = useState([]);
  const[count,setCount] = useState()
  const { user } = useContext(UserContext);
  
  const handleLike = async () => {
    try {
      console.log(user);
      const response = await axios.put(URL + "/api/posts/like/" + postId, { userId: user._id });
      // console.log(response.data.likes.length);
      const likeCount = response.data.likes.length;
      setCount(likeCount);
      console.log(response.data);
      
      // If the user ID is already in the array, remove it; otherwise, add it
      setLike(!like);
      
      console.log(`Post liked successfully. Like count: ${likeCount}`);
    } catch (error) {
      console.error("Error liking post:", error.response?.data?.message || error.message);
    }
  };

  return (
    <>
      <button style={{ display: "ruby", fontSize: "xx-large", marginTop: "1rem" }} onClick={handleLike}>
        {like ? <FaHeart /> : <CiHeart />} Like {count}
      </button>
    </>
  );
};

export default Likes;
