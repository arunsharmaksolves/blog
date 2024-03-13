import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from '../components/Loader';
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(5);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    console.log(search)
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + search)
      // console.log(res.data)
      setPosts(res.data);
      if (res.data.length === 0 || res.data.length < visiblePosts) {
        setHasMorePosts(false);
      } else {
        setHasMorePosts(true);
      }
      setLoader(false);
    } catch (err) {
      console.error(err);
      setLoader(false);
    }
  };
  console.log(posts)

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      hasMorePosts
    ) {
      setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 5);
    }
  };

  useEffect(() => {
    fetchPosts();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [search, visiblePosts, hasMorePosts]);

  return (
    <>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            {/* <Loader /> */}
          </div>
        ) : !noResults ? (
          <>
            {posts.slice(0, visiblePosts).map((post) => (
              <Link key={post.id} to={user ? `/posts/post/${post.id}` : "/login"}>
                <HomePosts post={post} />
              </Link>
            ))}
          </>
        ) : (
          <h3 className="text-center font-bold mt-16">No posts available</h3>
        )}
      </div>
      {hasMorePosts && loader && (
        <div className="flex justify-center items-center mt-4">
          <Loader />
        </div>
      )}
      <Footer />
    </>
  );
};

export default Home;
