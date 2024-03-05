import { Link, useLocation, useNavigate } from "react-router-dom"
import { BsSearch } from 'react-icons/bs'
import { FaBars } from 'react-icons/fa'
import { useContext, useState,useEffect } from "react"
import Menu from "./Menu"
import { UserContext } from "../context/UserContext"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Navbar = () => {
  
  const { user } = useContext(UserContext)
  const [prompt, setPrompt] = useState("")
  const [menu, setMenu] = useState(false)
  const [users,setUsers] = useState([])
  const navigate = useNavigate()
  const path = useLocation().pathname
  const [button,setButton] = useState("Request Access");

  // console.log(prompt)
  // console.log(user)
  
  const showMenu = () => {
    setMenu(!menu)
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (user) {
          console.log(user._id)
          // const response = await axios.get(URL + "/api/users/" + user._id);
          const res = await axios.get('http://localhost:5000/api/users/'+user._id)
          console.log(res.data)
          // console.log(response.data);
          setUsers(res.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [user]);

  const handleAccess = () =>{
    setButton("Requested");
    toast.success('Access Requested', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }


  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-lg md:text-xl font-extrabold"><Link to="/">Blog4U</Link></h1>
      {path === "/" && <div className="flex justify-center items-center space-x-0">
        <p onClick={() => navigate(prompt ? "?search=" + prompt : navigate("/"))} className="cursor-pointer"><BsSearch /></p>
        <input onChange={(e) => setPrompt(e.target.value)} className="outline-none px-3 " placeholder="Search a post" type="text" />


      </div>}
      {users.isSuperAdmin ? <Link to="/api/super/allUser">Super Admin</Link> : <button onClick={handleAccess}>{button}</button>}
      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {user ? <h3><Link to="/write">Write</Link></h3> : <h3><Link to="/login">Login</Link></h3>}
        {user ? <div onClick={showMenu}>
          <p className="cursor-pointer relative"><FaBars /></p>
          {menu && <Menu />}
        </div> : <h3><Link to="/register">Register</Link></h3>}
      </div>
      <div onClick={showMenu} className="md:hidden text-lg">
        <p className="cursor-pointer relative"><FaBars /></p>
        {menu && <Menu />}
      </div>
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
    </div>
  )
}

export default Navbar 