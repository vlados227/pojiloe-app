import {React, useState, useEffect} from "react";
import axios from "axios";
import { API_URL } from "../../api/api";
import "../../App.css";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [excursions, setExcursions] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_URL}/me`, {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data.userData);                
                setExcursions(response.data.excursion);

            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch user data');
            }
        };

        fetchUser();
    }, []);

    if (error) {
        return <center>Ошибка: {error}</center>;
    }

    if (!user) {
        return <center>Загрузка...</center>;
    }

    return (
        <div className="wide-container">
            <div className="user-card">
            <h1>Профиль пользователя {user.fullName}</h1>
            <p><strong>Эл. почта:</strong> {user.email}</p>
            <p><strong>Имя:</strong> {user.fullName}</p>
            <div className='center'>
                {excursions.map((excursion, index) => (
                    <div className="excursions" key={index}>
                            <p><strong>Название:</strong> {excursion.title}</p>
                            <p><strong>Описание:</strong> {excursion.description}</p>
                            <p><strong>Адрес:</strong> {excursion.location}</p>
                            <p><strong>Дата и время:</strong> {new Date(excursion.date).toLocaleString()}</p>
                            <p><strong>Цена:</strong> {excursion.price}</p>
                            <p><strong>Кол-во участников:</strong> {excursion.maxParticipants}</p>                        
                    </div>
                ))}
            </div>
        </div>
        </div>
        
    );
};

export default UserProfile;