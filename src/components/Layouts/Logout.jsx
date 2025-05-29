import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogout }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        if (onLogout) {
            onLogout();
        } else {
            localStorage.clear();
            navigate('/');
        }
    };

    return (
        <button className='logout__btn' onClick={handleLogout}>
            Выйти из аккаунта
        </button>
    );
};

export default Logout;