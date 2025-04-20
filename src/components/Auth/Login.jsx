import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import "../../App.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    //const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/login`, { 
                "email": email,
                "password": password 
            });

            localStorage.setItem("token", response.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
            //setSuccess('Successful login');
            navigate("/excursions/all");
        } catch (err) {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="login-container general-container">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(chEvent) => setEmail(chEvent.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(chEvent) => setPassword(chEvent.target.value)}
                        required
                    />
                </div>
                <button className='submit' type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;