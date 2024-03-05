import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../url';
import { useContext } from "react"
import { UserContext } from "../context/UserContext"

const SuperAdmin = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [user, setUser] = useState()

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(URL + "/api/super/allUser");
        // console.log(response.data)
        setAllUsers(response.data);
      } catch (error) {
        console.error('Error fetching all users:', error);
      }
    };

    fetchAllUsers();
  }, []);

  const handleChange = async () => {
    try {
      // console.log(user);
      const response = await axios.put(URL + "/api/users" + user._id, {
        isAdmin
      });

    } catch (error) {
      console.error('Error fetching all users:', error);
    }
  };

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {allUsers.map((user) => (

          <ul role="list" class="divide-y divide-gray-100">
            <li class="flex justify-between gap-x-6 py-5">
              <div class="flex min-w-0 gap-x-4">
                <img class="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                <div class="min-w-0 flex-auto">
                  <p class="text-sm font-semibold leading-6 text-gray-900">{user.username}</p>
                  <p class="mt-1 truncate text-xs leading-5 text-gray-500">{user.email}</p>
                </div>
              </div>
              <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <input onChange={handleChange} type='checkbox' />
              </div>
            </li>
          </ul>

        ))}
      </ul>
    </div>
  );
};

export default SuperAdmin;
