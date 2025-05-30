import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Layouts/AuthContext';
import "../../App.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { updateRole } = useAuth();
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/login`, { 
                "email": email,
                "password": password 
            });

            localStorage.setItem("token", response.data.token);
            updateRole();
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
            navigate("/excursions/all");
        } catch (err) {
            setError('Неправильный логин или пароль ', err);
        }
    };

    return (
        <div className="login-container general-container">
            <h2>Вход</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Электронная почта:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(chEvent) => setEmail(chEvent.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Пароль:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(chEvent) => setPassword(chEvent.target.value)}
                        required
                    />
                </div>
                <button className='submit' type="submit">Войти</button>
            </form>
        </div>
    );
};

export default Login;