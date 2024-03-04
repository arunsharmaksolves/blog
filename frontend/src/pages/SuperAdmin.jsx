import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SuperAdmin = () => {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const id = location.pathname.split("/")[2];

  const handleCheckboxChange = async (userId, isAdmin) => {
    try {
      await axios.put(`http://localhost:5000/api/super/${userId}`, {
        isAdmin,
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isAdmin: !user.isAdmin } : user
        )
      );

      if (isAdmin) {
        toast.error("Removed from Admin Role");
      } else {
        toast.success("User is Admin Now");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/super/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      toast.success("User deleted Successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/super/allUser", {
        id,
      });
      setUsers(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="center">
      <h1>All Users</h1>
      <ul className="ul">
        {users.map((user) => (
          <React.Fragment key={user._id}>
            {!user.isSuperAdmin && (
              <li className="li">
                <img className="img" src={user.profilePic} alt={user.username} />
                <span className="username">
                  Author:
                  <Link to={`/super/user/?user=${user.username}`} className="link">
                    <b>{user.username}</b>
                  </Link>
                </span>
                <span className="email">{user.email}</span>
                <input
                  className="input"
                  type="checkbox"
                  checked={user.isAdmin}
                  onChange={() => handleCheckboxChange(user._id, user.isAdmin)}
                />

                <i
                  className="singlePostIcon fa-regular fa-trash-can"
                  onClick={() => handleDelete(user._id)}
                ></i>
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default SuperAdmin;
