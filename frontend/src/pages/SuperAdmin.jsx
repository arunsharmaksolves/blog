import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../url';
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SuperAdmin = () => {
  const { user } = useContext(UserContext);
  const [allUsers, setAllUsers] = useState([]);
  const [isAdmin,setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(URL + "/api/super/allUser");
        setAllUsers(response.data);
      } catch (error) {
        console.error('Error fetching all users:', error);
      }
    };

    fetchAllUsers();
  }, []);

  const handleChange = async (userId) => {
    // try {
    //   // const updatedUsers = allUsers.map((u) =>
    //   //   u._id === userId ? { ...u, isAdmin: !u.isAdmin } : u
    //   // );
    //   // setAllUsers(updatedUsers);
  
    //   await axios.put(URL + "/api/users/" + userId, {
    //     isAdmin: !user.isAdmin,
    //   });
    // } catch (error) {
    //   console.error('Error updating user:', error);
    // }
    if(!isAdmin){
      toast.success('User is Admin now', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
        setIsAdmin(!isAdmin);
    }else{
      toast.error('User is removed as Admin', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
        setIsAdmin(!isAdmin)
    }
  };

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {allUsers.map((user) => (
          <ul role="list" className="divide-y divide-gray-100">
            <li className="flex justify-between gap-x-6 py-5" key={user._id}>
              <div className="flex min-w-0 gap-x-4">
                <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{user.username}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{user.email}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{user._id}</p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <input
                  type='checkbox'
                  onChange={() => handleChange(user._id)}
                />
              </div>
            </li>
          </ul>
        ))}
      </ul>
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
        theme="colored"
      />
    </div>
  );
};

export default SuperAdmin;
