import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../api/api';

const ExcursionList = () => {
    const [excursions, setExcursions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExcursions = async () => {
            try {
                const response = await axios.get(`${API_URL}/excursions/all`)
                setExcursions(response.data.excrusions || []);
                console.log(response.data.excrusions);
                
                console.log(typeof excursions);
                
                
            } catch (err) {
                setError('Failed to fetch excursions');
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchExcursions();
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Excursions</h1>
            <div className='excursion'>
                {excursions.map(excursion => (
                    <li key={excursion._id}>
                    <h2>{excursion.title}</h2>
                    <p>{excursion.description}</p>
                    <p>Место: {excursion.location}</p>
                    <p>Дата: {new Date(excursion.date).toLocaleDateString()}</p>
                    <p>Цена: {excursion.price} ₽</p>
                    <p>Макс. участников: {excursion.maxParticipants}</p>
                  </li>
                ))}
            </div>
        </div>
    );
};

export default ExcursionList;