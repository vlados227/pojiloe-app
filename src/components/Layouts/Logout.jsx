import React from 'react';

const Logout = ({ onLogout }) => {
    const handleLogout = () => {
        if (onLogout) {
            onLogout();
        } else {
            localStorage.clear();
            window.location.reload();
        }
    };

    return (
        <button className='logout__btn' onClick={handleLogout}>
            Выйти из аккаунта
        </button>
    );
};

export default Logout;