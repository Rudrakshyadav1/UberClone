import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { setCaptain } = useContext(CaptainDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate('/captain-login');
            return;
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setCaptain(response.data); // Assuming response.data contains captain info
                setIsLoading(false);
            } else {
                throw new Error('Unauthorized');
            }
        }).catch(err => {
            console.error(err);
            localStorage.removeItem('token');
            navigate('/captain-login');
        });
    }, [token, navigate, setCaptain]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
}

export default CaptainProtectWrapper;
