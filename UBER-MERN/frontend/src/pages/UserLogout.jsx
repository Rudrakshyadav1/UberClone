import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const UserLogout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(()=>{
    axios.get(
      import.meta.env.VITE_BASE_URL + '/user/logout', 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then((response) => {
      if (response.status === 200) {
        localStorage.removeItem('token'); 
        navigate('/login');
      }
    }).catch((error) => {
      console.error('Logout failed:', error);
      
    });

  },[token,navigate]);
  return (
    <div>
      Logging out...
    </div>
  );
};

export default UserLogout;
